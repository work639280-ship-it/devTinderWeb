import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state,action) =>{
            return action.payload;
        },
        removeRequests: (state,action) => {
            const newArray = state.filter(r =>r._id !== action.payload );
            return newArray
        }
    },
});

export const {addRequests,removeRequests} = requestsSlice.actions;
export default requestsSlice.reducer;
