import { useDispatch, useSelector } from 'react-redux';
import {
  FetchData,
  SearchUser,
  resetPagination,
  setCount,
  setSearchQuery,
  setViewMode,
} from './Slicer1';
import './Top.css';

export default function Top() {
  const dispatch = useDispatch();
  const { count, searchQuery, viewMode, favorites } = useSelector(
    (state) => state.github,
  );

  function handleFetchUsers() {
    const randomSince = Math.floor(Math.random() * 50000 + 1);
    dispatch(resetPagination());
    dispatch(FetchData({ count, since: randomSince, isPagination: false }));
  }

  function handleSearchUser(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    dispatch(SearchUser(searchQuery));
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="github-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.12c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.04.78 2.1v3.13c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </div>

          <div className="header-text">
            <h1 className="title">GitHub User Explorer</h1>
            <p className="subtitle">
              Search specific users or fetch batch profiles seamlessly.
            </p>
            <div className="status">
              <span className="status-dot"></span>
              API Connected
            </div>
          </div>
        </div>

        <div className="header-controls">
          {/* VIEW TABS */}
          <div className="view-tabs">
            <button
              className={`tab-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => dispatch(setViewMode('list'))}
            >
              Explore Users
            </button>
            <button
              className={`tab-btn ${viewMode === 'favorites' ? 'active' : ''}`}
              onClick={() => dispatch(setViewMode('favorites'))}
            >
              ★ Favorites{' '}
              {favorites.length > 0 && (
                <span className="fav-badge">{favorites.length}</span>
              )}
            </button>
          </div>

          {/* SEARCH SPECIFIC USER */}
          <form className="search-box" onSubmit={handleSearchUser}>
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder="Search username..."
                className="top-input search-input"
                aria-label="Search username"
              />
            </div>

            <button type="submit" className="top-btn btn-search">
              Search
            </button>
          </form>

          {/* FETCH BATCH USERS */}
          <div className="fetch-box">
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>

              <input
                type="number"
                min="1"
                value={count === '' || count === 0 ? '' : count}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(setCount(val === '' ? '' : Number(val)));
                }}
                placeholder="Count"
                className="top-input count-input"
                aria-label="Number of users"
              />
            </div>

            <button className="top-btn btn-fetch" onClick={handleFetchUsers}>
              Fetch Users
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
