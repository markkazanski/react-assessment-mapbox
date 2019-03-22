import React, {PureComponent} from 'react';
import  Slider  from '@material-ui/lab/Slider';
import * as actions from "../store/actions";
import { connect } from "react-redux";

class ControlPanel extends React.Component {
  render() {
    const { onTopTempChange, topTemp } = this.props;
    console.log(this.props)
    return (
      <div>
        <p>TopTemp</p>
        <input
            type="number" 

            onChange={(e) => onTopTempChange(e.target.value)}
        />
        <div>
            {topTemp
            ? 
            <Slider 
                min={topTemp.min}
                max={topTemp.max}
                onChange={onTopTempChange}
            />
            : null
            }
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
    onTopTempChange: (event, value) =>
        dispatch({
            type: actions.TOP_TEMP_CHANGE,
            value: value
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