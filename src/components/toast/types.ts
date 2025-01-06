import { ReactNode } from "react";

export const types = {
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info"
};

export type Types = (typeof types)[keyof typeof types];

export interface ToastData {
  id: string;
  type: Types;
  title: string;
  description?: ReactNode;
}

export interface ToastContainerProps {
  stackSpacing?: number;
  ttl?: number;
}

export interface ToastProps {
  toast: ToastData;
  onRemove: (id: string) => void;
  ttl: number;
  style: Partial<CSSStyleDeclaration>;
}
