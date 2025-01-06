import { forwardRef } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { RouterLink } from "src/routes/components";
import { Stack, useTheme } from "@mui/material";
import { NavItemProps, NavItemStateProps } from "../types";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      title,
      path,
      icon,
      info,
      disabled,
      caption,
      roles,
      //
      open,
      depth,
      active,
      hasChild,
      externalLink,
      currentRole = "admin",
      ...other
    },
    ref
  ) => {
    const subItem = depth !== 1;
    const theme = useTheme();

    const renderContent = (
      <Stack flexDirection="row" alignItems="center">
        <StyledNavItem
          ref={ref}
          disableGutters
          open={open}
          depth={depth}
          active={active}
          disabled={disabled}
          sx={{
            "&.active": {
              background: "red"
            }
          }}
          {...other}
        >
          {!subItem && icon && (
            <Box
              component="span"
              className="icon"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {icon}
            </Box>
          )}

          {subItem && icon ? (
            <Box component="span" className="icon">
              {icon}
            </Box>
          ) : (
            <Box component="span" className="sub-icon" />
          )}

          {title && (
            <Box
              component="span"
              sx={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 0
              }}
            >
              <Box component="span" className="label">
                {title}
              </Box>

              {caption && (
                <Tooltip title={caption} placement="top-start">
                  <Box component="span" className="caption">
                    {caption}
                  </Box>
                </Tooltip>
              )}
            </Box>
          )}

          {info && (
            <Box component="span" className="info">
              {info}
            </Box>
          )}
        </StyledNavItem>
        {/* {active && (
          <Box
            sx={{
              position: "absolute",
              color: theme.palette.text.primary,
              right: 0,
              background: theme.palette.background.main,
              transform: "translateY(-50 %)",
              height: "32px",
              width: "6px",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px"
            }}
          />
        )} */}
      </Stack>
    );

    // Hidden item by role
    if (roles && !roles.includes(`${currentRole}`)) {
      return null;
    }

    if (hasChild) {
      return renderContent;
    }

    if (externalLink)
      return (
        <Link
          href={path}
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            ...(disabled && {
              cursor: "default"
            })
          }}
        >
          {renderContent}
        </Link>
      );

    return (
      <Link
        component={RouterLink}
        href={path}
        color="inherit"
        underline="none"
        sx={{
          ...(disabled && {
            cursor: "default"
          })
        }}
      >
        {renderContent}
      </Link>
    );
  }
);

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active"
})<NavItemStateProps>(({ active, open, depth, theme }) => {
  const subItem = depth !== 1;

  const opened = open && !active;

  const deepSubItem = Number(depth) > 2;

  const noWrapStyles = {
    width: "100%",
    maxWidth: "100%",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  } as const;

  const baseStyles = {
    item: {
      borderRadius: 12,
      color: theme.palette.text.whitesecondary,
      padding: theme.spacing(0.5, 1, 0.5, 1.5)
    },
    icon: {
      width: 26,
      height: 26,
      flexShrink: 0,
      marginRight: theme.spacing(2)
    },
    label: {
      ...noWrapStyles,
      ...theme.typography.body2,
      textTransform: "capitalize",
      fontWeight:
        theme.typography[active ? "fontWeightSemiBold" : "fontWeightMedium"]
    },
    caption: {
      ...noWrapStyles,
      ...theme.typography.caption,
      color: theme.palette.text.disabled
    },
    info: {
      display: "inline-flex",
      marginLeft: theme.spacing(0.75)
    },
    arrow: {
      flexShrink: 0,
      marginLeft: theme.spacing(0.75)
    }
  } as const;

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      "& .icon": {
        ...baseStyles.icon
      },
      "& .sub-icon": {
        display: "none"
      },
      "& .label": {
        ...baseStyles.label
      },
      "& .caption": {
        ...baseStyles.caption
      },
      "& .info": {
        ...baseStyles.info
      },
      "& .arrow": {
        ...baseStyles.arrow
      },
      ...(active && {
        color:
          theme.palette.mode === "light"
            ? theme.palette.text.white
            : theme.palette.text.main,
        borderRadius: 8,
        backgroundColor: theme.palette.action.hover
      }),

      ...(opened && {
        color: theme.palette.text.whitesecondary,
        // backgroundColor: theme.palette.action.hover
      })
    }),
    justifyContent: "start",
    alignItems: "center",

    "&:hover": {
      // backgroundColor: "#919eab14"
      borderRadius: 8,
      backgroundColor: theme.palette.action.hover
    },
    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      minHeight: 36,
      "& .icon": {
        ...baseStyles.icon
      },
      "& .sub-icon": {
        ...baseStyles.icon,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "&:before": {
          content: '""',
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: theme.palette.text.disabled,
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.shorter
          }),
          ...(active && {
            transform: "scale(2)",
            backgroundColor: theme.palette.text.whitesecondary,
          })
        }
      },
      "& .label": {
        ...baseStyles.label
      },
      "& .caption": {
        ...baseStyles.caption
      },
      "& .info": {
        ...baseStyles.info
      },
      "& .arrow": {
        ...baseStyles.arrow
      },
      ...(active && {
        color: theme.palette.text.whitesecondary
      })
    }),

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: `${theme.spacing(Number(depth))} !important`
    })
  };
});
