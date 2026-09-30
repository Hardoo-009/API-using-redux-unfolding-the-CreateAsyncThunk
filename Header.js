import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import UserModal from './UserModal';

import './Header.css';
import { FetchData, setFilterQuery, setSortBy } from './Slicer1';

export default function Header() {
  const dispatch = useDispatch();

  const {
    loading,
    data,
    favorites,
    error,
    count,
    since,
    viewMode,
    filterQuery,
    sortBy,
  } = useSelector((state) => state.github);

  useEffect(() => {
    const randomSince = Math.floor(Math.random() * 50000 + 1);
    dispatch(FetchData({ count: 10, since: randomSince, isPagination: false }));
  }, [dispatch]);

  function handleLoadMore() {
    dispatch(FetchData({ count, since, isPagination: true }));
  }

  function handleRetry() {
    const randomSince = Math.floor(Math.random() * 50000 + 1);
    dispatch(FetchData({ count: 10, since: randomSince, isPagination: false }));
  }

  // 1. Choose base data list depending on viewMode
  let displayedData = viewMode === 'favorites' ? favorites : data;

  // 2. Apply In-memory Client Filtering
  if (filterQuery.trim()) {
    displayedData = displayedData.filter((user) =>
      user.login.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }

  // 3. Apply In-memory Client Sorting
  if (sortBy !== 'default') {
    displayedData = [...displayedData].sort((a, b) => {
      if (sortBy === 'login-asc') return a.login.localeCompare(b.login);
      if (sortBy === 'login-desc') return b.login.localeCompare(a.login);
      if (sortBy === 'id-asc') return a.id - b.id;
      if (sortBy === 'id-desc') return b.id - a.id;
      return 0;
    });
  }

  /* ---------------- LOADING (INITIAL) ---------------- */
  if (loading && data.length === 0) {
    return (
      <main className="results-container">
        <div className="results-header">
          <div className="skeleton results-title-skeleton"></div>
          <div className="skeleton results-count-skeleton"></div>
        </div>

        <div className="cards-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="skeleton-card" key={index}>
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton skeleton-small"></div>
              <div className="skeleton skeleton-name"></div>
              <div className="skeleton-divider"></div>
              <div className="skeleton skeleton-button"></div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error && data.length === 0) {
    return (
      <section className="error-container">
        <div className="error-box">
          <div className="error-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h2 className="error-title">Something went wrong</h2>
          <p className="error-text">{error}</p>

          <button className="retry-btn" onClick={handleRetry}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* ---------------- SUCCESS & DISPLAY ---------------- */
  return (
    <>
      <UserModal />

      <main className="results-container">
        <div className="results-header">
          <h2 className="results-title">
            <span className="results-dot"></span>
            {viewMode === 'search'
              ? 'Search Result'
              : viewMode === 'favorites'
                ? 'Bookmarked Favorites'
                : 'GitHub Users'}
          </h2>

          {/* FILTER AND SORT CONTROLS */}
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Filter loaded results..."
              value={filterQuery}
              onChange={(e) => dispatch(setFilterQuery(e.target.value))}
              className="filter-input"
            />

            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="sort-select"
            >
              <option value="default">Sort By: Default</option>
              <option value="login-asc">Username (A - Z)</option>
              <option value="login-desc">Username (Z - A)</option>
              <option value="id-asc">GitHub ID (Low - High)</option>
              <option value="id-desc">GitHub ID (High - Low)</option>
            </select>

            <span className="results-count">
              {displayedData.length} user(s) displayed
            </span>
          </div>
        </div>

        {displayedData.length === 0 ? (
          <section className="empty-container">
            <div className="empty-box">
              <div className="empty-icon">🔎</div>
              <h2 className="empty-title">No users found</h2>
              <p className="empty-text">
                {viewMode === 'favorites'
                  ? 'No favorites bookmarked yet. Click the ★ on any card!'
                  : 'No users match your filter criteria.'}
              </p>
            </div>
          </section>
        ) : (
          <div className="cards-grid">
            {displayedData.map((value, index) => (
              <div
                className="card-wrapper"
                key={value.id}
                style={{
                  animationDelay: `${(index % 10) * 50}ms`,
                }}
              >
                <Card value={value} />
              </div>
            ))}
          </div>
        )}

        {/* Show Load More Button only in List Mode */}
        {viewMode === 'list' && (
          <div className="pagination-container">
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading More...' : 'Load More Users'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
