import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const client = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

const initialState = {
  contentOverview: {
    loader: true,
    data: {},
  },
  movieDetail: {
    loader: true,
    data: {},
    error: null,
  },
  recommendeContent: {
    loader: true,
    data: [],
    error: null,
  },
  watchlist: {
    loader: true,
    data: {
      contents: [],
    },
  },
  allMoviesList: {
    data: [],
    loader: true,
  },
  episodes: {
    data: [],
    loader: true,
  },
  viewAll: {
    data: {
      title: "",
      contents: [],
    },
    loader: true,
  },

  searchResult: {
    data: {
      contents: [],
      page: "",
      limit: "",
      totalPage: "",
    },
    loader: false,
  },
  watchHistory: {
    data: [],
    loader: true,
    userId: "",
    message: "",
  },
  error: null,
  message: "",
};
export const contentReducer = createSlice({
  name: "content",
  initialState,
  extraReducers: (builder) => {
    // get contentOverview extraReducer
    builder.addCase(getContentOverview.pending, (state) => {
      state.contentOverview.loader = true;
    });
    builder.addCase(getContentOverview.fulfilled, (state, action) => {
      console.log(action.payload);
      state.contentOverview.data = action.payload;
      state.contentOverview.loader = false;
    });
    // getMovieDetail extraReducer
    builder.addCase(getMovieDetail.pending, (state) => {
      state.movieDetail.loader = true;
    });
    builder.addCase(getMovieDetail.fulfilled, (state, action) => {
      state.movieDetail.data = action.payload;
      state.movieDetail.loader = false;
    });
    // add movie to watchList extraReducuer

    //add movie to watchList extraReducer
    builder.addCase(addmovieToWatchList.fulfilled, (state, action) => {
      toast.success(action.payload.message);
    });
    builder.addCase(addmovieToWatchList.rejected, (state, action) => {
      toast.error(action.error.message);
    });
    // remove movie to watchList extraReducer
    builder.addCase(removeWatchlistContent.fulfilled, (state, action) => {
      toast.success(action.payload.message);
    });
    builder.addCase(removeWatchlistContent.rejected, (state, action) => {
      toast.error(action.error.message);
    });
    //getRecommendedContent extraReducer
    builder.addCase(getRecommendedContent.pending, (state) => {
      state.recommendeContent.loader = true;
    });
    builder.addCase(getRecommendedContent.fulfilled, (state, action) => {
      console.log(action.payload)
      state.recommendeContent.data = action.payload;
      state.recommendeContent.loader = false;
    });
    builder.addCase(getRecommendedContent.rejected, (state, action) => {
      state.recommendeContent.loader = false;
      toast.error(action.error.message);
    });
    //get allContentList extraReducer
    builder.addCase(getALLContentList.pending, (state) => {
      state.allMoviesList.loader = true;
    });
    builder.addCase(getALLContentList.fulfilled, (state, action) => {
      state.allMoviesList.data = action.payload.data;
      state.allMoviesList.loader = false;
    });
    builder.addCase(getALLContentList.rejected, (state, action) => {
      state.recommendeContent.loader = false;
      toast.error(action.error.message);
    });
    //getWatchList extraReducer
    builder.addCase(getWatchlist.pending, (state) => {
      state.watchlist.loader = true;
    });
    builder.addCase(getWatchlist.fulfilled, (state, action) => {
      state.watchlist.data.contents = action.payload.data;
      state.watchlist.loader = false;
    });
    builder.addCase(getWatchlist.rejected, (state, action) => {
      state.watchlist.loader = false;
      toast.error(action.error.message);
    });
    //get webseries episodes extraReducer
    builder.addCase(getEpisodes.pending, (state) => {
      state.episodes.loader = true;
    });
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.episodes.data = action.payload.data.allContents;
      state.episodes.loader = false;
    });
    builder.addCase(getEpisodes.rejected, (state, action) => {
      state.episodes.loader = false;
     
    });
    // get view all content extraReducer
    builder.addCase(getViewAll.pending, (state) => {
      state.viewAll.loader = true;
    });
    builder.addCase(getViewAll.fulfilled, (state, action) => {
      state.viewAll.data.contents = action.payload.data.contents;
      state.viewAll.data.title = action.payload.data.title;
      state.viewAll.loader = false;
    });
    builder.addCase(getViewAll.rejected, (state, action) => {
      state.viewAll.loader = false;
      toast.error(action.error.message);
    });
    // get search result extraReducer
    builder.addCase(getSearchResult.pending, (state) => {
      state.searchResult.loader = false;
    });
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.searchResult.data.contents = action.payload.result;
      state.searchResult.data.page = action.payload.page;
      // state.searchResult.data.totalPage=action.payload.totalPage
      state.searchResult.data.limit = action.payload.limit;
      state.searchResult.loader = false;
    });
    builder.addCase(getSearchResult.rejected, (state, action) => {
      state.searchResult.loader = false;
      toast.error(action.error.message);
    });
    // get all watchHistory extraReducer
    builder.addCase(getAllWatchHistory.pending, (state) => {
      state.watchHistory.loader = true;
    });
    builder.addCase(getAllWatchHistory.fulfilled, (state, action) => {
      state.watchHistory.data = action.payload.contents;
      state.watchHistory.userId = action.payload.userId;
      state.watchHistory.loader = false;
    });
    builder.addCase(getAllWatchHistory.rejected, (state, action) => {
      state.watchHistory.loader = false;
      toast.error(action.error.message);
    });
    builder.addCase(deleteFromWatchHistory.pending, (state) => {
      state.watchHistory.loader = true;
    });
    builder.addCase(deleteFromWatchHistory.fulfilled, (state, action) => {
      state.watchHistory.loader = false;
      toast.success(action.payload);
    });
    builder.addCase(deleteFromWatchHistory.rejected, (state, action) => {
      toast.error(action.error.message);
    });
  },
});
export default contentReducer.reducer;
export const getContentOverview = createAsyncThunk(
  "ContentOverview",
  async ({ type }) => {
    try {
      const response = await client.get(
        `contentOverview${type ? `?type=${type}` : ""}`
      );

      return response.data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "movieDetails",
  async ({ id }) => {
    console.log(id);
    try {
      const response = await client.get(`content/${id}`);

      return response.data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const addmovieToWatchList = createAsyncThunk(
  "addToList",
  async ({ id }) => {
    try {
      const response = await client.post(`watchList/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getWatchlist = createAsyncThunk("getWatchlist", async () => {
  try {
    const response = await client.get(`watchList`);

    const getWatchlist = response.data.data.map((value) => {
      return { content: value };
    });
    return { data: getWatchlist, success: response.data.success };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getRecommendedContent = createAsyncThunk(
  "allRecommendation",
  async ({ id }) => {
    try {
      const response = await client.get(`recommendations/${id}`);
      const recommendedMovies = response.data.data.movies.map((value) => {
        return { content: value };
      });

      return recommendedMovies;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getALLContentList = createAsyncThunk(
  "allContentList",
  async ({ type }) => {
    try {
      console.log(type);
      const response = await client.get(
        `content${type ? `?type=${type}` : ""}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const removeWatchlistContent = createAsyncThunk(
  "removeFromWatchlist",
  async ({ id }) => {
    try {
      const response = await client.delete(`watchList/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getEpisodes = createAsyncThunk("episodeInfo", async ({ id }) => {
  try {
    const response = await client.get(`content-episode/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getViewAll = createAsyncThunk("viewAll", async ({ id, type }) => {
  try {
    console.log(id, type);
    const response = await client.get(`contentview/${id + "/" + type}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getSearchResult = createAsyncThunk(
  "searchResult",
  async ({ query }) => {
    try {
      const response = await client.get(`search?q=${query}`);
      const result = response.data.data.map((value) => {
        return { content: value };
      });
      return { result, page: response.data.page, limit: response.data.limit };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const addWatchHistory = createAsyncThunk(
  "addToWatched",
  async ({ id, duration }) => {
    console.log(duration);
    try {
      const response = await client.post(`watchhistory/${id}`, {
        duration: duration,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getAllWatchHistory = createAsyncThunk(
  "getAllWatchHistory",
  async () => {
    try {
      const response = await client.get("watchhistory");
      return response.data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteFromWatchHistory = createAsyncThunk(
  "deleteFromWatchHistory",
  async ({ id }) => {
    try {
      const response = await client.delete(`watchhistory/${id}`);
      return response.data.message;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
