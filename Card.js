export default function Card({ value }) {
  return (
    <>
      <style>{`
        .card {
          position: relative;
          width: 285px;
          min-height: 350px;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 28px 22px 22px;

          overflow: hidden;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          color: #f0f6fc;

          background:
            radial-gradient(
              circle at 50% -10%,
              rgba(88, 166, 255, 0.16),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              #161b22,
              #0d1117
            );

          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;

          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);

          transition:
            transform 0.35s cubic-bezier(.2,.8,.2,1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        /* Decorative glow */
        .card::before {
          content: "";
          position: absolute;

          width: 180px;
          height: 180px;

          top: -100px;
          left: 50%;

          transform: translateX(-50%);

          background: rgba(88, 166, 255, 0.12);

          border-radius: 50%;

          filter: blur(45px);

          pointer-events: none;
        }

        /* Subtle top highlight */
        .card::after {
          content: "";

          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;

          height: 1px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(88, 166, 255, 0.5),
            transparent
          );

          opacity: 0.7;
        }

        .card:hover {
          transform: translateY(-10px);

          border-color: rgba(88, 166, 255, 0.28);

          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.32),
            0 0 30px rgba(88, 166, 255, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        /* Avatar wrapper */
        .avatar-wrapper {
          position: relative;

          width: 130px;
          height: 130px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 20px;
        }

        .avatar-ring {
          position: absolute;
          inset: 0;

          border-radius: 50%;

          background: conic-gradient(
            from 0deg,
            #58a6ff,
            #238636,
            #58a6ff
          );

          animation: rotateRing 7s linear infinite;
        }

        .avatar-ring::after {
          content: "";

          position: absolute;
          inset: 3px;

          background: #0d1117;
          border-radius: 50%;
        }

        @keyframes rotateRing {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .avatar {
          position: relative;
          z-index: 2;

          width: 112px;
          height: 112px;

          border-radius: 50%;

          object-fit: cover;

          border: 3px solid #0d1117;

          box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.35);

          transition:
            transform 0.35s ease,
            filter 0.35s ease;
        }

        .card:hover .avatar {
          transform: scale(1.04);
          filter: brightness(1.08);
        }

        /* Online indicator */
        .online-dot {
          position: absolute;
          z-index: 4;

          right: 7px;
          bottom: 9px;

          width: 18px;
          height: 18px;

          background: #3fb950;

          border: 3px solid #0d1117;

          border-radius: 50%;

          box-shadow:
            0 0 10px rgba(63, 185, 80, 0.6);
        }

        .profile-label {
          display: flex;
          align-items: center;
          gap: 6px;

          margin-bottom: 8px;

          color: #8b949e;

          font-size: 11px;
          font-weight: 600;

          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .profile-label svg {
          width: 13px;
          height: 13px;

          fill: currentColor;
        }

        .username {
          max-width: 240px;

          margin: 0;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          color: #f0f6fc;

          font-size: 1.35rem;
          font-weight: 700;

          letter-spacing: -0.3px;

          transition: color 0.25s ease;
        }

        .card:hover .username {
          color: #58a6ff;
        }

        .username::before {
          content: "@";

          color: #6e7681;
          font-weight: 500;
        }

        .divider {
          width: 70%;

          height: 1px;

          margin: 20px 0;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
        }

        .profile-btn {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          padding: 11px 16px;

          color: #f0f6fc;

          text-decoration: none;

          background: rgba(255, 255, 255, 0.05);

          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;

          font-size: 14px;
          font-weight: 650;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .profile-btn svg {
          width: 16px;
          height: 16px;

          transition:
            transform 0.25s ease;
        }

        .profile-btn:hover {
          color: #ffffff;

          background: linear-gradient(
            135deg,
            #238636,
            #2ea043
          );

          border-color: rgba(63, 185, 80, 0.4);

          box-shadow:
            0 7px 18px rgba(35, 134, 54, 0.25);

          transform: translateY(-2px);
        }

        .profile-btn:hover svg {
          transform: translateX(3px);
        }

        .profile-btn:active {
          transform: translateY(0);
        }

        .profile-btn:focus-visible {
          outline: none;

          box-shadow:
            0 0 0 3px rgba(88, 166, 255, 0.25);
        }

        @media (max-width: 500px) {
          .card {
            width: min(285px, 90vw);
          }
        }
      `}</style>

      <div className="card">
        <div className="avatar-wrapper">
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

        <h2 className="username">{value.login}</h2>

        <div className="divider"></div>

        <a
          className="profile-btn"
          href={value.html_url || value.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
      </div>
    </>
  );
}
