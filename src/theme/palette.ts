import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    main: string;
    light: string;
    primary: string;
    secondary: string;
    disabled: string;
    black: string;
    white: string;
    whitesecondary: string;
  }
  interface TypeBackground {
    paper: string;
    default: string;
    neutral: string;
    main: string;
    light: string;
    lighter: string;
    standard: string;
    filter: string;
    border: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    main: string;
  }
}

// SETUP COLORS

export const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#C2C2C2",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24"
};

export const primary = {
  lighter: "#5957c54d",
  light: "#5957c5bf",
  main: "#5957c5",
  dark: "#522cba",
  darker: "#004B50",
  contrastText: "#FFFFFF"
};

export const secondary = {
  lighter: "#EFD6FF",
  light: "#C684FF",
  main: "#8E33FF",
  dark: "#5119B7",
  darker: "#27097A",
  contrastText: "#FFFFFF"
};

export const info = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#FFFFFF"
};

export const success = {
  lighter: "#D3FCD2",
  light: "#77ED8B",
  main: "#22C55E",
  dark: "#118D57",
  darker: "#065E49",
  contrastText: "#ffffff"
};

export const warning = {
  lighter: "#FFF5CC",
  light: "#FFD666",
  main: "#FFAB00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: grey[800]
};

export const error = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#FFFFFF"
};

export const common = {
  black: "#000000",
  white: "#FFFFFF",
  yStrong: "#dd25cd",
  yMain: "#00f3fc",
  yDark: "#286fdd",
  yDarker: "#182044"
};

export const action = {
  // hover: alpha(primary.main, 0.8),
  hover: alpha(primary.contrastText, 0.2),
  selected: "#FFF",
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action
};

// ----------------------------------------------------------------------

export function palette(mode: "light" | "dark") {
  const light = {
    mode: "light",
    text: {
      main: "#285A48",
      light: "#E4E4E4",
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
      black: "#000",
      white: "#fff",
      whitesecondary: "#FFFFFFCC"
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
      neutral: grey[200],
      main: "#285A48",
      light: "#5957c5bf",
      lighter: "#5957c54d",
      standard: "#fff",
      filter: "brightness(0)",
      border: "#0000001F"
    },
    action: {
      ...base.action,
      selected: "#5957c54d",
      active: "#5957c54d",
      hover: "rgba(255, 255, 255, 0.2)"
    }
  };

  const dark = {
    mode: "dark",
    text: {
      main: "#7606E6",
      primary: "#C2C2C2",
      secondary: grey[500],
      disabled: grey[600],
      black: "#fff",
      white: "#fff",
      whitesecondary: "#FFFFFFCC"
    },
    background: {
      paper: "#161d27",
      default: "#12181f",
      neutral: "#16171a",
      main: "#7606E6",
      light: "#363c43",
      lighter: "",
      standard: "#161d27",
      filter: "brightness(0) invert(1)",
      border: "#FFFFFF1F"
    },
    action: {
      ...base.action,
      selected: "#731ae2b3",
      active: "#731ae2b3",
      hover: "#731ae2b3"
    }
  };

  return mode === "light" ? light : dark;
}
