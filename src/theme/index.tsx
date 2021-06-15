import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  heading: "poppins",
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          bgColor: "white",
          color: "black",
          fontFamily: "poppins",
        },
        a: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
    colors: {
      brand: {
        50: "#E5F0FF",
        100: "#B8D4FF",
        200: "#8AB9FF",
        300: "#5C9DFF",
        400: "#2E82FF",
        500: "#0066FF",
        600: "#0052CC",
        700: "#003D99",
        800: "#002966",
        900: "#001433",
      },
    },
    fonts,
    fontSizes,
    breakpoints,
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
