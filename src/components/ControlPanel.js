import React from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions";

class ControlPanel extends React.Component {
  render() {

    const { onMinTempChange, onMaxTempChange, minTemp, maxTemp, droneMin, droneMax } = this.props;

    return (
      <div>
       Control Panel
       Min temp: 
       <input type="number" 
        value={minTemp < droneMin ? droneMin.toFixed(0) : minTemp} 
        onChange={onMinTempChange} /><br />
       Max temp: 
       <input 
        type="number" 
        value={maxTemp > droneMax ? droneMax.toFixed(0) : maxTemp} 
        onChange={onMaxTempChange} />
      </div>
    );
  }
}
 
const mapDispatch = dispatch => ({
  onMinTempChange: (e) =>
      dispatch({
          type: actions.MIN_TEMP_CHANGE,
          minTemp: e.target.value
      }),
    onMaxTempChange: (e) =>
      dispatch({
          type: actions.MAX_TEMP_CHANGE,
          maxTemp: e.target.value
      })
});

const mapState = (state, ownProps) => {
  const {
      map
  } = state;
  return {
      ...map
  };
};

export default connect(
  mapState,
  mapDispatch
)(ControlPanel);