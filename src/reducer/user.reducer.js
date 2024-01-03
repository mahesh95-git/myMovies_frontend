import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const client = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

const initialState = {
  user: {},
  isLogIn: false,
  loader: true,
  message: "",
};
const userReducer = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // get user detail
    builder.addCase(loadUserDetail.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(loadUserDetail.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.isLogIn = true;
      state.loader = false;
    }),
      builder.addCase(loadUserDetail.rejected, (state, action) => {
        toast.error(action.error.message);
        state.loader = false;
      });

    //login user reducer
    builder.addCase(loginUser.pending, (state) => {
      state.isLogIn = false;
      state.loader = true;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLogIn = true;
        state.user = action.payload.data;
        state.loader = false;
        toast.success(action.payload.message);
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        toast.error(action.error.message);
      });

    builder.addCase(singupUser.pending, (state) => {
      state.loading = true;
    });
    //singup user reducer
    builder.addCase(singupUser.fulfilled, (state, action) => {
      state.loader = false;
      state.user = action.payload.data;
      state.isLogIn = true;
      toast.success(action.payload.message);
    });
    builder.addCase(singupUser.rejected, (state, action) => {
      state.loader = false;
      toast.error(action.error.message);
    });

    // update user reducers
    builder.addCase(updateUser.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loader = false;
      state.user = action.payload.data;
      console.log(action.payload);
      toast.success(action.payload.message);
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      (state.loader = false), toast.error(action.error.message);
    });

    // Logout reducers
    builder.addCase(logoutUser.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = {};
      state.isLogIn = false;
      state.loader = false;
      toast.success(action.payload.message);
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      (state.loader = false), toast.error(action.error.message);
    });

    // send forgot password email reducer
    builder.addCase(sendEmail.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      (state.loader = false), toast.success(action.payload.message);
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.loader = false;
      toast.error(action.error.message);
    });

    // change password reducer
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      (state.loader = false), toast.success(action.payload.message);
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loader = false;
      toast.error(action.error.message);
    });
     // change password reducer
     builder.addCase(changePassword.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      (state.loader = false), toast.success(action.payload.message);
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loader = false;
      toast.error(action.error.message);
    });
  },
});

export default userReducer.reducer;

export const loadUserDetail = createAsyncThunk(
  "user/loadUserDetail",
  async () => {
    try {
      const response = await client.get("user", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk("user/login", async (userInfo) => {
  try {
    const response = await client.post("auth/login", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const singupUser = createAsyncThunk("user/singup", async (userInfo) => {
  try {
    const response = await client.post("auth/signup", userInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await client.post(
      "auth/logout",
      {}, // No payload needed for logout, pass an empty object
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ updatedData }) => {
    try {
      const response = await client.patch(`user/update`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const sendEmail = createAsyncThunk("email/send", async ({ email }) => {
  try {
    const response = await client.post("auth/forgot-password", {
      email: email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async ({ token, newPassword, confirmPassword }) => {
    try {
      const response = await client.patch(`auth/forgot-password/${token}`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "change/password",
  async ({ newPassword, confirmPassword, oldPassword }) => {
    try {
      const response = await client.patch("auth/reset-password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  }
);
