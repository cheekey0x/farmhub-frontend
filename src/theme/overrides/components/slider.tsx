import { Theme } from "@mui/material/styles";
import { sliderClasses } from "@mui/material/Slider";

// ----------------------------------------------------------------------

export function slider(theme: Theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          [`&.${sliderClasses.disabled}`]: {
            color: theme.palette.action.disabled
          }
        },
        rail: {
          opacity: 0.32
        },
        markLabel: {
          fontSize: 13,
          color: theme.palette.text.disabled
        },
        valueLabel: {
          borderRadius: 10,
          backgroundColor: theme.palette.background.main
        }
      }
    }
  };
}
