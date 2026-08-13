import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { FetchData } from './Slicer1';

export default function Header() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state) => state.slice1);

  function fetchUsers(count = 10) {
    const from = Math.floor(Math.random() * 10000 + 1);
    dispatch(FetchData([count, from]));
  }

  useEffect(() => {
    fetchUsers(10);
  }, []);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <>
        <style>{`
          .results-container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 10px 35px 50px;
          }

          .results-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 25px;
          }

          .results-title-skeleton {
            width: 150px;
            height: 22px;
            border-radius: 6px;
          }

          .results-count-skeleton {
            width: 90px;
            height: 16px;
            border-radius: 5px;
          }

          .skeleton {
            position: relative;
            overflow: hidden;

            background: #21262d;
          }

          .skeleton::after {
            content: "";

            position: absolute;
            inset: 0;

            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.08) 45%,
              rgba(255, 255, 255, 0.13) 50%,
              rgba(255, 255, 255, 0.08) 55%,
              transparent 100%
            );

            transform: translateX(-100%);

            animation: shimmer 1.5s infinite;
          }

          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }

          .cards-grid {
            display: grid;

            grid-template-columns:
              repeat(
                auto-fit,
                minmax(260px, 285px)
              );

            justify-content: center;

            gap: 24px;
          }

          .skeleton-card {
            position: relative;

            width: 285px;
            height: 350px;

            padding: 28px 22px;

            display: flex;
            flex-direction: column;
            align-items: center;

            background:
              linear-gradient(
                145deg,
                #161b22,
                #0d1117
              );

            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 20px;

            box-shadow:
              0 12px 30px rgba(0,0,0,0.18);
          }

          .skeleton-avatar {
            width: 130px;
            height: 130px;

            margin-bottom: 22px;

            border-radius: 50%;
          }

          .skeleton-small {
            width: 100px;
            height: 11px;

            margin-bottom: 10px;

            border-radius: 5px;
          }

          .skeleton-name {
            width: 150px;
            height: 22px;

            margin-bottom: 25px;

            border-radius: 6px;
          }

          .skeleton-divider {
            width: 70%;
            height: 1px;

            margin-bottom: 20px;

            background: rgba(255,255,255,0.07);
          }

          .skeleton-button {
            width: 100%;
            height: 43px;

            border-radius: 10px;

            margin-top: auto;
          }

          @media (max-width: 700px) {
            .results-container {
              padding: 10px 18px 40px;
            }

            .cards-grid {
              grid-template-columns: 1fr;
            }

            .skeleton-card {
              width: min(285px, 90vw);
            }
          }
        `}</style>

        <main className="results-container">
          <div className="results-header">
            <div className="skeleton skeleton-title-skeleton results-title-skeleton"></div>

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
      </>
    );
  }

  /* ---------------- ERROR ---------------- */

  if (error) {
    return (
      <>
        <style>{`
          .error-container {
            min-height: 450px;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 40px 20px;
          }

          .error-box {
            width: min(500px, 100%);

            padding: 45px 30px;

            text-align: center;

            background:
              radial-gradient(
                circle at 50% 0%,
                rgba(248, 81, 73, 0.1),
                transparent 45%
              ),
              linear-gradient(
                145deg,
                #161b22,
                #0d1117
              );

            border: 1px solid rgba(248, 81, 73, 0.18);

            border-radius: 22px;

            box-shadow:
              0 20px 50px rgba(0,0,0,0.25);
          }

          .error-icon {
            width: 65px;
            height: 65px;

            margin: 0 auto 20px;

            display: flex;
            align-items: center;
            justify-content: center;

            color: #f85149;

            background: rgba(248,81,73,0.1);

            border: 1px solid rgba(248,81,73,0.2);

            border-radius: 18px;
          }

          .error-icon svg {
            width: 32px;
            height: 32px;
          }

          .error-title {
            margin: 0 0 10px;

            color: #f0f6fc;

            font-size: 1.45rem;
            font-weight: 700;
          }

          .error-text {
            max-width: 380px;

            margin: 0 auto 25px;

            color: #8b949e;

            font-size: 0.92rem;
            line-height: 1.6;
          }

          .retry-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            padding: 11px 20px;

            color: #ffffff;

            background:
              linear-gradient(
                135deg,
                #238636,
                #2ea043
              );

            border: 1px solid rgba(63,185,80,0.25);

            border-radius: 10px;

            font-size: 14px;
            font-weight: 650;

            cursor: pointer;

            box-shadow:
              0 7px 18px rgba(35,134,54,0.22);

            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease,
              filter 0.2s ease;
          }

          .retry-btn:hover {
            transform: translateY(-2px);
            filter: brightness(1.08);

            box-shadow:
              0 10px 24px rgba(35,134,54,0.3);
          }

          .retry-btn:active {
            transform: translateY(0);
          }

          .retry-btn svg {
            width: 16px;
            height: 16px;
          }
        `}</style>

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

            <p className="error-text">
              We couldn't fetch the GitHub users right now. Please check your
              connection and try again.
            </p>

            <button className="retry-btn" onClick={() => fetchUsers(10)}>
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
      </>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */

  if (!data || data.length === 0) {
    return (
      <>
        <style>{`
          .empty-container {
            min-height: 400px;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 40px 20px;
          }

          .empty-box {
            text-align: center;
            color: #8b949e;
          }

          .empty-icon {
            font-size: 3rem;
            margin-bottom: 12px;
          }

          .empty-title {
            margin: 0 0 8px;

            color: #f0f6fc;

            font-size: 1.35rem;
          }

          .empty-text {
            margin: 0;

            color: #8b949e;
            font-size: 0.9rem;
          }
        `}</style>

        <section className="empty-container">
          <div className="empty-box">
            <div className="empty-icon">🔎</div>

            <h2 className="empty-title">No users found</h2>

            <p className="empty-text">
              Try fetching another set of GitHub users.
            </p>
          </div>
        </section>
      </>
    );
  }

  /* ---------------- SUCCESS ---------------- */

  return (
    <>
      <style>{`
        body{
        margin: 0;
        background: #f1f3f5;
        color: #24292e;
        }
        .results-container {
          width: 100%;
          max-width: 1400px;

          margin: 0 auto;

          padding: 10px 35px 50px;
        }

        .results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 25px;
          padding: 0 4px;
        }

        .results-title {
          display: flex;
          align-items: center;
          gap: 9px;

          margin: 0;

          color: #24292e;

          font-size: 1.05rem;
          font-weight: 650;
        }

        .results-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #1a7f37;

          box-shadow:
            0 0 8px rgba(26, 127, 55, 0.4);
        }

        .results-count {
          color: #57606a;

          font-size: 0.8rem;
          font-weight: 600;
        }

        .cards-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fit,
              minmax(260px, 285px)
            );

          justify-content: center;

          gap: 24px;
        }

        .card-wrapper {
          animation: cardEnter 0.5s ease both;
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 700px) {
          .results-container {
            padding: 10px 18px 40px;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .card-wrapper {
            display: flex;
            justify-content: center;
          }
        }

        @media (max-width: 450px) {
          .results-header {
            margin-bottom: 20px;
          }

          .results-title {
            font-size: 0.95rem;
          }

          .results-count {
            font-size: 0.72rem;
          }
        }
      `}</style>

      <main className="results-container">
        <div className="results-header">
          <h2 className="results-title">
            <span className="results-dot"></span>
            GitHub Users
          </h2>

          <span className="results-count">{data.length} users found</span>
        </div>

        <div className="cards-grid">
          {data.map((value, index) => (
            <div
              className="card-wrapper"
              key={value.id}
              style={{
                animationDelay: `${index * 60}ms`,
              }}
            >
              <Card value={value} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
