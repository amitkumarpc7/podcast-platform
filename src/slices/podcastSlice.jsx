import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

// initially no user will be on app 
const initialState={
    // name of object is user
    podcasts:[],
};
const podcastSlice = createSlice({
    name :"podcasts", 
    initialState,
    reducers:{
        // action->data state->is current user
        setPodcasts:(state,action)=>{
            state.podcasts=action.payload;
        },
    
    },
});
  
export const {setPodcasts}=podcastSlice.actions;

export default podcastSlice.reducer;