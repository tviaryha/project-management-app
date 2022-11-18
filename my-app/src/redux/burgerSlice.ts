import { createSlice } from '@reduxjs/toolkit';

interface IburgerState {
  isOpen: boolean;
}

const initialState: IburgerState = {
  isOpen: false
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    toggleBurgerIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeBurgerMenu: (state) => {
      state.isOpen = false;
    }
  }
});

export const { toggleBurgerIsOpen, closeBurgerMenu } = burgerSlice.actions;

export default burgerSlice.reducer;
