import React from 'react';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Slider from '@material-ui/lab/Slider';
import FormLabel from '@material-ui/core/FormLabel';


class ControlPanel extends React.Component {
  render() {
    const { onMinTempChange, onMaxTempChange, minTemp, maxTemp, droneMin, droneMax } = this.props;
    const styles = {
      Sliders: {paddingTop:20, paddingBottom: 20}
    }
    //console.log(droneMax, droneMin, minTemp, maxTemp)
    return (
      <div>
        <div style={{margin:20}}>
         <FormLabel>Min Temp: {minTemp} °F </FormLabel>
         <Slider
          style={styles.Sliders}
          min={droneMin - 1}
          max={droneMax}
          value={minTemp}
          step={1}
          onChange={(e, val) => onMinTempChange(val)}  />
        </div>
       
        <div style={{margin:20}}>
          <FormLabel>Max Temp: {maxTemp} °F</FormLabel>
          <Slider
            style={styles.Sliders}
            min={droneMin}
            max={droneMax + 1}
            value={maxTemp}
            step={1}
            onChange={(e, val) => onMaxTempChange(val)}  />
        </div>
      </div>
    );
  }
}
 
const mapDispatch = dispatch => ({
  onMinTempChange: (val) =>
      dispatch({
          type: actions.MIN_TEMP_CHANGE,
          minTemp: val//e.target.value
      }),
    onMaxTempChange: (val) =>
      dispatch({
          type: actions.MAX_TEMP_CHANGE,
          maxTemp: val//e.target.value
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