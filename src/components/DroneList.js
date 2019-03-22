import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const DroneList = props => {
    const { drone } = props;

    return (
        <List>
            {drone && Object.keys(drone).map((key) => 
                <ListItem key={drone.timestamp + "-" + key}> 
                    <ListItemText 
                        primary={key === "timestamp" 
                            ? dateFormat(drone[key]) 
                            : drone[key]} 
                        secondary={key} />
                </ListItem>
                )}
        </List>
    );
}

const dateFormat = utc => {
    return new Date(utc).toString()
}

export default DroneList;