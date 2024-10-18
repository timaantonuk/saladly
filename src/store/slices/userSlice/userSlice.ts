import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../../types.ts';

const initialState: IUserState = {
  name: '',
  email: '',
  avatar: '',
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserT: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.id = '';
    },
  },
});

// Action creators are generated for each case reducer function

export const { setUserT, removeUser } = userSlice.actions;
export default userSlice.reducer;
