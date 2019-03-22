import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import * as actions from "../store/actions";
import { connect } from "react-redux";

const cardStyles = theme => ({
    root: {
      background: theme.palette.primary.main
    },
    title: {
      color: "white"
    }
  });
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
    card: {
        margin: "5% 25%"
    }
};

class Drone extends React.Component{
  /*  state = {
        counter: 0,
        drones: []
    }
*/
    componentDidMount(){
        //console.log("THE PROPS", this.props)
        this.props.onLoad();

        /*
        fetch('https://react-assessment-api.herokuapp.com/api/drone')
        .then(response=>response.json())
        .then(droneData =>{
            const { counter } = this.state;
            this.setState({
                drones: droneData.data
            });
        })
        */
    }

    dateFormat = utc => {
        return new Date(utc).toString()
    }

    nextDrone = e => {
        e.preventDefault();
        //check if not at the end of drones array
        this.setState((prevState, props) => ({
            counter: (prevState.counter < prevState.drones.length) 
                    ? prevState.counter + 1 
                    : prevState.counter
        }));
    }

    prevDrone = e => {
        e.preventDefault();
        //check if not at the end of drones array
        this.setState((prevState, props) => ({
            counter: (prevState.counter > 0) 
                    ? prevState.counter - 1 
                    : prevState.counter
        }));
    }

    render(){
        const { classes, onNextDrone, onPrevDrone, drones, counter } = this.props;
        //const { drones, counter } = this.state;
        //console.log("RENDER PROPS", this.props)

        return(
            <Card >
            <CardHeader title={"#" + (counter + 1) + " Drone Data"} />
            <CardContent>
              <List>
                {drones[counter] && Object.keys(drones[counter]).map((key) => 
                    <ListItem key={counter + "-" + key}> 
                        <ListItemText 
                            primary={key === "timestamp" 
                                ? this.dateFormat(drones[counter][key]) 
                                : drones[counter][key]} 
                            secondary={key} />
                    </ListItem>
                    )}
              </List>
                <Button onClick={onPrevDrone} variant="contained" >Prev</Button>
                <Button onClick={onNextDrone} variant="contained" >Next</Button>
            </CardContent>
          </Card>
        )
    }
}

const mapDispatch = dispatch => ({
    onLoad: () =>
        dispatch({
            type: actions.FETCH_DRONES
        }),
    onNextDrone: () =>
        dispatch({
            type: actions.NEXT_DRONE
        }),
    onPrevDrone: () =>
        dispatch({
            type: actions.PREV_DRONE
        })
});

const mapState = (state, ownProps) => {
    const {
        drone
    } = state;
    return {
        ...drone
    };
  };
  
export default connect(
    mapState,
    mapDispatch
)(Drone);