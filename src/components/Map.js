import React from "react";
import ReactMapGL from 'react-map-gl';
import MapGL from 'react-map-gl';
import {fromJS} from 'immutable';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFya2themFuc2tpIiwiYSI6ImNqdGtlaXZ6YzNhOGozeW9iYzBudDJpNjMifQ.dbS6ALsDjDKc9msTs1wUiA'

class Map extends React.Component {
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

        return (
            <ReactMapGL
                mapboxApiAccessToken={MAPBOX_TOKEN}    
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}>
                <MapGL mapboxApiAccessToken={MAPBOX_TOKEN} {...this.state.viewport} mapStyle={mapStyle}  />
            </ReactMapGL>
        )   
    }
}

export default Map;