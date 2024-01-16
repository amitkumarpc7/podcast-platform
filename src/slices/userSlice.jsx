import { createSlice } from "@reduxjs/toolkit";

// initially no user will be on app 
const initialState={
    // name of object is user
    user:null,
};

const userSlice=createSlice({
    // name of slice is user
    name :"user", 
    initialState,
    reducers:{
        // action->data state->is current user
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        clearUser:(state)=>{
            state.user=null;
        },
    },
});

export const {setUser,clearUser}=userSlice.actions;
export default userSlice.reducer;