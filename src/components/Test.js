import React from "react";

class Test extends React.Component{
    state = {
        drones: []
    }

    componentDidMount(){
        fetch('https://react-assessment-api.herokuapp.com/api/drone')
        .then(response=>response.json())
        .then(droneData =>{
            const droneSlice = droneData.data.slice(0,10);
            console.log(droneSlice);
            this.setState({drones: droneSlice}, () => console.log("set state"))
        })
    }

    render(){
        return(
            <div>
                TEST
                {this.state.drones.map(drone => <div>{drone.latitude}, {drone.longitude}</div>)}
            </div>
        )
    }
}

export default Test;