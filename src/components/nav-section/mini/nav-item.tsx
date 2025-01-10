import { forwardRef } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";

import { RouterLink } from "src/routes/components";

import Iconify from "../../iconify";
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

    const renderContent = (
      <StyledNavItem
        disableGutters
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      // sx={{
      //   py: 1
      // }}
      >
        {icon && (
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
          <Box component="span" className="label">
            {title}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow placement="right">
            <Iconify width={16} icon="eva:info-outline" className="caption" />
          </Tooltip>
        )}

        {hasChild && (
          <Iconify
            width={16}
            className="arrow"
            icon="eva:arrow-ios-forward-fill"
          />
        )}
      </StyledNavItem>
    );

    // Hidden item by role
    if (roles && !roles.includes(`${currentRole}`)) {
      return null;
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
            width: 1,
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
        // href={!hasChild ? path : ""}
        href={path}
        color="inherit"
        underline="none"
        sx={{
          width: 1,
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

  const noWrapStyles = {
    width: "100%",
    maxWidth: "100%",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  } as const;

  const baseStyles = {
    item: {
      borderRadius: 6,
      color: theme.palette.text.light,
      padding: theme.spacing(0.5, 1, 0.5, 1.5)
    },
    icon_container: {
      width: 26,
      height: 26,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      flexShrink: 0,
      // marginRight: theme.spacing(1.6)
    },
    icon: {
      width: 18,
      height: 18,
      // flexShrink: 0
    },
    label: {
      // ...theme.typography.caption,
      textTransform: "capitalize",
      fontSize: 11
    },
    caption: {
      color: theme.palette.text.disabled
    },
    arrow: {
      flexShrink: 0,
      // marginLeft: theme.spacing(0.75)
    }
  } as const;

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      // fontWeight: theme.typography.fontWeightSemiBold,
      "& .icon-container": {
        ...baseStyles.icon_container
      },
      "& .icon": {
        ...baseStyles.icon
      },

      "& .label": {
        display: "none"
        // marginTop: theme.spacing(0.5),
      },
      "& .caption": {
        ...baseStyles.caption,
        top: 11,
        left: 6,
        position: "absolute",
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
        "& .icon-container": {
          ...baseStyles.icon_container,
          backgroundColor: theme.palette.background.default
        },
        "& .icon": {
          ...baseStyles.icon,
          color: theme.palette.text.main
        },
        "& .sub-icon": {
          display: "none"
        },
        "& .label": {
          display: "none"
        },
        "& .arrow": {
          ...baseStyles.arrow,
          color: theme.palette.text.white
        },
      }),
      ...(opened && {
        color:
          theme.palette.mode === "light"
            ? theme.palette.text.white
            : theme.palette.text.primary
      })
    }),

    "&:hover": {
      // backgroundColor: "#919EAB14"
      borderRadius: 8,
      color:
        theme.palette.mode === "light"
          ? theme.palette.text.white
          : theme.palette.text.main
      // backgroundColor: theme.palette.action.hover
    },
    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      ...theme.typography.body2,
      minHeight: 28,
      padding: theme.spacing(0, 1),
      // fontWeight: theme.typography.fontWeightMedium,
      "& .icon-container": {
        ...baseStyles.icon_container,
      },
      "& .icon": {
        ...baseStyles.icon,
        marginRight: theme.spacing(1),
      },
      "& .label": {
        ...baseStyles.label,
        flexGrow: 1,
      },
      "& .caption": {
        ...baseStyles.caption,
        marginLeft: theme.spacing(0.75)
      },
      "& .info": {
        display: "inline-flex",
        marginLeft: theme.spacing(0.75)
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
          marginRight: 12,
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.shorter
          }),
          ...(active && {
            transform: "scale(2)",
            backgroundColor: theme.palette.text.whitesecondary,
          })
        }
      },
      "& .arrow": {
        marginLeft: theme.spacing(0.75),
        marginRight: theme.spacing(-0.5)
      },
      ...(active && {
        color: theme.palette.text.primary,
        "& .icon-container": {
          ...baseStyles.icon_container,
          backgroundColor: theme.palette.background.main
        },
        "& .icon": {
          ...baseStyles.icon,
          color: theme.palette.text.white
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
            marginRight: 12,
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
          color: theme.palette.text.white,
          flexGrow: 1,
        },
        "& .arrow": {
          ...baseStyles.arrow,
          color: theme.palette.text.white
        },
        // fontWeight: theme.typography.fontWeightSemiBold,
      }),
      ...(opened && {
        color: theme.palette.text.white,
        backgroundColor: theme.palette.action.hover
      })
    })
  };
});
