//managing booking

//store all the booking
//store individual booking details
//track api loading status
//store new booking details when it is created
//updating the booking data when recv is created

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: {},
  loading: false
}

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingRequest(state) {
      state.loading = true;
    },
//set the bookings data when it is fetched from the api
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
//add the new booking data to the bookings array when it is created
   addBooking:(state, action) => {
      state.bookings.push(action.payload);
      
    },
    setBookingDetails(state, action) {
      state.bookingDetails = action.payload.bookings;
      
    }
  }
})

export const { setBookings, addBooking, setBookingDetails } = bookingSlice.actions;
export default bookingSlice;