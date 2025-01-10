import { forwardRef } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { RouterLink } from "src/routes/components";
import { Stack, useTheme } from "@mui/material";
import { NavItemProps, NavItemStateProps } from "../types";
import Iconify from "src/components/iconify";

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
          {...other}
        >
          {!subItem && icon && (
            <Box component="span" className="icon-container">
              <Box
                component="span"
                className="icon"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {icon}
              </Box>
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
                minWidth: 0,
                flexGrow: 1
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
          {hasChild ? (
            <Iconify
              width={16}
              className="arrow"
              icon="eva:arrow-ios-forward-fill"
            />
          )
            : (
              <Box width={16} height={16}></Box>
            )}
        </StyledNavItem>
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

  // const opened = open && !active;
  const opened = open;

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
      color: theme.palette.text.light,
      padding: theme.spacing(0.5, 1, 0.5, 1.5)
    },
    icon_container: {
      width: 26,
      height: 26,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      flexShrink: 0,
      marginRight: theme.spacing(1.6)
    },
    icon: {
      width: 18,
      height: 18,
      // flexShrink: 0,
      // marginRight: theme.spacing(2)
    },
    label: {
      ...noWrapStyles,
      ...theme.typography.body2,
      textTransform: "capitalize",
      fontWeight:
        theme.typography[active ? "fontWeightSemiBold" : "fontWeightMedium"],
      fontSize: 12
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
      "& .icon-container": {
        ...baseStyles.icon_container
      },
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
        ...baseStyles.arrow,
        transform: "rotate(0deg)",
        transition: "transform .2s ease"
      },
      ...(active && {
        color:
          theme.palette.mode === "light"
            ? theme.palette.text.white
            : theme.palette.text.main,
        borderRadius: 5,
        backgroundColor: "#E9FCF5",
        "& .icon-container": {
          ...baseStyles.icon_container,
          backgroundColor: theme.palette.background.main
        },
        "& .icon": {
          ...baseStyles.icon,
          color: theme.palette.text.white
        },
        "& .sub-icon": {
          display: "none"
        },
        "& .label": {
          ...baseStyles.label,
          color: theme.palette.background.main
        },
        "& .arrow": {
          ...baseStyles.arrow,
          color: theme.palette.background.main
        },
      }),

      ...(opened && {
        // color: theme.palette.text.whitesecondary,
        // backgroundColor: theme.palette.action.hover
        "& .arrow": {
          ...baseStyles.arrow,
          transform: "rotate(90deg)",
          transition: "transform .2s linear",
          color: active ? theme.palette.text.main : theme.palette.text.white
        },
      })
    }),
    justifyContent: "start",
    alignItems: "center",

    "&:hover": {
      borderRadius: 5,
      backgroundColor: theme.palette.action.hover
    },
    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      minHeight: 36,
      "& .icon-container": {
        ...baseStyles.icon_container,
      },
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
          marginLeft: 12,
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
        ...baseStyles.label,
        marginLeft: 18,
      },
      "& .caption": {
        ...baseStyles.caption
      },
      "& .info": {
        ...baseStyles.info
      },
      "& .arrow": {
        ...baseStyles.arrow,
        transform: "rotate(0deg)",
        transition: "transform .2s linear"
      },
      ...(active && {
        color: theme.palette.text.whitesecondary,
      }),
      ...(opened && {
        // color: theme.palette.text.whitesecondary,
        // backgroundColor: theme.palette.action.hover
        "& .arrow": {
          ...baseStyles.arrow,
          transform: "rotate(90deg)",
          transition: "transform .2s linear",
          color: depth == 1 ? theme.palette.text.main : theme.palette.text.white
        },
      })
    }),

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: `${theme.spacing(Number(depth))} !important`
    })
  };
});