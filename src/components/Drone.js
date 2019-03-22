import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

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
    state = {
        counter: 0,
        drones: []
    }

    componentDidMount(){
        fetch('https://react-assessment-api.herokuapp.com/api/drone')
        .then(response=>response.json())
        .then(droneData =>{
            const { counter } = this.state;
            this.setState({
                drones: droneData.data
            });
        })
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
        const { classes } = this.props;
        const { drones, counter } = this.state;

        return(
            <Card className={classes.card}>
            <CardHeader title={"#" + (counter + 1) + " Drone Data"} />
            <CardContent>
              <List>
                {drones[counter] && Object.keys(drones[counter]).map((key) => 
                    <ListItem key={counter + "-" + key}> 
                        <ListItemText 
                            primary={key == "timestamp" 
                                ? this.dateFormat(drones[counter][key]) 
                                : drones[counter][key]} 
                            secondary={key} />
                    </ListItem>
                    )}
              </List>
                <Button onClick={this.prevDrone} variant="contained" >Prev</Button>
                <Button onClick={this.nextDrone} variant="contained" >Next</Button>
            </CardContent>
          </Card>
        )
    }
}

export default withStyles(styles)(Drone);