"use client";

import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useSettingsContext } from "src/components/settings";
// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  // ...................................
  const [isClient, setIsClient] = useState(false);
  // ...................................
  const settings = useSettingsContext();
  // ...................................
  useEffect(() => {
    setIsClient(true);
  }, []);
  // ...................................
  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: settings.themeMode === "light" ? "#e5dcff66" : "#12181f"
      }}
    >
      {isClient ? (
        <Stack
          sx={{
            width: 1,
            mx: "auto",
            maxWidth: { xs: 640, sm: 800 },
            // px: { xs: 3, sm: 4 },
            // py: { xs: 5, sm: 7 },
            justifyContent: "center",
            minHeight: { xs: "60vh" },
            backgroundColor:
              settings.themeMode === "light" ? "#F9FAFD" : "#161d27",
            // borderRadius: 1.5
          }}
        >
          {children}
        </Stack>
      ) : null}
    </Stack>
  );
}
