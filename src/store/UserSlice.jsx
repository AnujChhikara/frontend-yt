import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:'user',
    initialState: {
        items:[],
        totalQuantity :0,
        changed: false
    },
    reducers:{
        replaceCart(state, action){
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
      
    }
});




export const userActions = userSlice.actions;

export default userSlice;