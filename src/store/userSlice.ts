import { createSlice } from "@reduxjs/toolkit";

interface User {
    username: string;
    email: string;
    avatar: string;
    coverImage: string;
    fullName: string;
    watchHistory: any[]; // Update the type as per the actual type of watchHistory
    accessToken: string;
    refreshToken: string;
}

interface UserSliceState {
    user: User[];
}


const initialState: UserSliceState = {
    user: [],
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser(state,action){
            const newUser = action.payload
            state.user.push({
                username:newUser.username,
                email:newUser.email,
                avatar:newUser.avatar,
                coverImage:newUser.coverImage,
                fullName:newUser.fullName,
                watchHistory: newUser.watchHistory,
                accessToken: newUser.accessToken,
                refreshToken: newUser.refreshToken
            })
            
        },
      
    }
});




export const userActions = userSlice.actions;

export default userSlice.reducer;