import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { hideScroll } from "src/theme/css";
import Logo from "src/components/logo";
import { NavSectionMini } from "src/components/nav-section";
import { NAV } from "../config-layout";
import { useNavData } from "./config-navigation";
import NavToggleButton from "./common/nav-toggle-button";
import { useSettingsContext } from "src/components/settings";
import { useTheme } from "@mui/material";
import { HEADER } from "../config-layout";
// ...................................

export default function NavMini() {
  const settings = useSettingsContext();
  const theme = useTheme();

  // ...................................
  const navData = useNavData();
  // ...................................
  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          left: NAV.W_MINI - 12
        }}
      />

      <Stack
        sx={{
          pb: 2,
          // height: 1,
          height: `calc(100% - ${HEADER.H_DESKTOP}px)`,
          marginTop: `${HEADER.H_DESKTOP}px`,
          position: "fixed",
          width: NAV.W_MINI,
          // borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          // backgroundColor: settings.themeMode === "light" ? "#006666" : "#12181f",
          backgroundColor: settings.themeMode === "light" ? theme.palette.background.main : "#12181f",
          ...hideScroll.x
        }}
      >
        <NavSectionMini
          data={navData}
          slotProps={{
            currentRole: "admin"
          }}
        />
      </Stack>
    </Box>
  );
}
