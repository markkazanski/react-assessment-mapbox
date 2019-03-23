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
        const { drones } = this.props;

        return(
            <Card   >
            <CardHeader title={"Drone Map"} />
            <CardContent>
                <Map drones={drones}  />
            {/*<ControlPanel />*/}
            </CardContent>
          </Card>
        )
    }
}

const mapState = (state, ownProps) => {
    const {
        drone
    } = state;
    return {
        ...drone
    };
  };
  
export default connect(
    mapState
)(MapContainer);

/*
                {
                    visibility: "none",
                    id: 'my-layer-heatmap',
                    type: 'heatmap',
                    source: 'points',
                    paint: {
                        'heatmap-radius': 10,
                        'heatmap-intensity': .5,
                        "heatmap-weight": [
                            "interpolate",
                            ["linear"],
                            ["get", "metric"],
                            0, 0,
                            6, 1
                            ]
                    }
                }
            */