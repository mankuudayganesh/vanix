'use client';

import { useState } from 'react';

// ============================================================
// ADMIN DASHBOARD — MAIN PAGE
// ============================================================

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'content', label: 'Content', icon: '🎬' },
  { id: 'videos', label: 'Video Processing', icon: '🎞️' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

// Mock data for dashboard
const mockStats = {
  revenue: { value: '₹24,85,000', change: '+12.5%', positive: true },
  activeUsers: { value: '1,24,500', change: '+8.3%', positive: true },
  watchTime: { value: '45.2K hrs', change: '+15.1%', positive: true },
  subscribers: { value: '32,150', change: '+5.7%', positive: true },
  newSignups: { value: '2,340', change: '-2.1%', positive: false },
  churnRate: { value: '3.2%', change: '-0.5%', positive: true },
  totalContent: { value: '1,250', change: '+48', positive: true },
  avgRating: { value: '8.6', change: '+0.2', positive: true },
};

const mockRevenueData = [
  { month: 'Jan', revenue: 1850000, subscribers: 28400 },
  { month: 'Feb', revenue: 1920000, subscribers: 29100 },
  { month: 'Mar', revenue: 2050000, subscribers: 29800 },
  { month: 'Apr', revenue: 1980000, subscribers: 30200 },
  { month: 'May', revenue: 2180000, subscribers: 31100 },
  { month: 'Jun', revenue: 2350000, subscribers: 31800 },
  { month: 'Jul', revenue: 2485000, subscribers: 32150 },
];

const mockTopContent = [
  { rank: 1, title: 'Cyberpunk Nights S2', type: 'Series', views: '2.5M', rating: 9.1, trend: '↑' },
  { rank: 2, title: 'Dune: Part Two', type: 'Movie', views: '1.8M', rating: 9.2, trend: '↑' },
  { rank: 3, title: 'Neon Genesis', type: 'Movie', views: '1.2M', rating: 8.9, trend: '→' },
  { rank: 4, title: 'Shadow Realm Chronicles', type: 'Series', views: '980K', rating: 8.7, trend: '↑' },
  { rank: 5, title: 'The Last of Us S2', type: 'Series', views: '850K', rating: 9.3, trend: '↑' },
  { rank: 6, title: 'Ronin Red', type: 'Movie', views: '720K', rating: 9.0, trend: '↓' },
  { rank: 7, title: 'A.I. Uprising', type: 'Movie', views: '650K', rating: 8.3, trend: '→' },
  { rank: 8, title: 'Beyond the Code', type: 'Movie', views: '580K', rating: 8.6, trend: '↑' },
];

const mockRecentUsers = [
  { id: 1, name: 'Aditya Sharma', email: 'aditya@email.com', plan: 'Premium', joined: '2 hours ago', status: 'active' },
  { id: 2, name: 'Priya Patel', email: 'priya@email.com', plan: 'Standard', joined: '5 hours ago', status: 'active' },
  { id: 3, name: 'Rahul Verma', email: 'rahul@email.com', plan: 'Basic', joined: '1 day ago', status: 'active' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', plan: 'Family', joined: '1 day ago', status: 'active' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', plan: 'Mobile', joined: '2 days ago', status: 'banned' },
];

const mockDeviceBreakdown = [
  { device: 'Mobile', percentage: 58, color: '#E50914' },
  { device: 'Web', percentage: 22, color: '#0EA5E9' },
  { device: 'TV', percentage: 14, color: '#46D369' },
  { device: 'Tablet', percentage: 6, color: '#F5A623' },
];

const mockVideoJobs = [
  { id: 1, title: 'Neon Genesis: Director\'s Cut', status: 'PROCESSING', progress: 67 },
  { id: 2, title: 'Cyberpunk Nights S2E09', status: 'QUEUED', progress: 0 },
  { id: 3, title: 'Shadow Realm: Extended', status: 'COMPLETED', progress: 100 },
  { id: 4, title: 'A.I. Uprising 2', status: 'PROCESSING', progress: 34 },
];

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">V</div>
          <div>
            <h1>VANIX</h1>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main</div>
            {navItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.id === 'notifications' && <span className="nav-badge">3</span>}
              </div>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Management</div>
            {navItems.slice(4).map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-color)' }}>
          <div className="nav-item" style={{ gap: '10px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--vanix-red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: 'white'
            }}>SA</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Super Admin</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>admin@vanix.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-title">
            <h2>{navItems.find(n => n.id === activePage)?.label || 'Dashboard'}</h2>
            <p>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="top-bar-actions">
            <div className="search-bar" style={{ width: 280 }}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm">+ Add Content</button>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'content' && <ContentPage />}
          {activePage === 'videos' && <VideoProcessingPage />}
          {activePage === 'users' && <UsersPage />}
          {activePage === 'subscriptions' && <SubscriptionsPage />}
          {activePage === 'notifications' && <NotificationsPage />}
          {activePage === 'analytics' && <AnalyticsPage />}
          {activePage === 'settings' && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================

function DashboardPage() {
  return (
    <>
      {/* Stats Grid */}
      <div className="stats-grid">
        {Object.entries(mockStats).map(([key, stat]) => (
          <div className="stat-card" key={key} style={{ '--card-accent': stat.positive ? 'var(--success)' : 'var(--error)' } as any}>
            <div className="stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.positive ? '↑' : '↓'} {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockRevenueData.map((d) => (
              <div key={d.month} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '36px', fontSize: '12px', color: 'var(--text-muted)' }}>{d.month}</span>
                <div style={{ flex: 1, height: '24px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(d.revenue / 2500000) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--vanix-red), #FF4444)',
                    borderRadius: '4px',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <span style={{ fontSize: '12px', fontFamily: 'Orbitron', fontWeight: 600, color: 'var(--text-secondary)', width: '80px', textAlign: 'right' }}>
                  ₹{(d.revenue / 100000).toFixed(1)}L
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Device Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            {mockDeviceBreakdown.map((d) => (
              <div key={d.device}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{d.device}</span>
                  <span style={{ fontSize: '13px', fontFamily: 'Orbitron', fontWeight: 700, color: d.color }}>{d.percentage}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${d.percentage}%`,
                    height: '100%',
                    background: d.color,
                    borderRadius: '4px',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Top Content */}
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>🔥 Top Content</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Views</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {mockTopContent.map((item) => (
                <tr key={item.rank}>
                  <td style={{ fontFamily: 'Orbitron', fontWeight: 700, color: item.rank <= 3 ? 'var(--vanix-red)' : 'var(--text-muted)' }}>{item.rank}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.title}</td>
                  <td><span className="badge badge-info">{item.type}</span></td>
                  <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>{item.views}</td>
                  <td style={{ color: 'var(--success)' }}>★ {item.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Users */}
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>👥 Recent Users</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '13px' }}>{user.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{user.email}</div>
                    </div>
                  </td>
                  <td><span className="badge badge-neutral">{user.plan}</span></td>
                  <td style={{ fontSize: '12px' }}>{user.joined}</td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Video Processing Queue */}
      <div style={{ marginTop: '20px' }}>
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>🎞️ Video Processing Queue</h3>
            <button className="btn btn-primary btn-sm">+ Upload Video</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Content</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVideoJobs.map((job) => (
                <tr key={job.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{job.title}</td>
                  <td>
                    <span className={`badge ${
                      job.status === 'COMPLETED' ? 'badge-success' :
                      job.status === 'PROCESSING' ? 'badge-warning' : 'badge-neutral'
                    }`}>{job.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden', maxWidth: '200px' }}>
                        <div style={{
                          width: `${job.progress}%`,
                          height: '100%',
                          background: job.status === 'COMPLETED' ? 'var(--success)' : 'var(--vanix-red)',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: '12px', fontFamily: 'Orbitron', fontWeight: 600 }}>{job.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============================================================
// CONTENT PAGE
// ============================================================

function ContentPage() {
  const [tab, setTab] = useState<'movies' | 'series' | 'genres' | 'banners'>('movies');

  const movies = [
    { id: 1, title: 'Neon Genesis', genre: 'Sci-Fi, Action', status: 'Published', views: '125K', rating: 8.9, year: 2024 },
    { id: 2, title: 'Cyberpunk Nights', genre: 'Sci-Fi, Thriller', status: 'Published', views: '250K', rating: 9.1, year: 2024 },
    { id: 3, title: 'Shadow Realm', genre: 'Fantasy, Action', status: 'Published', views: '180K', rating: 8.5, year: 2024 },
    { id: 4, title: 'The Void', genre: 'Sci-Fi', status: 'Published', views: '95K', rating: 8.7, year: 2024 },
    { id: 5, title: 'Ronin Red', genre: 'Action, Anime', status: 'Published', views: '200K', rating: 9.0, year: 2022 },
    { id: 6, title: 'Dune: Part Two', genre: 'Sci-Fi, Action', status: 'Published', views: '500K', rating: 9.2, year: 2024 },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['movies', 'series', 'genres', 'banners'] as const).map((t) => (
          <button
            key={t}
            className={`btn ${tab === t ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'movies' && (
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>Movies ({movies.length})</h3>
            <button className="btn btn-primary btn-sm">+ Add Movie</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Views</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.year}</td>
                  <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>{movie.views}</td>
                  <td style={{ color: 'var(--success)' }}>★ {movie.rating}</td>
                  <td><span className="badge badge-success">{movie.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="btn btn-ghost btn-sm">Edit</button>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'series' && (
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>Series</h3>
            <button className="btn btn-primary btn-sm">+ Add Series</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Seasons</th><th>Episodes</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Cyberpunk Nights: The Series</td>
                <td>2</td><td>16</td>
                <td><span className="badge badge-success">Published</span></td>
                <td><button className="btn btn-ghost btn-sm">Manage</button></td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Shadow Realm Chronicles</td>
                <td>3</td><td>24</td>
                <td><span className="badge badge-success">Published</span></td>
                <td><button className="btn btn-ghost btn-sm">Manage</button></td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>The Last of Us</td>
                <td>2</td><td>17</td>
                <td><span className="badge badge-success">Published</span></td>
                <td><button className="btn btn-ghost btn-sm">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {tab === 'genres' && (
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>Genres</h3>
            <button className="btn btn-primary btn-sm">+ Add Genre</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', padding: '20px 24px' }}>
            {['Action', 'Adventure', 'Animation', 'Anime', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Sports', 'Thriller', 'War', 'Western', 'Musical', 'Family', 'Kids'].map((genre) => (
              <div key={genre} style={{
                padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{genre}</span>
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'banners' && (
        <div className="data-table-wrapper">
          <div className="data-table-header">
            <h3>Hero Banners</h3>
            <button className="btn btn-primary btn-sm">+ Add Banner</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Subtitle</th><th>Link Type</th><th>Status</th><th>Order</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Cyberpunk Nights</td>
                <td>Season 2 Now Streaming</td>
                <td><span className="badge badge-info">Series</span></td>
                <td><span className="badge badge-success">Active</span></td>
                <td>1</td>
                <td><button className="btn btn-ghost btn-sm">Edit</button></td>
              </tr>
              <tr>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Neon Genesis</td>
                <td>A VANIX Original Film</td>
                <td><span className="badge badge-info">Movie</span></td>
                <td><span className="badge badge-success">Active</span></td>
                <td>2</td>
                <td><button className="btn btn-ghost btn-sm">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ============================================================
// VIDEO PROCESSING PAGE
// ============================================================

function VideoProcessingPage() {
  return (
    <>
      <div className="upload-zone" style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '40px' }}>📤</div>
        <p>Drag & drop video files here, or click to browse</p>
        <p className="upload-hint">Supported formats: MP4, MKV, AVI, MOV — Max 50GB</p>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h3>Processing Queue</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm">All</button>
            <button className="btn btn-ghost btn-sm">Processing</button>
            <button className="btn btn-ghost btn-sm">Completed</button>
            <button className="btn btn-ghost btn-sm">Failed</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Content</th>
              <th>Type</th>
              <th>Resolutions</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockVideoJobs.map((job) => (
              <tr key={job.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{job.title}</td>
                <td>Movie</td>
                <td style={{ fontSize: '11px' }}>480p, 720p, 1080p, 4K</td>
                <td>
                  <span className={`badge ${
                    job.status === 'COMPLETED' ? 'badge-success' :
                    job.status === 'PROCESSING' ? 'badge-warning' : 'badge-neutral'
                  }`}>{job.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden', maxWidth: '160px' }}>
                      <div style={{
                        width: `${job.progress}%`, height: '100%',
                        background: job.status === 'COMPLETED' ? 'var(--success)' : job.status === 'FAILED' ? 'var(--error)' : 'var(--vanix-red)',
                        borderRadius: '3px', transition: 'width 0.3s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', fontFamily: 'Orbitron', fontWeight: 600 }}>{job.progress}%</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {job.status === 'PROCESSING' && <button className="btn btn-ghost btn-sm">Cancel</button>}
                    {job.status === 'COMPLETED' && <button className="btn btn-ghost btn-sm">View</button>}
                    {job.status === 'QUEUED' && <button className="btn btn-ghost btn-sm">Start</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ============================================================
// USERS PAGE
// ============================================================

function UsersPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div className="search-bar" style={{ width: 320 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search users by name, email, phone..." />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm">All Users</button>
          <button className="btn btn-ghost btn-sm">Active</button>
          <button className="btn btn-ghost btn-sm">Banned</button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h3>All Users (1,24,500)</h3>
          <button className="btn btn-secondary btn-sm">Export CSV</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Plan</th>
              <th>Devices</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRecentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-tertiary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, color: 'var(--vanix-red)'
                    }}>{user.name.charAt(0)}</div>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{user.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>+91 98XXX XXXXX</td>
                <td><span className="badge badge-info">{user.plan}</span></td>
                <td>2</td>
                <td>{user.joined}</td>
                <td>
                  <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>{user.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn btn-ghost btn-sm">View</button>
                    <button className="btn btn-danger btn-sm">
                      {user.status === 'active' ? 'Ban' : 'Unban'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ============================================================
// SUBSCRIPTIONS PAGE
// ============================================================

function SubscriptionsPage() {
  const plans = [
    { name: 'Mobile', price: '₹149', users: 15200, revenue: '₹22.6L' },
    { name: 'Basic', price: '₹199', users: 8500, revenue: '₹16.9L' },
    { name: 'Standard', price: '₹499', users: 5200, revenue: '₹25.9L' },
    { name: 'Premium', price: '₹799', users: 2100, revenue: '₹16.8L' },
    { name: 'Family', price: '₹999', users: 1150, revenue: '₹11.5L' },
  ];

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total Subscribers</div><div className="stat-value">32,150</div></div>
        <div className="stat-card"><div className="stat-label">Monthly Revenue</div><div className="stat-value">₹93.7L</div></div>
        <div className="stat-card"><div className="stat-label">Active Coupons</div><div className="stat-value">12</div></div>
        <div className="stat-card"><div className="stat-label">Churn Rate</div><div className="stat-value">3.2%</div></div>
      </div>

      <div className="data-table-wrapper" style={{ marginBottom: '20px' }}>
        <div className="data-table-header">
          <h3>Subscription Plans</h3>
          <button className="btn btn-primary btn-sm">Edit Plans</button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Plan</th><th>Price</th><th>Active Users</th><th>Revenue</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.name}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{plan.name}</td>
                <td style={{ fontFamily: 'Orbitron', fontWeight: 600 }}>{plan.price}/mo</td>
                <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>{plan.users.toLocaleString()}</td>
                <td style={{ fontFamily: 'Orbitron', fontSize: '12px', color: 'var(--success)' }}>{plan.revenue}</td>
                <td><button className="btn btn-ghost btn-sm">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h3>Active Coupons</h3>
          <button className="btn btn-primary btn-sm">+ Create Coupon</button>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Code</th><th>Discount</th><th>Used</th><th>Valid Until</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontFamily: 'Orbitron', fontWeight: 700, color: 'var(--vanix-red)' }}>VANIX50</td>
              <td>50% off</td><td>234 / 500</td><td>Dec 31, 2024</td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
            <tr>
              <td style={{ fontFamily: 'Orbitron', fontWeight: 700, color: 'var(--vanix-red)' }}>WELCOME100</td>
              <td>₹100 off</td><td>1,205 / ∞</td><td>Mar 31, 2025</td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

// ============================================================
// NOTIFICATIONS PAGE
// ============================================================

function NotificationsPage() {
  return (
    <>
      <div className="chart-card" style={{ marginBottom: '24px' }}>
        <h3>Send Push Notification</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" type="text" placeholder="Notification title..." />
          </div>
          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <select className="form-select">
              <option>All Users</option>
              <option>Active Subscribers</option>
              <option>Free Users</option>
              <option>Inactive Users (30d)</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Body</label>
          <textarea className="form-textarea" placeholder="Notification body..." />
        </div>
        <div className="form-group">
          <label className="form-label">Image URL (optional)</label>
          <input className="form-input" type="text" placeholder="https://cdn.vanix.com/..." />
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button className="btn btn-primary">Send Now</button>
          <button className="btn btn-secondary">Schedule</button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <div className="data-table-header">
          <h3>Recent Campaigns</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Title</th><th>Audience</th><th>Sent</th><th>Opened</th><th>CTR</th><th>Sent At</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Cyberpunk Nights S2 is here!</td>
              <td>All Users</td>
              <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>124,500</td>
              <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>45,200</td>
              <td style={{ color: 'var(--success)' }}>36.3%</td>
              <td>2 days ago</td>
            </tr>
            <tr>
              <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Your subscription expires soon</td>
              <td>Expiring Subs</td>
              <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>2,340</td>
              <td style={{ fontFamily: 'Orbitron', fontSize: '12px' }}>1,890</td>
              <td style={{ color: 'var(--success)' }}>80.8%</td>
              <td>5 days ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

// ============================================================
// ANALYTICS PAGE
// ============================================================

function AnalyticsPage() {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">DAU</div><div className="stat-value">45,200</div><div className="stat-change positive">↑ +3.2%</div></div>
        <div className="stat-card"><div className="stat-label">WAU</div><div className="stat-value">82,400</div><div className="stat-change positive">↑ +5.1%</div></div>
        <div className="stat-card"><div className="stat-label">MAU</div><div className="stat-value">1,24,500</div><div className="stat-change positive">↑ +8.3%</div></div>
        <div className="stat-card"><div className="stat-label">Avg Watch Time</div><div className="stat-value">2.4 hrs</div><div className="stat-change positive">↑ +12min</div></div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>User Growth (Last 12 Months)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {[
              { month: 'Aug', value: 65000 }, { month: 'Sep', value: 72000 }, { month: 'Oct', value: 78000 },
              { month: 'Nov', value: 85000 }, { month: 'Dec', value: 92000 }, { month: 'Jan', value: 98000 },
              { month: 'Feb', value: 102000 }, { month: 'Mar', value: 108000 }, { month: 'Apr', value: 112000 },
              { month: 'May', value: 118000 }, { month: 'Jun', value: 121000 }, { month: 'Jul', value: 124500 },
            ].map((d) => (
              <div key={d.month} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '32px', fontSize: '11px', color: 'var(--text-muted)' }}>{d.month}</span>
                <div style={{ flex: 1, height: '20px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${(d.value / 130000) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #E50914, #FF6B6B)', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'Orbitron', fontWeight: 600, color: 'var(--text-secondary)', width: '55px', textAlign: 'right' }}>
                  {(d.value / 1000).toFixed(1)}K
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Retention Cohort</h3>
          <div style={{ marginTop: '12px' }}>
            <table className="data-table" style={{ fontSize: '11px' }}>
              <thead>
                <tr><th>Cohort</th><th>Day 1</th><th>Day 7</th><th>Day 14</th><th>Day 30</th></tr>
              </thead>
              <tbody>
                <tr><td>Jul W1</td><td style={{ color: 'var(--success)' }}>92%</td><td style={{ color: 'var(--success)' }}>68%</td><td style={{ color: 'var(--warning)' }}>52%</td><td style={{ color: 'var(--warning)' }}>41%</td></tr>
                <tr><td>Jul W2</td><td style={{ color: 'var(--success)' }}>89%</td><td style={{ color: 'var(--success)' }}>65%</td><td style={{ color: 'var(--warning)' }}>49%</td><td>—</td></tr>
                <tr><td>Jul W3</td><td style={{ color: 'var(--success)' }}>91%</td><td style={{ color: 'var(--success)' }}>71%</td><td>—</td><td>—</td></tr>
                <tr><td>Jul W4</td><td style={{ color: 'var(--success)' }}>88%</td><td>—</td><td>—</td><td>—</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// SETTINGS PAGE
// ============================================================

function SettingsPage() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div className="chart-card" style={{ marginBottom: '20px' }}>
        <h3>General Settings</h3>
        <div className="form-group" style={{ marginTop: '16px' }}>
          <label className="form-label">Platform Name</label>
          <input className="form-input" type="text" defaultValue="VANIX" />
        </div>
        <div className="form-group">
          <label className="form-label">Support Email</label>
          <input className="form-input" type="email" defaultValue="support@vanix.com" />
        </div>
        <div className="form-group">
          <label className="form-label">CDN Base URL</label>
          <input className="form-input" type="text" defaultValue="https://cdn.vanix.com" />
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div className="chart-card">
        <h3>Admin Accounts</h3>
        <table className="data-table" style={{ marginTop: '12px' }}>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Super Admin</td>
              <td>admin@vanix.com</td>
              <td><span className="badge badge-error">Super Admin</span></td>
              <td><span className="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>+ Add Admin</button>
      </div>
    </div>
  );
}
