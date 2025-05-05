import { ApplicationUser } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: ApplicationUser | null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ApplicationUser>) => {
      state.user = { ...action.payload }
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const saveUserState = (state: UserState) => {
  localStorage.setItem('userState', JSON.stringify(state));
}

export const loadUserState = (): UserState => {
  const savedState = localStorage.getItem('userState');
  return savedState ? JSON.parse(savedState) : initialState;
}