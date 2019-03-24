import React, { Fragment } from "react";
import ReactMapGL from 'react-map-gl';
import MapGL from 'react-map-gl';
import {fromJS} from 'immutable';
import ControlPanel from './ControlPanel';

let MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

//Uncomment LINE 11 if Mapbox GL API KEY is not available. 
//I would not normally expose an API key, but this is for demonstration purposes and the API KEY is not attached to any billing data. 
//MAPBOX_TOKEN = 'pk.eyJ1IjoibWFya2themFuc2tpIiwiYSI6ImNqdGtlaXZ6YzNhOGozeW9iYzBudDJpNjMifQ.dbS6ALsDjDKc9msTs1wUiA'

class Map extends React.Component {
    state = {
        viewport: {
          width: 800,
          height: 350,
          latitude: 29.7604,
          longitude: -95.3698,
          zoom: 4
        }
      };
    
    render(){
        const { drones, minTemp, maxTemp, droneMin, droneMax } = this.props;
        //drones.forEach(d => console.log(d.latitude, d.longitude))

        const features = drones
                        .filter(d => d.metric > minTemp)
                        .filter(d => d.metric < maxTemp)
                        .map(d => {
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

        return (
            <Fragment>
                <ReactMapGL
                    mapboxApiAccessToken={MAPBOX_TOKEN}    
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}>
                    <MapGL mapboxApiAccessToken={MAPBOX_TOKEN} {...this.state.viewport} mapStyle={mapStyle}  />
                </ReactMapGL>
                <ControlPanel droneMin={droneMin} droneMax={droneMax} />
            </Fragment>
        )   
    }
}

export default Map;