import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  loader: true,
  user: {
    total: "",
    allUser: [],
  },
  tempUser:"",
  message: "",
  error: false,
  success: false,
};

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addContent.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loader = false;
      state.success = true;
    });
    builder.addCase(addContent.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message || "Failed to log out";
    });

    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.user.allUser = action.payload.data;
      state.user.total = action.payload.total;
      state.success = action.payload.sucess;
      state.loader = false;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.loader = false;
      state.error = action.error.message || "Failed to log out";
    });
    // update user profile
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.message=action.payload.message
      state.loader = false;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {

      state.loader = false;
      state.message=action.payload.message || "Failed to log out"
      state.error = true;
    });

    //search user profile
    builder.addCase(searchUserProfile.fulfilled, (state, action) => {
      console.log(action.payload)
      state.success = action.payload.success;
      state.message=action.payload.message
      state.tempUser=action.payload.data
      state.loader = false;
      state.error=false;

    });
    builder.addCase(searchUserProfile.rejected, (state, action) => {
      console.log(action.payload)
      state.loader = false;
      state.error = true,
      state.message=action.payload.message || "Failed to log out";
    });

    //delete profile
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.message=action.payload.message
      state.tempUser=''
      state.loader = false;

    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loader = false;
      state.error = true,
      state.message=action.payload.message || "Failed to log out";
    });
  },
});

export default adminReducer.reducer;

export const addContent = createAsyncThunk(
  "admin/addContent",
  async (contentInfo) => {
    console.log(contentInfo)
    const response = await axios.post(
      "http://localhost:8080/api/admin/content/create",
      contentInfo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response)

    return response.data;
  }
);

export const getAllUser = createAsyncThunk(
  "admin/getAllUsers",
  async ({ page = 1, limit = 25 }) => {
    const response = await axios.get(
      `http://localhost:8080/api/admin/All-user?limit=${limit}&page=${page}`
    );

    console.log(response);
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "admin/updateUser",
  async ({ id, role }) => {
    console.log(role)
    const response = await axios.patch(
      `http://localhost:8080/api/admin/update-user/${id}`,
      role
    );
    return response.data;
  }
);
 export const searchUserProfile=createAsyncThunk(
  'admin/search',async({id})=>{
    const response=await axios.get(`http://localhost:8080/api/admin/user/${id}`);
 
    return response.data;
    }
 )

 export const deleteUser=createAsyncThunk(
  'admin/delete',async({id})=>{
    const response=await axios.delete(`http://localhost:8080/api/admin/delete-user/${id}`);
    return response.data;
    }
 )