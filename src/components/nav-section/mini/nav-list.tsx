import { useRef, useState, useEffect, useCallback } from "react";

import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";

import { usePathname } from "src/routes/hooks";
import { useActiveLink } from "src/routes/hooks/use-active-link";

import NavItem from "./nav-item";
import { NavListProps, NavSubListProps } from "../types";
import { useSettingsContext } from "src/components/settings";
import { useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps }: NavListProps) {
  const settings = useSettingsContext();
  const theme = useTheme();

  const navRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu(true);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <NavItem
        ref={navRef}
        open={openMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        //
        title={data.title}
        path={data.path}
        icon={data.icon}
        info={data.info}
        roles={data.roles}
        caption={data.caption}
        disabled={data.disabled}
        //
        depth={depth}
        hasChild={!!data.children}
        externalLink={data.path.includes("http")}
        currentRole={slotProps?.currentRole}
        //
        active={active}
        className={active ? "active" : ""}
        sx={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      />

      {!!data.children && (
        <Popover
          disableScrollLock
          open={openMenu}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: "center", horizontal: "right" }}
          transformOrigin={{ vertical: "center", horizontal: "left" }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: handleCloseMenu,
              sx: {
                mt: 0.5,
                minWidth: 160,
                borderRadius: 0.5,
                backgroundColor: settings.themeMode === "light" ? theme.palette.background.main : "#12181f",
                ...(openMenu && {
                  pointerEvents: "auto"
                })
              }
            }
          }}
          sx={{
            pointerEvents: "none"
          }}
          data-inert={openMenu ? undefined : true}
        >
          <NavSubList
            data={data.children}
            depth={depth}
            slotProps={slotProps}
          />
        </Popover >
      )
      }
    </>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps }: NavSubListProps) {
  return (
    <Stack>
      {data.map((list) => (
        <NavList
          key={list.title}
          data={list}
          depth={depth + 1}
          slotProps={slotProps}
        />
      ))}
    </Stack>
  );
}
