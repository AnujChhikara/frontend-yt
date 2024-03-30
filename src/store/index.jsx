import { configureStore } from "@reduxjs/toolkit";





const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default store;