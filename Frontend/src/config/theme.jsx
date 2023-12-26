import { createTheme } from "@mui/material";
import { lightBlue, blue, grey, red, yellow, green } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      light: blue[50],
      dark: blue[900],
    },
    secondary: {
      main: yellow[500],
      light: yellow[200],
      dark: yellow[700],
    },
    error: {
      main: red[500],
      light: red[200],
      dark: red[700],
    },
    warning: {
      main: yellow[700],
      light: yellow[400],
      dark: yellow[900],
    },
    info: {
      main: lightBlue[500],
      light: lightBlue[200],
      dark: lightBlue[700],
    },
    success: {
      main: green[500],
      light: green[200],
      dark: green[700],
    },
    background: {
      default: grey[100],
    },
  },
});

export default theme;
