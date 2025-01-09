"use client";

import Box, { BoxProps } from "@mui/material/Box";
import Image from "../image/image";

// ----------------------------------------------------------------------

export default function LoadingLogo({ sx, ...other }: BoxProps): JSX.Element {
  return (
    <Box
      sx={{
        px: 5,
        width: "100%",
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...sx
      }}
      {...other}
    >
      <Image
        alt="Farmhub logo"
        src="/logo/logo.png"
        className="loading-logo"
        sx={{ height: "50px", width: "50px" }}
      />
      <div className="loader">
        <div />
      </div>
    </Box>
  );
}
