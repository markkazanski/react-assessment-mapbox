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
import DroneList from "./DroneList";

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

    componentDidMount(){
        this.props.onLoad();
    }

    render(){
        const { classes, onNextDrone, onPrevDrone, drones, counter } = this.props;

        return(
            <Card >
            <CardHeader title={"#" + (counter + 1) + " Drone Data"} />
            <CardContent>
                <DroneList drone={drones[counter]} />
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