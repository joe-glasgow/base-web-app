import { createTheme } from "@mui/material/styles";
import {breakpoints} from "@mui/system";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fcba03",
        },
    },
});


theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '3.2rem',
    },
};

theme.typography.h2 = {
    fontSize: '2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
    },
};

export { theme }
