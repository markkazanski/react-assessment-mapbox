import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const DroneList = props => {
    const { drone, timeSince } = props;

    if(drone && typeof drone == "object"){
        drone.timestamp = dateFormat(drone.timestamp);
        drone["Last received"] = (timeSince / 1000).toFixed(2) + " seconds ago";
    }

    return (
        <List>
            {drone && Object.keys(drone).map((key) => 
                <ListItem key={drone.timestamp + "-" + key}> 
                    <ListItemText 
                        primary={drone[key]} 
                        secondary={key} />
                </ListItem>
                )}
        </List>
    );
}

const dateFormat = time => {
    return new Date(time).toString()
}

export default DroneList;