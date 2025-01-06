import { TransitionGroup } from "react-transition-group";
import { styled } from "@mui/material/styles";
import { useRootStore } from "src/store/root";
import { useToast } from "src/hooks/use-toast";
import { Toast } from "./toast";
import { ToastContainerProps } from "./types";

const ZINDEX = 1000;
const TOP_POSITION = 100; // Initial position from the top

const StyledToastContainer = styled("div")({
  "& .enter, .appear": {
    opacity: 0.01
  },
  "& .enter.enter-active,.appear.appear-active": {
    opacity: 1,
    transition: "opacity 250ms ease-in"
  }
});

export const ToastContainer = ({
  ttl = 2000,
  stackSpacing = 24
}: ToastContainerProps) => {
  const toasts = useRootStore((store) => store.toasts);
  const { remove } = useToast();
  const onRemove = (id: string) => remove(id);
  return (
    <StyledToastContainer>
      <TransitionGroup>
        {toasts.map((toast, index) => {
          const zIndex = (ZINDEX - index).toString();
          const top = TOP_POSITION + index * stackSpacing;

          return (
            <Toast
              key={toast.id}
              toast={toast}
              onRemove={onRemove}
              ttl={ttl}
              style={{ top: `${top}px`, zIndex }}
            />
          );
        })}
      </TransitionGroup>
    </StyledToastContainer>
  );
};
