/**
 * Created by zeelparikh18 on 3/25/17.
 */

import React,{PureComponent} from 'react';

//components
import ReservationForm from './ReservationForm';
import SeatSelectionPage from './SeatSelectionPageContainer';

const
  TABLE_CONFIG = {
    nRows: 10,
    nCols: 12
  },

  RESERVATION_SEATS = 'reservationSeats', // key of the array of seats in localStorage

// setting up initial data if not already present.
  getFromLocalStorage = () => {
    let reservationSeats = window.localStorage.getItem(RESERVATION_SEATS);
    if (reservationSeats === null) {
      reservationSeats = [];
      let i, j;
      for (i = 0; i < TABLE_CONFIG.nRows; i++) {
        reservationSeats[i] = [];
        for (j = 0; j < TABLE_CONFIG.nCols; j++) {
          reservationSeats[i][j] = { seatNum: String.fromCharCode(i + 65) + (j + 1) }
        }
      }
      window.localStorage.setItem(RESERVATION_SEATS, JSON.stringify(reservationSeats));
      return reservationSeats;
    } else {
      return JSON.parse(reservationSeats);
    }

  };

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selected: false, // denotes whether the initial form is filled or not
      name: '',
      numOfSeats: 1,
      seatClass: 'gold',
      reservationSeats: getFromLocalStorage(),
      currentSelection: { cols: [] },
      seatsSelected: false
    };
  }

  // saving name, seat class and number of seats
  handleFormSave = ({name,numOfSeats,seatClass}) => this.setState({ name, numOfSeats, seatClass, selected: true });

  // return to the landing page (form)
  handleBookAnother = () => this.setState({ selected: false, numOfSeats: 1, seatsSelected: false });

  //saving the seats which are selected.
  handleSeatsSelection = () => {
    const that = this,
      {reservationSeats, name, currentSelection:{row:selectedRow,cols:colRange}} = that.state,
      newReservationSeats = [...reservationSeats],
      currentRow = newReservationSeats[selectedRow];
    let currentSeat;
    colRange.forEach(i => {
      currentSeat = currentRow[i];
      currentSeat.reserved = true;
      currentSeat.name = name;
    });
    localStorage.setItem(RESERVATION_SEATS, JSON.stringify(newReservationSeats));
    this.setState({ reservationSeats: newReservationSeats, seatsSelected: true });
  };

  //selecting a seat
  handleSeatClick = (row, cols) => this.setState({ currentSelection: { row, cols } });

  render() {
    const that = this,
      {selected, ...stateToPass} = that.state;
    return selected ?
      <SeatSelectionPage
        {...stateToPass}
        onSeatClick={that.handleSeatClick}
        onSeatsSelection={that.handleSeatsSelection}
        onBookAnother={that.handleBookAnother}
      /> :
      <ReservationForm
        onSave={this.handleFormSave}
      />
  }
}

export default App;