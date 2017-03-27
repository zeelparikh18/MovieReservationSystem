/**
 * Created by zeelparikh18 on 3/25/17.
 *
 * Presentational component to display the Seat Selection table
 */

import React,{PureComponent, PropTypes} from 'react';

//components
import Seat from './Seat';

class SeatSelectionPage extends PureComponent {

  static propTypes = {
    onSeatClick: PropTypes.func,
    onSeatsSelection: PropTypes.func,
    onBookAnother: PropTypes.func,
  };

  renderRow = (row, index) => {
    const
      props = this.props,
      onSeatClick = props.onSeatClick,
      {row:selectedRow, cols} = props.currentSelection,
      hasSelectionInRow = index === selectedRow && cols.length,
      disable = props.seatClass === 'Gold'  ? index <= 5 : index > 5;
    return (
      <tr>
        <th>{String.fromCharCode(index + 65)}</th>
        {row.map((seat, i) => (
          <Seat
            key={`seat_${index}_${i}`}
            row={index}
            col={i}
            onClick={onSeatClick}
            selected={hasSelectionInRow && (cols.indexOf(i) > -1)}
            disabled={seat.reserved || disable}
          />
        ))}
      </tr>
    );
  };

  renderRows() {
    return <tbody>{this.props.reservationSeats.map(this.renderRow)}</tbody>;
  }

  renderHeaders() {
    const nCols = this.props.reservationSeats[0].length;
    let i, headers = [<th>\</th>];
    for (i = 1; i <= nCols; i++) {
      headers[i] = <th key={`header_${i}`}>{i}</th>;
    }
    return (
      <thead>
      <tr>{headers}</tr>
      </thead>
    );
  }

  render() {
    const that = this,
      props = that.props;

    return (
      <div className="selectionContainer">
        <div className="screen">SCREEN</div>
        <table className="reservationGrid">
          {this.renderHeaders()}
          {this.renderRows()}
        </table>
        <div className="buttonGroup">
          {props.seatsSelected ?
            <button className="seatSelectionBtn booked">
              Seats Booked
            </button> :
            <button
              className="seatSelectionBtn"
              onClick={props.onSeatsSelection}
            >Confirm Selection
            </button>
          }
          {props.seatsSelected &&
          <button
            className="seatSelectionBtn"
            onClick={props.onBookAnother}
          >
            Book Another
          </button>
          }
        </div>
      </div>
    );
  }
}

export default SeatSelectionPage;