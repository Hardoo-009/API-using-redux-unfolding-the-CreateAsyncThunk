import { useDispatch, useSelector } from 'react-redux';
import './Card.css';
import { FetchUserDetails, toggleFavorite } from './Slicer1';

export default function Card({ value }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.github);

  const isFavorite = favorites.some((fav) => fav.id === value.id);

  function handleCardClick() {
    dispatch(FetchUserDetails(value.login));
  }

  function handleFavoriteToggle(e) {
    e.stopPropagation(); // prevent opening modal when clicking star
    dispatch(toggleFavorite(value));
  }

  return (
    <div className="card">
      <button
        className={`fav-star-btn ${isFavorite ? 'is-fav' : ''}`}
        onClick={handleFavoriteToggle}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        ★
      </button>

      <div
        className="avatar-wrapper"
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="avatar-ring"></div>

        <img
          className="avatar"
          src={value.avatar_url}
          alt={`${value.login}'s GitHub avatar`}
        />

        <span className="online-dot" aria-label="GitHub profile"></span>
      </div>

      <div className="profile-label">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.12c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.04.78 2.1v3.13c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
        GitHub Profile
      </div>

      <h2
        className="username"
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        {value.login}
      </h2>

      <div className="divider"></div>

      <div className="card-action-btns">
        <button className="details-btn" onClick={handleCardClick}>
          Quick View
        </button>

        <a
          className="profile-btn"
          href={value.html_url || value.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
