import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Drone from "./components/Drone";
import MapContainer from "./components/MapContainer";
import Grid from '@material-ui/core/Grid';

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Grid container spacing={24} className="mdc-layout-grid" style={{padding: 20}}>

            <Grid item className="mdc-layout-grid__cell--span-3" >
              <Drone />
            </Grid>
            <Grid item className="mdc-layout-grid__cell--span-9" >
              <MapContainer />
            </Grid>
        </Grid>

        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
