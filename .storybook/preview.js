import { ThemeProvider } from "@mui/material"
import "../styles/globals.css";
import "@next/font/google"

import * as NextImage from "next/image";
import {theme} from "../utils/theme";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const withMuiTheme = (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
);

export const decorators = [withMuiTheme];
