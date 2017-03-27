/**
 * Created by zeelparikh18 on 3/25/17.
 * Container component over the presentational component to group data by name and calculate the current selection object
 */

import React,{
  PureComponent,
  PropTypes,
} from 'react';

//components
import SeatSelectionPage from './SeatSelectionPage';
import ReservedSeatsInfo from './ReservedSeatsInfo';

class SeatSelectionPageContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.nameToSeats = this.groupReservedSeatsByName(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reservationSeats !== this.props.reservationSeats) {
      this.nameToSeats = this.groupReservedSeatsByName(nextProps);
    }
  }

  groupReservedSeatsByName(props) {
    const reservationSeats = props.reservationSeats,
      groupedData = {};
    reservationSeats.forEach(row => row.forEach(seat => {
      if (seat.reserved) {
        const {name, seatNum} = seat;
        groupedData.hasOwnProperty(name) ? groupedData[name].push(seatNum) : groupedData[name] = [seatNum];
      }
    }));
    return groupedData;
  }

  handleSeatClick = (row, col) => {
    let i = 1, cols = [col],
      currentRow = this.props.reservationSeats[row],
      currentSeat, colNum, numOfCols = currentRow.length;
    while (i < this.props.numOfSeats) {
      colNum = col + i;

      //if last seat is chosen
      if (colNum === numOfCols) {
        break;
      }
      currentSeat = currentRow[colNum];
      !currentSeat.reserved && cols.push(colNum);
      i++;
    }
    this.props.onSeatClick(row, cols);
  };

  render() {
    return (
      <div className="seatsSelectionPage">
        <SeatSelectionPage
          {...this.props}
          onSeatClick={this.handleSeatClick}
        />
        <ReservedSeatsInfo
          nameToSeats={this.nameToSeats}
        />
      </div>
    );
  }
}

export default SeatSelectionPageContainer;