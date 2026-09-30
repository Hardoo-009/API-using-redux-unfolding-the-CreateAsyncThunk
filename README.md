# 🚀 GitHub User Explorer & Scout

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Parcel](https://img.shields.io/badge/Parcel-2.16-214C6F?style=for-the-badge&logo=parcel&logoColor=white)](https://parceljs.org/)
[![License](https://img.shields.io/badge/License-ISC-green.svg?style=for-the-badge)](LICENSE)

A modern, responsive Web Application built with **React 19**, **Redux Toolkit**, and **Parcel**. It allows users to explore, search, filter, and bookmark GitHub profiles in real time using the official **GitHub REST API**.

---

## ✨ Features

- **🔍 Live GitHub Search & Discovery**: Search any specific GitHub user by username or fetch random batch listings.
- **⚡ Redux Toolkit State Management**: Clean asynchronous data fetching using `createAsyncThunk` with structured reducers and slices.
- **⭐ Favorites System**: Bookmark users with persistent state backed by `localStorage`.
- **🎛️ Client-side Filtering & Sorting**: Filter loaded profiles by keyword or sort by Username (A-Z / Z-A) and GitHub ID (High / Low).
- **📊 Detailed Profile Modal**: View detailed user statistics (followers, public repos, bio, recent repositories, location, and GitHub links).
- **💀 Modern UX Skeletons & Animations**: Smooth loading skeleton screens, graceful error states, and responsive dark-theme glassmorphism UI.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, HTML5, CSS3 (Custom Glassmorphism Design)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React Redux
- **Bundler & Tooling**: Parcel
- **API**: GitHub REST API (`https://api.github.com/users`)

---

## 📂 Project Structure

```text
├── index.html         # HTML entry point with meta tags & favicon
├── parent.js          # App mounting root with Redux Provider
├── Stores.js          # Redux Store configuration
├── Slicer1.js         # Redux Slice (Async thunks, state, reducers)
├── Header.js          # Main user grid view, filters & skeletons
├── Top.js             # Top navigation bar, search & count controls
├── Card.js            # GitHub user profile card component
├── UserModal.js       # Detailed profile modal component
├── package.json       # Project dependencies & build scripts
└── README.md          # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/APIREDUX.git
   cd APIREDUX
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npx parcel index.html
   ```
   Open `http://localhost:1234` in your browser.

4. **Build for Production**:
   ```bash
   npx parcel build index.html
   ```

---

## 🌐 Deployment Guidelines

### Recommended Deployment Platforms

| Platform | Deployment Command / Config | Build Output Directory |
| :--- | :--- | :--- |
| **Vercel** | Build Command: `npx parcel build index.html` | `dist` |
| **Netlify** | Build Command: `npx parcel build index.html` | `dist` |
| **GitHub Pages** | Deploy via GitHub Actions or `gh-pages` | `dist` |

### Important Deployment Tips

1. **Build Command**: Set the build command to `npx parcel build index.html` (or `npm run build`).
2. **Publish Directory**: Set the build output/publish directory to `dist`.
3. **GitHub API Rate Limits**: The app uses the unauthenticated GitHub API (limit: 60 requests/hour per IP).

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).
