/**
 * Created by zeelparikh18 on 3/26/17.
 */

import React from 'react';
import classnames from 'classnames';

const ReservedSeatsTable = nameToSeats => (
    <table className="reservationInfoTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>No. of seats</th>
          <th>Seats</th>
        </tr>
      </thead>
      <tbody>
      {Object.keys(nameToSeats).map(name => (
        <tr key={name}>
          <td>{name}</td>
          <td>{nameToSeats[name].length}</td>
          <td>{nameToSeats[name].join(', ')}</td>
        </tr>
      ))}
      </tbody>
    </table>
  ),

  ReservedSeatsInfo = ({nameToSeats}) => {
    const hasReservedSeats = Object.keys(nameToSeats).length;
    return (
      <div className={classnames("reservedSeatsContainer", {noReservedSeats : !hasReservedSeats})}>
        {hasReservedSeats ?
          ReservedSeatsTable(nameToSeats) :
          <div className="noSeatsReserved v-center">No Seats have been reserved till now</div>
        }
      </div>
    )
  };
export default ReservedSeatsInfo;