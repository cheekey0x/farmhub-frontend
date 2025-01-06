import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";
import { bgGradient } from "src/theme/css";

// ...................................

export default function Cover({
  name,
  email,
  avatar
}: {
  name: string;
  email: string;
  avatar: string;
}) {
  // ...................................
  const theme = useTheme();

  // ...................................
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.dark, 0.5),
          imgUrl: "/assets/images/learn/learn_bg.png"
        }),
        height: 290,
        color: "common.white"
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: "absolute" }
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            mx: "auto",
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.palette.common.white}`
          }}
        />

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: "center", md: "unset" }
          }}
          primary={name}
          secondary={email}
          primaryTypographyProps={{
            typography: "h4"
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: "inherit",
            component: "span",
            typography: "body1",
            sx: { opacity: 0.8 }
          }}
        />
      </Stack>
    </Box>
  );
}
