import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:'user',
    initialState: {
        user:[],
        
    },
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

export default userSlice;