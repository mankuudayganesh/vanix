import { Router } from 'express';
import { optionalAuth } from '@middleware/auth.middleware';
import { searchRateLimiter } from '@middleware/rateLimiter.middleware';
import { ApiResponse } from '@utils/apiResponse';
import { prisma } from '@config/database';
import { cache } from '@config/redis';

const router = Router();

// Full-text search
router.get('/', searchRateLimiter, optionalAuth, async (req, res, next) => {
  try {
    const { q, genre, language, year, rating, type, page = 1, limit = 20 } = req.query;
    const query = (q as string || '').trim();

    if (!query) {
      ApiResponse.success({ res, data: { movies: [], series: [] } });
      return;
    }

    // TODO: Replace with Meilisearch when configured
    // For now, use PostgreSQL ILIKE search
    const movieWhere: any = {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    };

    const seriesWhere: any = {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    };

    if (genre) {
      movieWhere.genres = { some: { genre: { slug: genre } } };
      seriesWhere.genres = { some: { genre: { slug: genre } } };
    }
    if (language) {
      movieWhere.language = language;
      seriesWhere.language = language;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [movies, series, movieCount, seriesCount] = await Promise.all([
      prisma.movie.findMany({
        where: movieWhere,
        take: Number(limit),
        skip,
        orderBy: { viewCount: 'desc' },
        include: { genres: { include: { genre: true } } },
      }),
      type !== 'movie' ? prisma.series.findMany({
        where: seriesWhere,
        take: Number(limit),
        skip,
        orderBy: { viewCount: 'desc' },
        include: { genres: { include: { genre: true } } },
      }) : Promise.resolve([]),
      prisma.movie.count({ where: movieWhere }),
      type !== 'movie' ? prisma.series.count({ where: seriesWhere }) : Promise.resolve(0),
    ]);

    ApiResponse.success({
      res,
      data: { movies, series },
      meta: { total: movieCount + seriesCount, page: Number(page), limit: Number(limit), totalPages: Math.ceil((movieCount + seriesCount) / Number(limit)), hasNext: skip + Number(limit) < movieCount + seriesCount, hasPrev: Number(page) > 1 },
    });
  } catch (error) {
    next(error);
  }
});

// Search suggestions / autocomplete
router.get('/suggestions', searchRateLimiter, async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || (q as string).length < 2) {
      ApiResponse.success({ res, data: [] });
      return;
    }

    const movies = await prisma.movie.findMany({
      where: { isPublished: true, title: { contains: q as string, mode: 'insensitive' } },
      select: { id: true, title: true, posterUrl: true, slug: true },
      take: 5,
      orderBy: { viewCount: 'desc' },
    });

    const series = await prisma.series.findMany({
      where: { isPublished: true, title: { contains: q as string, mode: 'insensitive' } },
      select: { id: true, title: true, posterUrl: true, slug: true },
      take: 5,
      orderBy: { viewCount: 'desc' },
    });

    ApiResponse.success({ res, data: [...movies.map(m => ({ ...m, type: 'movie' })), ...series.map(s => ({ ...s, type: 'series' }))] });
  } catch (error) {
    next(error);
  }
});

// Trending searches
router.get('/trending', async (_req, res, next) => {
  try {
    const cached = await cache.get('search:trending');
    if (cached) {
      ApiResponse.success({ res, data: cached });
      return;
    }

    // Return popular titles as trending searches
    const trending = await prisma.movie.findMany({
      where: { isPublished: true },
      select: { title: true, slug: true },
      orderBy: { viewCount: 'desc' },
      take: 10,
    });

    await cache.set('search:trending', trending, 3600);
    ApiResponse.success({ res, data: trending });
  } catch (error) {
    next(error);
  }
});

export default router;
