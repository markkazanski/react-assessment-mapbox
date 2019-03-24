import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Map from "./Map";
//import ControlPanel from "./ControlPanel"

const cardStyles = theme => ({
    root: {
      background: theme.palette.primary.main
    },
    title: {
      color: "white"
    }
  });
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

class MapContainer extends React.Component{


    render(){
        //console.log(features)
        const { drones, minTemp, maxTemp } = this.props;

        return(
            <Card   >
            <CardHeader title={"Drone Map"} />
            <CardContent>
                <Map drones={drones} 
                    minTemp={minTemp} maxTemp={maxTemp}  
                    droneMin={getMinTemp(drones)} droneMax={getMaxTemp(drones)} />
            {/*<ControlPanel />*/}
            </CardContent>
          </Card>
        )
    }
}

const mapState = (state, ownProps) => {
    const {
        drone,
        map
    } = state;
    return {
        ...drone,
        ...map
    };
  };
  
export default connect(
    mapState
)(MapContainer);

const getTemps = drones => {
    return drones.map(d => d['metric']);
  }
const getMinTemp = (drones) => {
    return Math.min(...getTemps(drones));
}
const getMaxTemp = (drones) => {
    return Math.max(...getTemps(drones));
}