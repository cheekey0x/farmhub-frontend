import { useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import {
  Info as InfoIcon,
  Error as ErrorIcon,
  Report as ReportIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";
import { types, ToastProps } from "./types";

const StyledToast = styled("div")({
  right: "16px",
  position: "fixed",
  maxWidth: "calc(100% - 32px)",
  transition: "all 250ms ease-in",
  width: "fit-content"
});

export const Toast = ({
  toast,
  onRemove,
  style,
  ttl,
  ...props
}: ToastProps) => {
  const timer = useRef<number>();
  const ref = useRef(null);
  const { id, title, description, type } = toast;

  const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);

  const handleMouseEnter = () => {
    clearTimeout(timer.current);
  };

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, ttl);
  };

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      handleRemove();
    }, ttl);

    return () => {
      clearTimeout(timer.current);
    };
  }, [timer, ttl, handleRemove]);

  const getToastIcons = () => {
    switch (type) {
      case types.SUCCESS:
        return CheckCircleIcon;
      case types.INFO:
        return InfoIcon;
      case types.DANGER:
        return ErrorIcon;
      case types.WARNING:
        return ReportIcon;
      default:
        return InfoIcon;
    }
  };
  const ToastIcon = getToastIcons();

  return (
    <CSSTransition nodeRef={ref} timeout={250} style={style} {...props}>
      <StyledToast
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 2.5,
            p: 3
          }}
          onClick={handleRemove}
        >
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <ToastIcon />
            <Typography>{title}</Typography>
          </Box>
          <Typography>{description}</Typography>
        </Box>
      </StyledToast>
    </CSSTransition>
  );
};
