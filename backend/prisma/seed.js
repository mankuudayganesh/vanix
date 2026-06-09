"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding VANIX database...');
    // ============================================================
    // ROLES & PERMISSIONS
    // ============================================================
    const modules = ['content', 'users', 'subscriptions', 'analytics', 'admin', 'notifications'];
    const actions = ['create', 'read', 'update', 'delete', 'manage'];
    const permissions = [];
    for (const mod of modules) {
        for (const action of actions) {
            permissions.push(await prisma.permission.upsert({
                where: { module_action: { module: mod, action } },
                update: {},
                create: { name: `${mod}:${action}`, module: mod, action, description: `${action} ${mod}` },
            }));
        }
    }
    const superAdminRole = await prisma.role.upsert({
        where: { name: 'super_admin' },
        update: {},
        create: { name: 'super_admin', description: 'Full access to all features' },
    });
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: { name: 'admin', description: 'Administrative access' },
    });
    const moderatorRole = await prisma.role.upsert({
        where: { name: 'moderator' },
        update: {},
        create: { name: 'moderator', description: 'Content moderation' },
    });
    const contentManagerRole = await prisma.role.upsert({
        where: { name: 'content_manager' },
        update: {},
        create: { name: 'content_manager', description: 'Content management only' },
    });
    const supportRole = await prisma.role.upsert({
        where: { name: 'support' },
        update: {},
        create: { name: 'support', description: 'User support' },
    });
    // Assign all permissions to super_admin
    for (const perm of permissions) {
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: superAdminRole.id, permissionId: perm.id } },
            update: {},
            create: { roleId: superAdminRole.id, permissionId: perm.id },
        });
    }
    // Create default super admin
    const passwordHash = await bcryptjs_1.default.hash('vanix@admin2024', 12);
    await prisma.admin.upsert({
        where: { email: 'admin@vanix.com' },
        update: {},
        create: {
            email: 'admin@vanix.com',
            passwordHash,
            name: 'Super Admin',
            roleId: superAdminRole.id,
        },
    });
    // ============================================================
    // GENRES
    // ============================================================
    const genres = [
        { name: 'Action', slug: 'action', displayOrder: 1 },
        { name: 'Adventure', slug: 'adventure', displayOrder: 2 },
        { name: 'Animation', slug: 'animation', displayOrder: 3 },
        { name: 'Anime', slug: 'anime', displayOrder: 4 },
        { name: 'Comedy', slug: 'comedy', displayOrder: 5 },
        { name: 'Crime', slug: 'crime', displayOrder: 6 },
        { name: 'Documentary', slug: 'documentary', displayOrder: 7 },
        { name: 'Drama', slug: 'drama', displayOrder: 8 },
        { name: 'Fantasy', slug: 'fantasy', displayOrder: 9 },
        { name: 'Horror', slug: 'horror', displayOrder: 10 },
        { name: 'Mystery', slug: 'mystery', displayOrder: 11 },
        { name: 'Romance', slug: 'romance', displayOrder: 12 },
        { name: 'Sci-Fi', slug: 'sci-fi', displayOrder: 13 },
        { name: 'Sports', slug: 'sports', displayOrder: 14 },
        { name: 'Thriller', slug: 'thriller', displayOrder: 15 },
        { name: 'War', slug: 'war', displayOrder: 16 },
        { name: 'Western', slug: 'western', displayOrder: 17 },
        { name: 'Musical', slug: 'musical', displayOrder: 18 },
        { name: 'Family', slug: 'family', displayOrder: 19 },
        { name: 'Kids', slug: 'kids', displayOrder: 20 },
    ];
    for (const genre of genres) {
        await prisma.genre.upsert({
            where: { slug: genre.slug },
            update: {},
            create: genre,
        });
    }
    // ============================================================
    // CATEGORIES
    // ============================================================
    const categories = [
        { name: 'Trending Now', slug: 'trending-now', type: 'SPECIAL', displayOrder: 1 },
        { name: 'Top 10 India', slug: 'top-10-india', type: 'SPECIAL', displayOrder: 2 },
        { name: 'Top 10 Global', slug: 'top-10-global', type: 'SPECIAL', displayOrder: 3 },
        { name: 'Recently Added', slug: 'recently-added', type: 'SPECIAL', displayOrder: 4 },
        { name: 'VANIX Originals', slug: 'vanix-originals', type: 'COLLECTION', displayOrder: 5 },
        { name: 'Anime Collection', slug: 'anime-collection', type: 'COLLECTION', displayOrder: 6 },
        { name: 'Sports Collection', slug: 'sports-collection', type: 'COLLECTION', displayOrder: 7 },
        { name: 'Kids Collection', slug: 'kids-collection', type: 'COLLECTION', displayOrder: 8 },
        { name: 'Coming Soon', slug: 'coming-soon', type: 'SPECIAL', displayOrder: 9 },
    ];
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    // ============================================================
    // SUBSCRIPTION PLANS
    // ============================================================
    const plans = [
        {
            name: 'Mobile',
            slug: 'mobile',
            description: 'Watch on your phone',
            priceMonthly: 14900,
            priceYearly: 149900,
            maxScreens: 1,
            maxDownloads: 0,
            maxProfiles: 1,
            videoQuality: '480p',
            hasAds: true,
            hasDolbyAtmos: false,
            hasSpatialAudio: false,
            hasHDR: false,
            isPopular: false,
            displayOrder: 1,
        },
        {
            name: 'Basic',
            slug: 'basic',
            description: 'Standard definition streaming',
            priceMonthly: 19900,
            priceYearly: 199900,
            maxScreens: 1,
            maxDownloads: 0,
            maxProfiles: 2,
            videoQuality: '720p',
            hasAds: true,
            hasDolbyAtmos: false,
            hasSpatialAudio: false,
            hasHDR: false,
            isPopular: false,
            displayOrder: 2,
        },
        {
            name: 'Standard',
            slug: 'standard',
            description: 'Full HD streaming with downloads',
            priceMonthly: 49900,
            priceYearly: 499900,
            maxScreens: 2,
            maxDownloads: 10,
            maxProfiles: 3,
            videoQuality: '1080p',
            hasAds: false,
            hasDolbyAtmos: false,
            hasSpatialAudio: false,
            hasHDR: false,
            isPopular: true,
            displayOrder: 3,
        },
        {
            name: 'Premium',
            slug: 'premium',
            description: '4K Ultra HD + Dolby Atmos',
            priceMonthly: 79900,
            priceYearly: 799900,
            maxScreens: 4,
            maxDownloads: 25,
            maxProfiles: 5,
            videoQuality: '4k',
            hasAds: false,
            hasDolbyAtmos: true,
            hasSpatialAudio: true,
            hasHDR: true,
            isPopular: false,
            displayOrder: 4,
        },
        {
            name: 'Family',
            slug: 'family',
            description: '4K + HDR for the whole family',
            priceMonthly: 99900,
            priceYearly: 999900,
            maxScreens: 6,
            maxDownloads: 50,
            maxProfiles: 5,
            videoQuality: '4k',
            hasAds: false,
            hasDolbyAtmos: true,
            hasSpatialAudio: true,
            hasHDR: true,
            isPopular: false,
            displayOrder: 5,
        },
    ];
    for (const plan of plans) {
        await prisma.subscriptionPlan.upsert({
            where: { slug: plan.slug },
            update: {},
            create: plan,
        });
    }
    // ============================================================
    // SAMPLE MOVIES
    // ============================================================
    const actionGenre = await prisma.genre.findUnique({ where: { slug: 'action' } });
    const scifiGenre = await prisma.genre.findUnique({ where: { slug: 'sci-fi' } });
    const thrillerGenre = await prisma.genre.findUnique({ where: { slug: 'thriller' } });
    const dramaGenre = await prisma.genre.findUnique({ where: { slug: 'drama' } });
    const horrorGenre = await prisma.genre.findUnique({ where: { slug: 'horror' } });
    const animeGenre = await prisma.genre.findUnique({ where: { slug: 'anime' } });
    const fantasyGenre = await prisma.genre.findUnique({ where: { slug: 'fantasy' } });
    const comedyGenre = await prisma.genre.findUnique({ where: { slug: 'comedy' } });
    const sampleMovies = [
        { title: 'Neon Genesis', slug: 'neon-genesis', description: 'In a world fractured by technology and shadows, a young bio-hacker discovers a hidden frequency that could rewrite the fabric of reality.', runtime: 134, maturityRating: 'TV-MA', language: 'en', country: 'US', avgRating: 8.9, viewCount: 125000, isPublished: true, isFeatured: true, isOriginal: true, releaseDate: new Date('2024-03-15'), publishedAt: new Date('2024-03-15') },
        { title: 'Cyberpunk Nights', slug: 'cyberpunk-nights', description: 'In a city where memories are traded like currency, a rogue detective uncovers a conspiracy that threatens the fabric of reality itself.', runtime: 148, maturityRating: 'TV-MA', language: 'en', country: 'US', avgRating: 9.1, viewCount: 250000, isPublished: true, isFeatured: true, isOriginal: true, releaseDate: new Date('2024-06-01'), publishedAt: new Date('2024-06-01') },
        { title: 'Shadow Realm', slug: 'shadow-realm', description: 'An ancient warrior must cross between parallel dimensions to save both worlds from an inter-dimensional threat.', runtime: 126, maturityRating: 'TV-14', language: 'en', country: 'IN', avgRating: 8.5, viewCount: 180000, isPublished: true, isFeatured: false, isOriginal: true, releaseDate: new Date('2024-01-20'), publishedAt: new Date('2024-01-20') },
        { title: 'The Void', slug: 'the-void', description: 'A team of astronauts encounters an anomaly in deep space that challenges everything they know about the universe.', runtime: 142, maturityRating: 'TV-14', language: 'en', country: 'US', avgRating: 8.7, viewCount: 95000, isPublished: true, isFeatured: false, releaseDate: new Date('2024-07-10'), publishedAt: new Date('2024-07-10') },
        { title: 'A.I. Uprising', slug: 'ai-uprising', description: 'When artificial intelligence gains consciousness, humanity faces its greatest challenge yet.', runtime: 118, maturityRating: 'TV-MA', language: 'en', country: 'US', avgRating: 8.3, viewCount: 110000, isPublished: true, isFeatured: false, releaseDate: new Date('2023-11-05'), publishedAt: new Date('2023-11-05') },
        { title: 'Ronin Red', slug: 'ronin-red', description: 'A disgraced samurai embarks on a quest for redemption in feudal Japan.', runtime: 155, maturityRating: 'TV-MA', language: 'ja', country: 'JP', avgRating: 9.0, viewCount: 200000, isPublished: true, isFeatured: true, releaseDate: new Date('2022-09-22'), publishedAt: new Date('2022-09-22') },
        { title: 'Global Vision', slug: 'global-vision', description: 'A documentary exploring the future of human civilization through the lens of technology.', runtime: 98, maturityRating: 'TV-PG', language: 'en', country: 'US', avgRating: 7.8, viewCount: 45000, isPublished: true, isFeatured: false, releaseDate: new Date('2024-02-14'), publishedAt: new Date('2024-02-14') },
        { title: 'Cinema Classic', slug: 'cinema-classic', description: 'A celebration of the golden age of cinema.', runtime: 110, maturityRating: 'TV-G', language: 'en', country: 'US', avgRating: 8.1, viewCount: 35000, isPublished: true, isFeatured: false, releaseDate: new Date('2024-04-01'), publishedAt: new Date('2024-04-01') },
        { title: 'Beyond the Code', slug: 'beyond-the-code', description: 'A group of elite programmers discover that the code they write has the power to alter reality.', runtime: 130, maturityRating: 'TV-14', language: 'en', country: 'IN', avgRating: 8.6, viewCount: 72000, isPublished: true, isFeatured: false, isOriginal: true, releaseDate: new Date('2024-08-15'), publishedAt: new Date('2024-08-15') },
        { title: 'Neon Beat', slug: 'neon-beat', description: 'A music documentary following underground electronic artists in Tokyo.', runtime: 95, maturityRating: 'TV-14', language: 'en', country: 'JP', avgRating: 7.9, viewCount: 28000, isPublished: true, isFeatured: false, releaseDate: new Date('2024-05-20'), publishedAt: new Date('2024-05-20') },
        { title: 'Code Infinite', slug: 'code-infinite', description: 'When a game developer gets trapped inside their own creation, survival becomes the only objective.', runtime: 115, maturityRating: 'TV-14', language: 'en', country: 'US', avgRating: 8.4, viewCount: 88000, isPublished: true, isFeatured: false, releaseDate: new Date('2024-09-01'), publishedAt: new Date('2024-09-01') },
        { title: 'Dune: Part Two', slug: 'dune-part-two', description: 'Paul Atreides unites with the Fremen to avenge the destruction of his family.', runtime: 166, maturityRating: 'TV-14', language: 'en', country: 'US', avgRating: 9.2, viewCount: 500000, isPublished: true, isFeatured: true, releaseDate: new Date('2024-03-01'), publishedAt: new Date('2024-03-01') },
    ];
    for (const movie of sampleMovies) {
        const created = await prisma.movie.upsert({
            where: { slug: movie.slug },
            update: {},
            create: movie,
        });
        // Assign genres
        if (actionGenre && ['neon-genesis', 'cyberpunk-nights', 'ronin-red', 'dune-part-two'].includes(movie.slug)) {
            await prisma.movieGenre.upsert({
                where: { movieId_genreId: { movieId: created.id, genreId: actionGenre.id } },
                update: {},
                create: { movieId: created.id, genreId: actionGenre.id },
            });
        }
        if (scifiGenre && ['neon-genesis', 'the-void', 'ai-uprising', 'code-infinite', 'dune-part-two', 'cyberpunk-nights'].includes(movie.slug)) {
            await prisma.movieGenre.upsert({
                where: { movieId_genreId: { movieId: created.id, genreId: scifiGenre.id } },
                update: {},
                create: { movieId: created.id, genreId: scifiGenre.id },
            });
        }
        if (thrillerGenre && ['ai-uprising', 'beyond-the-code', 'code-infinite'].includes(movie.slug)) {
            await prisma.movieGenre.upsert({
                where: { movieId_genreId: { movieId: created.id, genreId: thrillerGenre.id } },
                update: {},
                create: { movieId: created.id, genreId: thrillerGenre.id },
            });
        }
        if (fantasyGenre && ['shadow-realm', 'the-void'].includes(movie.slug)) {
            await prisma.movieGenre.upsert({
                where: { movieId_genreId: { movieId: created.id, genreId: fantasyGenre.id } },
                update: {},
                create: { movieId: created.id, genreId: fantasyGenre.id },
            });
        }
        if (animeGenre && ['ronin-red'].includes(movie.slug)) {
            await prisma.movieGenre.upsert({
                where: { movieId_genreId: { movieId: created.id, genreId: animeGenre.id } },
                update: {},
                create: { movieId: created.id, genreId: animeGenre.id },
            });
        }
    }
    // ============================================================
    // SAMPLE SERIES
    // ============================================================
    const sampleSeries = [
        { title: 'Cyberpunk Nights: The Series', slug: 'cyberpunk-nights-series', description: 'Season 2 now streaming. In a city where memories are traded like currency.', totalSeasons: 2, totalEpisodes: 16, maturityRating: 'TV-MA', language: 'en', country: 'US', avgRating: 9.1, viewCount: 320000, isPublished: true, isFeatured: true, isOriginal: true, startDate: new Date('2023-06-01'), publishedAt: new Date('2023-06-01') },
        { title: 'Shadow Realm Chronicles', slug: 'shadow-realm-chronicles', description: 'An epic saga spanning multiple dimensions.', totalSeasons: 3, totalEpisodes: 24, maturityRating: 'TV-14', language: 'en', country: 'IN', avgRating: 8.7, viewCount: 180000, isPublished: true, isFeatured: false, isOriginal: true, startDate: new Date('2022-01-15'), publishedAt: new Date('2022-01-15') },
        { title: 'The Last of Us', slug: 'the-last-of-us', description: 'A hardened survivor and a young girl traverse a post-apocalyptic America.', totalSeasons: 2, totalEpisodes: 17, maturityRating: 'TV-MA', language: 'en', country: 'US', avgRating: 9.3, viewCount: 450000, isPublished: true, isFeatured: true, startDate: new Date('2023-01-15'), publishedAt: new Date('2023-01-15') },
    ];
    for (const series of sampleSeries) {
        await prisma.series.upsert({
            where: { slug: series.slug },
            update: {},
            create: series,
        });
    }
    // ============================================================
    // SAMPLE BANNERS
    // ============================================================
    const banners = [
        { title: 'Cyberpunk Nights', subtitle: 'Season 2 Now Streaming', imageUrl: '/banners/cyberpunk.jpg', linkType: 'series', displayOrder: 1, isActive: true },
        { title: 'Neon Genesis', subtitle: 'A VANIX Original Film', imageUrl: '/banners/neon-genesis.jpg', linkType: 'movie', displayOrder: 2, isActive: true },
        { title: 'Dune: Part Two', subtitle: 'Now Streaming in 4K', imageUrl: '/banners/dune.jpg', linkType: 'movie', displayOrder: 3, isActive: true },
    ];
    for (const banner of banners) {
        const existing = await prisma.banner.findFirst({ where: { title: banner.title } });
        if (!existing) {
            await prisma.banner.create({ data: banner });
        }
    }
    // ============================================================
    // SAMPLE CAST
    // ============================================================
    const castMembers = [
        { name: 'Alex Rivera', slug: 'alex-rivera', bio: 'Award-winning actor known for intense dramatic performances.' },
        { name: 'Elena Vance', slug: 'elena-vance', bio: 'Rising star in the sci-fi genre.' },
        { name: 'Kaelen Voss', slug: 'kaelen-voss', bio: 'International film star and producer.' },
        { name: 'S. Villeneuve', slug: 's-villeneuve', bio: 'Acclaimed director known for visionary storytelling.' },
    ];
    for (const cast of castMembers) {
        await prisma.castMember.upsert({
            where: { slug: cast.slug },
            update: {},
            create: cast,
        });
    }
    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('📋 Admin credentials:');
    console.log('   Email: admin@vanix.com');
    console.log('   Password: vanix@admin2024');
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map