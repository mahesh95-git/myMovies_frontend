import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user.reducer";
import adminReducer from "./reducer/admin.reducer";
import  contentReducer  from "./reducer/content.reducer";
userReducer
const store=configureStore({
    reducer:{
        user:userReducer,
        content:contentReducer,
        admin:adminReducer
    }
})
export default store