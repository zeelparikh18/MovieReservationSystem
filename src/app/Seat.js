/**
 * Created by zeelparikh18 on 3/25/17.
 */

import React,{PureComponent, PropTypes} from 'react';
import classnames from 'classnames';

class Seat extends PureComponent {

  static propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
  };

  handleClick = e => {
    const props = this.props;
    props.onClick(props.row, props.col);
  };

  render() {
    const that = this,
      props = that.props;
    return (
      <td
        data-row={props.row}
        data-col={props.col}
        onClick={that.handleClick}
      >
        <div
          className={classnames('seat', {selected: props.selected, disabled: props.disabled})}
        />
      </td>
    )
  }
}

export default Seat;