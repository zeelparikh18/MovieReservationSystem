/**
 * Created by zeelparikh18 on 3/25/17.
 */

import React,{
  PureComponent,
  PropTypes,
} from 'react';

const CLASS_CONFIG = [
  { val: 'gold', label: 'Gold' },
  { val: 'silver', label: 'Silver' }
];

class ReservationForm extends PureComponent {

  static propTypes = {
    onSave: PropTypes.func
  };

  handleClick = () => {
    const name = this.refs.inputName.value,
      numOfSeats = this.refs.numOfSeats.value,
      seatClass = this.refs.seatClass.value;
    this.props.onSave({ name, numOfSeats, seatClass });
  };

  render() {
    return (
      <form className="reservationForm h-center">
        <div className="formHeader">MOVIE SEAT RESERVATION</div>
        <div className="formElement">
          <label htmlFor="">Enter Your Name</label>
          <input className="formInput" ref="inputName"/>
        </div>
        <div className="formElement">
          <label htmlFor="">Number of Seats</label>
          <input className="formInput" ref="numOfSeats" defaultValue="1"/>
        </div>
        <div className="formElement">
          <label htmlFor="">Select Class</label>
          <select className="formSelect" ref="seatClass">
            {CLASS_CONFIG.map(({val, label})=> <option val={val}>{label}</option>)}
          </select>
        </div>
        <button onClick={this.handleClick}>Start Selecting Seats</button>
      </form>
    )
  }
}

export default ReservationForm;
