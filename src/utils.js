export const getImageUrl = (path) => {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
};
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color design tokens
export const tokens = (mode) => ({
  ...(mode == "dark"
    ? {
        brightblue: {
          100: "#dcf9fd",
          200: "#b9f3fb",
          300: "#97eef9",
          400: "#74e8f7",
          500: "#51e2f5",
          600: "#41b5c4",
          700: "#318893",
          800: "#205a62",
          900: "#102d31",
        },
        bluegreen: {
          100: "#ebfefc",
          200: "#d8fdf9",
          300: "#c4fbf5",
          400: "#b1faf2",
          500: "#9df9ef",
          600: "#7ec7bf",
          700: "#5e958f",
          800: "#3f6460",
          900: "#1f3230",
        },
        dustywhite: {
          100: "#fbfddd",
          200: "#f8fcbb",
          300: "#f4fa9a",
          400: "#f1f978",
          500: "#edf756",
          600: "#bec645",
          700: "#8e9434",
          800: "#5f6322",
          900: "#2f3111",
        },
        pinksand: {
          100: "#fbfddd",
          200: "#f8fcbb",
          300: "#f4fa9a",
          400: "#f1f978",
          500: "#edf756",
          600: "#bec645",
          700: "#8e9434",
          800: "#5f6322",
          900: "#2f3111",
        },
        darksand: {
          100: "#ece6e7",
          200: "#daccd0",
          300: "#c7b3b8",
          400: "#b599a1",
          500: "#a28089",
          600: "#82666e",
          700: "#614d52",
          800: "#413337",
          900: "#201a1b",
        },
      }
    : {
        brightblue: {
          100: "#102d31",
          200: "#205a62",
          300: "#318893",
          400: "#41b5c4",
          500: "#51e2f5",
          600: "#74e8f7",
          700: "#97eef9",
          800: "#b9f3fb",
          900: "#dcf9fd",
        },
        bluegreen: {
          100: "#1f3230",
          200: "#3f6460",
          300: "#5e958f",
          400: "#7ec7bf",
          500: "#9df9ef",
          600: "#b1faf2",
          700: "#c4fbf5",
          800: "#d8fdf9",
          900: "#ebfefc",
        },
        dustywhite: {
          100: "#2f3111",
          200: "#5f6322",
          300: "#8e9434",
          400: "#bec645",
          500: "#edf756",
          600: "#f1f978",
          700: "#f4fa9a",
          800: "#f8fcbb",
          900: "#fbfddd",
        },
        pinksand: {
          100: "#2f3111",
          200: "#5f6322",
          300: "#8e9434",
          400: "#bec645",
          500: "#edf756",
          600: "#f1f978",
          700: "#f4fa9a",
          800: "#f8fcbb",
          900: "#fbfddd",
        },
        darksand: {
          100: "#201a1b",
          200: "#413337",
          300: "#614d52",
          400: "#82666e",
          500: "#a28089",
          600: "#b599a1",
          700: "#c7b3b8",
          800: "#daccd0",
          900: "#ece6e7",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            dustywhite: {
              main: colors.dustywhite[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.dustywhite[500],
            },
          }
        : {
            // palette values for light mode
            dustywhite: {
              main: colors.dustywhite[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
