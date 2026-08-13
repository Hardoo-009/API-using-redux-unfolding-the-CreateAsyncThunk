import { useDispatch, useSelector } from 'react-redux';
import { FetchData, Setcount } from './Slicer1';

export default function Top() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.slice1.count);

  function handleclick() {
    const from = Math.floor(Math.random() * 10000 + 1);
    dispatch(FetchData([count, from]));
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .header {
          position: relative;
          width: 100%;
          min-height: 150px;
          padding: 28px 48px;
          margin-bottom: 40px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;

          color: #fff;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(88, 166, 255, 0.16),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(46, 160, 67, 0.12),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #0d1117 0%,
              #111820 50%,
              #0d1117 100%
            );

          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0 0 24px 24px;

          box-shadow:
            0 15px 40px rgba(0, 0, 0, 0.28),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04);
        }

        /* Subtle background grid */
        .header::before {
          content: "";
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );

          background-size: 32px 32px;

          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            transparent
          );

          pointer-events: none;
        }

        .header-content {
          position: relative;
          z-index: 2;

          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        /* GitHub Icon */
        .github-icon {
          width: 58px;
          height: 58px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 8px 25px rgba(0, 0, 0, 0.2);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .github-icon:hover {
          transform: translateY(-3px) rotate(-2deg);
          background: rgba(255, 255, 255, 0.11);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .github-icon svg {
          width: 32px;
          height: 32px;
          fill: #f0f6fc;
        }

        .header-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .title {
          margin: 0;

          font-size: clamp(1.5rem, 2.5vw, 2rem);
          line-height: 1.1;
          font-weight: 750;
          letter-spacing: -0.7px;

          background: linear-gradient(
            90deg,
            #ffffff,
            #dbeafe
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          margin: 0;

          color: #8b949e;
          font-size: 0.92rem;
          font-weight: 450;
          letter-spacing: 0.1px;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          width: fit-content;
          margin-top: 4px;

          color: #8b949e;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.7px;
        }

        .status-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;
          background: #3fb950;

          box-shadow: 0 0 10px rgba(63, 185, 80, 0.7);

          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 10px rgba(63, 185, 80, 0.7);
          }

          50% {
            opacity: 0.6;
            box-shadow: 0 0 5px rgba(63, 185, 80, 0.3);
          }
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;

          padding: 7px;

          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 15px;

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 13px;
          top: 50%;

          width: 16px;
          height: 16px;

          transform: translateY(-50%);

          color: #8b949e;
          pointer-events: none;
        }

        .count-input {
          width: 170px;
          height: 44px;

          padding: 0 14px 0 38px;

          color: #f0f6fc;
          background: rgba(13, 17, 23, 0.75);

          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;

          outline: none;

          font-size: 14px;
          font-weight: 500;

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .count-input::placeholder {
          color: #6e7681;
        }

        .count-input:hover {
          border-color: rgba(255, 255, 255, 0.16);
        }

        .count-input:focus {
          background: rgba(13, 17, 23, 0.95);
          border-color: #58a6ff;

          box-shadow:
            0 0 0 3px rgba(88, 166, 255, 0.12),
            0 5px 15px rgba(0, 0, 0, 0.15);
        }

        /* Remove number arrows */
        .count-input::-webkit-inner-spin-button,
        .count-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .count-input {
          appearance: textfield;
          -moz-appearance: textfield;
        }

        .fetch-btn {
          position: relative;

          height: 44px;
          padding: 0 20px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;

          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;

          background: linear-gradient(
            135deg,
            #2ea043,
            #238636
          );

          color: #ffffff;

          font-size: 14px;
          font-weight: 650;
          letter-spacing: 0.1px;

          cursor: pointer;

          box-shadow:
            0 5px 15px rgba(35, 134, 54, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            filter 0.2s ease;
        }

        .fetch-btn svg {
          width: 17px;
          height: 17px;

          transition: transform 0.25s ease;
        }

        .fetch-btn:hover {
          transform: translateY(-2px);

          filter: brightness(1.08);

          box-shadow:
            0 8px 22px rgba(35, 134, 54, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }

        .fetch-btn:hover svg {
          transform: translateX(3px);
        }

        .fetch-btn:active {
          transform: translateY(0);
          box-shadow:
            0 3px 10px rgba(35, 134, 54, 0.2);
        }

        .fetch-btn:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 3px rgba(88, 166, 255, 0.25),
            0 8px 22px rgba(35, 134, 54, 0.3);
        }

        @media (max-width: 800px) {
          .header {
            padding: 25px;
            border-radius: 0 0 20px 20px;
          }

          .header-content {
            flex-direction: column;
            align-items: stretch;
            gap: 25px;
          }

          .header-left {
            justify-content: center;
          }

          .header-right {
            width: 100%;
          }

          .input-wrapper {
            flex: 1;
          }

          .count-input {
            width: 100%;
          }

          .fetch-btn {
            padding: 0 22px;
          }
        }

        @media (max-width: 500px) {
          .header {
            padding: 22px 16px;
            margin-bottom: 25px;
          }

          .header-left {
            align-items: flex-start;
          }

          .github-icon {
            width: 50px;
            height: 50px;
            border-radius: 14px;
          }

          .github-icon svg {
            width: 27px;
            height: 27px;
          }

          .title {
            font-size: 1.35rem;
          }

          .subtitle {
            font-size: 0.82rem;
          }

          .status {
            font-size: 0.65rem;
          }

          .header-right {
            flex-direction: column;
            padding: 7px;
          }

          .input-wrapper {
            width: 100%;
          }

          .fetch-btn {
            width: 100%;
          }
        }
      `}</style>

      <header className="header">
        <div className="header-content">
          {/* LEFT SIDE */}
          <div className="header-left">
            <div className="github-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18A10.9 10.9 0 0 1 12 6.12c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.04.78 2.1v3.13c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </div>

            <div className="header-text">
              <h1 className="title">GitHub User Fetcher</h1>

              <p className="subtitle">
                Search and explore GitHub users instantly.
              </p>

              <div className="status">
                <span className="status-dot"></span>
                API Ready
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="header-right">
            <div className="input-wrapper">
              <svg
                className="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>

              <input
                onChange={(e) => dispatch(Setcount(Number(e.target.value)))}
                type="number"
                min="1"
                placeholder="Number of users"
                className="count-input"
                aria-label="Number of users"
              />
            </div>

            <button className="fetch-btn" onClick={handleclick}>
              Fetch Users
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
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
