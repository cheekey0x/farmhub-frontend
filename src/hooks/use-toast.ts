import { ReactNode, useCallback } from "react";
import { useRootStore } from "src/store/root";
import { kebabCase } from "lodash";
import { ToastData, types as toastTypes } from "src/components/toast/types";

export function useToast() {
  const [toasts, setToast] = useRootStore((store) => [
    store.toasts,
    store.setToast
  ]);

  const toast = useCallback(
    ({ title, description, type }: Omit<ToastData, "id">) => {
      const id = kebabCase(title);
      // Remove any existing toasts with the same id
      const currentToasts = toasts.filter((prevToast) => prevToast.id !== id);

      return setToast([{ id, title, description, type }, ...currentToasts]);
    },
    [toasts, setToast]
  );

  const toastError = (title: string, description?: ReactNode) =>
    toast({ title, description, type: toastTypes.DANGER });
  const toastInfo = (title: string, description?: ReactNode) =>
    toast({ title, description, type: toastTypes.INFO });
  const toastSuccess = (title: string, description?: ReactNode) =>
    toast({ title, description, type: toastTypes.SUCCESS });
  const toastWarning = (title: string, description?: ReactNode) =>
    toast({ title, description, type: toastTypes.WARNING });
  const clear = () => setToast([]);
  const remove = (id: string) => {
    setToast(toasts.filter((prevToast) => prevToast.id !== id));
  };

  return {
    toastError,
    toastInfo,
    toastSuccess,
    toastWarning,
    clear,
    remove
  };
}
