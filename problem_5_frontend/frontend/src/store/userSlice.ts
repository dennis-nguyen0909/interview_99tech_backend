import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';

const initialState: UserState = {
    id: null,
    fullName: null,
    email: null,
    phone: null,
    avatar: '',
    isActive:false,
    role:'',
    accessToken:'',
    refreshToken:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },    
    resetUser() {
      return initialState;
    },
    updatePartialUser(state, action: PayloadAction<Partial<UserState>>) {
      // Update only the provided fields
      Object.assign(state, action.payload); // Using Object.assign to safely update state
    },
  },
});

export const { updatePartialUser, resetUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
