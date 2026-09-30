import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Local storage helper for favorites persistence
const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('github_favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('github_favorites', JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
};

/**
 * 1. Fetch a list of GitHub users (random list or paginated list)
 * GET https://api.github.com/users?since={id}&per_page={count}
 */
const FetchData = createAsyncThunk(
  'github/fetchData',
  async ({ count = 10, since = 0, isPagination = false }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.github.com/users?since=${since}&per_page=${count}`,
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error (Status ${response.status})`);
      }

      const data = await response.json();
      return { data, isPagination };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch users');
    }
  },
);

/**
 * 2. Search for a specific GitHub user by username
 * GET https://api.github.com/users/{username}
 */
const SearchUser = createAsyncThunk(
  'github/searchUser',
  async (username, thunkAPI) => {
    try {
      const trimmed = username.trim();
      if (!trimmed) {
        throw new Error('Please enter a username to search.');
      }

      const response = await fetch(`https://api.github.com/users/${trimmed}`);

      if (response.status === 404) {
        throw new Error(`User "${trimmed}" not found on GitHub.`);
      }

      if (!response.ok) {
        throw new Error(`GitHub API Error (Status ${response.status})`);
      }

      const user = await response.json();
      return { data: [user], searchUsername: trimmed };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to find user');
    }
  },
);

/**
 * 3. Fetch User Details & Top Repositories for Modal
 * GET https://api.github.com/users/{username}
 * GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6
 */
const FetchUserDetails = createAsyncThunk(
  'github/fetchUserDetails',
  async (username, thunkAPI) => {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        ),
      ]);

      if (!userRes.ok) throw new Error('Could not fetch profile details');
      const userDetail = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];

      return { userDetail, repos };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const githubSlice = createSlice({
  name: 'github',
  initialState: {
    loading: false,
    data: [],
    error: null,
    count: 10,
    since: 0,
    searchQuery: '',
    viewMode: 'list', // 'list' | 'search' | 'favorites'

    // Modal state
    selectedUserModal: null,
    modalLoading: false,

    // Favorites system
    favorites: loadFavoritesFromStorage(),

    // Filtering / Sorting
    filterQuery: '',
    sortBy: 'default', // 'default' | 'login-asc' | 'login-desc' | 'id-asc' | 'id-desc'
  },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    resetPagination: (state) => {
      state.since = 0;
      state.data = [];
      state.viewMode = 'list';
      state.searchQuery = '';
      state.filterQuery = '';
    },
    closeUserModal: (state) => {
      state.selectedUserModal = null;
    },

    // Redux Favorite Toggle Reducer
    toggleFavorite: (state, action) => {
      const user = action.payload;
      const index = state.favorites.findIndex((fav) => fav.id === user.id);

      if (index >= 0) {
        // Remove from favorites
        state.favorites.splice(index, 1);
      } else {
        // Add to favorites
        state.favorites.push(user);
      }

      saveFavoritesToStorage(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      /* --- FetchData (List) --- */
      .addCase(FetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchData.fulfilled, (state, action) => {
        state.loading = false;
        const { data, isPagination } = action.payload;
        state.viewMode = 'list';

        if (isPagination) {
          state.data = [...state.data, ...data];
        } else {
          state.data = data;
        }

        if (data.length > 0) {
          state.since = data[data.length - 1].id;
        }
      })
      .addCase(FetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      })

      /* --- SearchUser --- */
      .addCase(SearchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.viewMode = 'search';
        state.data = action.payload.data;
      })
      .addCase(SearchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to find user';
      })

      /* --- FetchUserDetails (Modal) --- */
      .addCase(FetchUserDetails.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(FetchUserDetails.fulfilled, (state, action) => {
        state.modalLoading = false;
        state.selectedUserModal = action.payload;
      })
      .addCase(FetchUserDetails.rejected, (state) => {
        state.modalLoading = false;
      });
  },
});

export default githubSlice.reducer;
export { FetchData, FetchUserDetails, SearchUser };
export const {
  setCount,
  setSearchQuery,
  setFilterQuery,
  setSortBy,
  setViewMode,
  resetPagination,
  closeUserModal,
  toggleFavorite,
} = githubSlice.actions;
