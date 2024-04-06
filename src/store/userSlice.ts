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
    id:string
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
                refreshToken: newUser.refreshToken,
                id: newUser.id
            })
            
        },
        logoutUser(state, action){
            state.user = []
        },
        updateUserAvatar(state,action){
            const newAvatarUrl = action.payload
            state.user = state.user.map(user => {
                return {
                    ...user,
                    avatar: newAvatarUrl
                };
            });
        },
        
        updateUserCoverImage(state, action) {
            const newCoverImageUrl = action.payload
            state.user = state.user.map(user => {
                return {
                    ...user,
                    coverImage: newCoverImageUrl
                };
            });

        }
      
    }
});




export const userActions = userSlice.actions;

export default userSlice.reducer;