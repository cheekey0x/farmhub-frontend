import Box, { BoxProps } from "@mui/material/Box";
import { useResponsive } from "src/hooks/use-responsive";
import { useSettingsContext } from "src/components/settings";
import { NAV, HEADER } from "../config-layout";
// ...................................

const SPACING = 8;

// ...................................

export default function Main({ children, sx, ...other }: BoxProps) {
  // ...................................

  const settings = useSettingsContext();
  const lgUp = useResponsive("up", "lg");
  // ...................................

  const isNavMini = settings.themeLayout === "mini";
  // ...................................
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        // flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        pt: `${HEADER.H_MOBILE + SPACING}px`,
        pb: 5,
        backgroundColor: settings.themeMode === "light" ? "#F9FAFD" : "#12181f",
        overflow: "auto",
        ...(lgUp && {
          px: 2,
          pt: `${HEADER.H_DESKTOP + SPACING}px`,
          pb: 1,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI}px)`
          })
        }),
        ...sx
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
