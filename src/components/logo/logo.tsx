import { forwardRef } from "react";

import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";

import { RouterLink } from "src/routes/components";
import { Stack, Typography, useTheme } from "@mui/material";
import Image from "src/components/image";

import { useSettingsContext } from "src/components/settings";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const settings = useSettingsContext();
    const theme = useTheme();
    const logoSrc =
      settings.themeLayout === "mini" ? "/logo/logo.png" : "/logo/logo.png";

    const logo = (
      <Stack
        // p={2.5}
        minHeight={50}
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <Image
              alt="logo"
              src={logoSrc}
              sx={{ height: 36 }}
            />
            <Typography
              variant="h6"
              component="h6"
              fontWeight={400}
              sx={{
                color: theme.palette.text.light,
                ml: 1
              }}
            >
              飞鸟科技FarmHub智慧农业系统
            </Typography>
          </Box>
        </Stack>
      </Stack>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/app" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
