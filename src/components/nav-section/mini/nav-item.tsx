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
        sx={{
          py: 1
        }}
      >
        {icon && (
          <Box component="span" className="icon">
            {icon}
          </Box>
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

        {info && subItem && (
          <Box component="span" className="info">
            {info}
          </Box>
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
      color: theme.palette.text.whitesecondary
    },
    icon: {
      width: 26,
      height: 26,
      flexShrink: 0
    },
    label: {
      ...theme.typography.caption,
      textTransform: "capitalize",
    },
    caption: {
      color: theme.palette.text.disabled
    }
  } as const;

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      fontSize: 8,
      minHeight: 56,
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, 0.5),
      // fontWeight: theme.typography.fontWeightSemiBold,
      "& .icon": {
        ...baseStyles.icon
      },
      "& .label": {
        ...noWrapStyles,
        ...baseStyles.label,
        marginTop: theme.spacing(0.5),
      },
      "& .caption": {
        ...baseStyles.caption,
        top: 11,
        left: 6,
        position: "absolute",
      },
      "& .arrow": {
        top: 11,
        right: 6,
        position: "absolute"
      },
      ...(active && {
        color:
          theme.palette.mode === "light"
            ? theme.palette.text.white
            : theme.palette.text.main
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
      minHeight: 34,
      padding: theme.spacing(0, 1),
      // fontWeight: theme.typography.fontWeightMedium,
      "& .icon": {
        ...baseStyles.icon,
        marginRight: theme.spacing(1),
      },
      "& .label": {
        ...baseStyles.label,
        flexGrow: 1
      },
      "& .caption": {
        ...baseStyles.caption,
        marginLeft: theme.spacing(0.75)
      },
      "& .info": {
        display: "inline-flex",
        marginLeft: theme.spacing(0.75)
      },
      "& .arrow": {
        marginLeft: theme.spacing(0.75),
        marginRight: theme.spacing(-0.5)
      },
      ...(active && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.selected
        // fontWeight: theme.typography.fontWeightSemiBold,
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover
      })
    })
  };
});
