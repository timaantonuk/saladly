import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  name: null;
  email: null;
  token: null;
  id: null;
  fullName: null;
}

const initialState: UserState = {
  name: null,
  email: null,
  token: null,
  id: null,
  fullName: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.name = null;
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setUserFullName(state, action) {
      state.fullName = action.payload.fullName;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser, setUserFullName } = userSlice.actions;

export default userSlice.reducer;
