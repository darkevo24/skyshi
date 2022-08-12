import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list : []
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    init : function(state,action){
        state.list = action.payload;
    },
    add : function(state,action){
        state.list.unshift(action.payload);
    },
    remove : function(state,action){
        const index = state.list.findIndex(function(obj){
            return obj.id == action.payload;
        })
        state.list.splice(index,1);
    }
  },
})

// Action creators are generated for each case reducer function
export const { init,add,remove } = listSlice.actions

export default listSlice.reducer