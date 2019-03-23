## Create React App Visualization

### Installation

1. Git clone this repo: https://github.com/markkazanski/mark-kazanski-eog-react-assessment/
2. ```cd mark-kazanski-eog-react-assessment```
3. Run command ```yarn install```. 
4. Run command ```yarn start```
5. Open URL in a browser: http://localhost:3000/

### Description

There are 2 visualization items in the dashboard: drone data display and a map visualization.

![Screenshot](public/screenshot.JPG)

#### Drone Data Display

This displays drone data as text and the time since last update. The data is shows for 1 drone at a time and the user can use "Next" and "Prev" buttons to advance through all 375 drones. The API is polled every 4 seconds.

#### Map Visualization

This uses the Mapbox GL package to display all drones. The map updates as the API is polled, every 4 seconds. 

### Room for Improvement

1. As the drone data loads there the cards are empty and this causes the grids to wobble. This can be fixed by using fixed width columns or using a flexbox layout. 

2. The map should will the width of the card it is in. This can be accomplished by making the viewport width dynamic, probably by using ```getBoundingClientRect()```. 

3. The drone data display can use a more features: 
  a. switching temperature from Kelvin to Celcius to Farenheit
  b. sorting by temperature or by relevance
  c. adding statistical information, standard deviation, etc. 
  
4. Map visualization can use more features, too:
  a. adding different layers, like heatmap. Letting user switch between layers.
  b. adding options to filter data: minimum and maximum temperature or accuracy. 
  
5. Storing data over a period of time and showing changes in temperature over time.
