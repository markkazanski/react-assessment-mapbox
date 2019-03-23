import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL from 'react-map-gl';
import {fromJS} from 'immutable';
import MapGL from 'react-map-gl';
import ControlPanel from "./ControlPanel"

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFya2themFuc2tpIiwiYSI6ImNqdGtlaXZ6YzNhOGozeW9iYzBudDJpNjMifQ.dbS6ALsDjDKc9msTs1wUiA'

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
    state = {
        viewport: {
          width: 800,
          height: 500,
          latitude: 29.7604,
          longitude: -95.3698,
          zoom: 5
        }
      };

    render(){
        
        const { drones } = this.props;
        //drones.forEach(d => console.log(d.latitude, d.longitude))

        const features = drones.map(d => {
            return {
                type: 'Feature', 
                geometry: {type: 'Point', coordinates: [d.longitude, d.latitude]},
                properties: {metric: d.metric, acc: d.accuracy}
            }
        })

        const mapStyle = fromJS({
            version: 8,
            sources: {
                points: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: features
                    }
                }
            },
            layers: [
                {
                    id: 'my-layer',
                    type: 'circle',
                    source: 'points',
                    paint: {
                        'circle-color': '#f00',
                        'circle-opacity': 1,
                        'circle-radius': 4
                    }
                }
            ]
          });

        //console.log(features)
        return(
            <Card   >
            <CardHeader title={"Drone Map"} />
            <CardContent>
            <ReactMapGL
                mapboxApiAccessToken={MAPBOX_TOKEN}    
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}>
                <MapGL mapboxApiAccessToken={MAPBOX_TOKEN} {...this.state.viewport} mapStyle={mapStyle}  />
            </ReactMapGL>
            <ControlPanel />
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