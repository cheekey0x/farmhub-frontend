import React, { useState, useEffect } from "react";
import {
  Box,
  Fab,
  List,
  Link,
  Stack,
  AppBar,
  Button,
  Drawer,
  Divider,
  ListItem,
  useTheme,
  Typography,
  IconButton,
  CssBaseline,
  ListItemText,
  ListItemButton,
  useScrollTrigger
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyboardArrowUp } from "@mui/icons-material";
import Logo from "src/components/logo";
import Image from "src/components/image";
import { useRouter } from "next/router";
import { useResponsive } from "src/hooks/use-responsive";
import ScrollTop from "./scroll-top";
import { debounce } from "lodash";
import LanguagePopover from "src/layouts/admin/common/language-popover";
import LoginPopover from "src/pages/login";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    name: "Features",
    link: "/#feature"
  },
  {
    name: "Use Cases",
    link: "/#use-case"
  },
  {
    name: "Partnership",
    link: "/#partnership"
  },
  {
    name: "Contact",
    link: "/contact"
  }
];

export default function LandingHeader(props: Props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeNavItem, setActiveNavItem] = useState(navItems[0].name);

  const theme = useTheme();
  const router = useRouter();
  const scorllTrigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 150
  });
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onChangeScroll = () => {
    const sections = {
      "#feature": "Features",
      "#use-case": "Use Cases",
      "#partnership": "Partnership"
    };

    const updateRoute = debounce((anchorId: string) => {
      router.push(anchorId, undefined, { shallow: true });
    }, 300);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const anchorId = entry.target.getAttribute("data-anchor-id");
          if (anchorId && anchorId in sections) {
            setActiveNavItem(sections[anchorId as keyof typeof sections]);
            updateRoute(anchorId);
          }
        }
      });
    }, { threshold: 0.2 });

    Object.keys(sections).forEach((id) => {
      const element = document.querySelector(`[data-anchor-id="${id}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  };


  useEffect(() => {
    const cleanup = onChangeScroll();
    return cleanup;
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Logo />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.link} disablePadding>
            <Link
              key={item.link}
              href={item.link}
              underline="none"
              className="font-clash"
              sx={{
                color: theme.palette.text.primary,
                lineHeight: "20.22px",
                letterSpacing: 1,
                width: "100%",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "transparent"
                }
              }}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText color="white" primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const mdUp = useResponsive("up", "md");
  return (
    <Box sx={{ display: "flex" }} id="back-to-top-anchor">
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            flexDirection: "row",
            justifyContent: { xs: "space-between", md: "space-between" },
            // backdropFilter: scorllTrigger ? "blur(2rem)" : "blur(rem)",
            backdropFilter: "blur(2rem)",
            pt: { xs: 1, md: 3 },
            pb: { xs: 1, md: 2 },
            px: { xs: 4, md: 3 }
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            flexDirection="row"
            onClick={() => router.push("/")}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <Box
              display="flex"
              alignItems="center"
            >
              <Image
                alt="logo"
                src="/logo/logo.png"
                sx={{ height: 32 }}
              />
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#236634",
                  ml: 1,
                  fontWeight: 500,
                  fontFamily: "KANIT"
                }}
              >
                飞鸟科技FarmHub智慧农业系统
              </Typography>
            </Box>
          </Stack>
          <Stack
            flexDirection="row"
          >
            <Button
              sx={{
                py: 0.7,
                px: 4,
                display: { xs: "none", sm: "flex" },
                fontWeight: "600",
                lineHeight: "18.23px",
                // background: "linear-gradient(90deg, #1A61ED 0%, #9747FF 100%)"
                background: "linear-gradient(90deg,rgb(30, 156, 76) 0%,rgb(103, 186, 132) 100%)",
                mr: 2
              }}
            // onClick={() => router.push("/login")}
            >

              <Typography
                className="font-clash"
                variant="body1"
                letterSpacing={1}
                fontWeight={700}
                color="white"
              >
                Demo
              </Typography>
            </Button>
            <LoginPopover />
            {/* <LanguagePopover /> */}
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <ScrollTop window={window}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            background: "linear-gradient(90deg, #1A61ED 0%, #9747FF 100%)"
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
