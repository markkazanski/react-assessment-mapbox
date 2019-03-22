import React, {PureComponent} from 'react';
import { Slider } from '@material-ui/lab/Slider';


export default class ControlPanel extends React.Component {
  render() {
    
    return (
      <div>
        <Slider 
            min={200}
            max={400}
        />
      </div>
    );
  }
}