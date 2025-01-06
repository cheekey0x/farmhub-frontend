import { useEffect } from "react";
import { Box, Stack, Drawer, Divider } from "@mui/material";
import { usePathname } from "src/routes/hooks";
import { useResponsive } from "src/hooks/use-responsive";
import Logo from "src/components/logo";
import { NavSectionVertical } from "src/components/nav-section";
import dynamic from "next/dynamic";
import { useNavData } from "./config-navigation";
import NavToggleButton from "./common/nav-toggle-button";
import { NAV } from "../config-layout";
import NavTeam from "./nav-team";
import { useSettingsContext } from "src/components/settings";

const Scrollbar = dynamic(() => import("src/components/scrollbar"), {
  ssr: false
});
// ...................................

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};
// ...................................

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const settings = useSettingsContext();

  // ...................................
  const pathname = usePathname();
  const lgUp = useResponsive("up", "lg");
  const navData = useNavData();

  // ...................................
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  // ...................................

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column"
        },
        backgroundColor: settings.themeMode === "light" ? "#006666" : "#12181f",
        borderTopRightRadius: "24px",
        borderBottomRightRadius: "24px"
      }}
    >
      <Logo />
      {/* <Divider variant="fullWidth" sx={{ borderStyle: "dashed" }} /> */}

      <NavSectionVertical
        data={navData}
        slotProps={{
          currentRole: "admin"
        }}
        sx={{
          mt: 3
        }}
      />
      {/* <Divider variant="middle" sx={{ my: 3, borderStyle: "dashed" }} /> */}
      {/* <NavTeam /> */}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
  // ...................................

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.W_VERTICAL,
            // borderRight: (theme) => `dashed 1px ${theme.palette.divider}`
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
