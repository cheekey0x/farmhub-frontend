import { create, StateCreator } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

import { ToastData } from "src/components/toast/types";
import { IActiveProject } from "src/utils/service/api/project.type";
import { ESubscriptionPlan } from "../constant/project";
import { ModalType } from "../types/modal";
import { TWalletItem } from "src/types/custom.crypto";
import { CWalletList } from "src/constant/wallet";

export type RootStore = AppSlice;

export enum EAlert {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning"
}

interface IModal {
  type: ModalType;
  open: boolean;
}

interface ISubscribe {
  type?: ESubscriptionPlan;
}

export interface ISnackbar {
  alertType?: EAlert;
  message?: string;
  open?: boolean;
}

export interface ISubscriptionModal {
  activeProject: IActiveProject;
}

type TPreviewAccount = {
  address: string;
  walletType: TWalletItem;
};

export type AppSlice = {
  modal: IModal;
  setModal: (args: IModal) => void;
  subscribe: ISubscribe;
  setSubscribe: (args: ISubscribe) => void;
  toasts: ToastData[];
  setToast: (args: ToastData[]) => void;
  snackbar: ISnackbar;
  setSnackbar: (args: ISnackbar) => void;
  previewAccount: TPreviewAccount;
  setPreviewAccount: (args: TPreviewAccount) => void;
};

export const createAppSlice: StateCreator<
  RootStore,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  AppSlice
> = (set, get) => ({
  toasts: [],
  modal: {
    type: ModalType.ACCOUNT_MANAGE,
    open: false
  },
  snackbar: {},
  previewAccount: {
    address: "",
    walletType: CWalletList[0]
  },
  subscribe: {
    type: ESubscriptionPlan.HOBBYIST
  },

  setModal: (value) => {
    set({ modal: value });
  },
  setToast: (value) => {
    set({ toasts: value });
  },
  setSnackbar: (value) => {
    set({ snackbar: value });
  },
  setPreviewAccount: (value) => {
    set({ previewAccount: value });
  },
  setSubscribe: (value) => {
    set({ subscribe: value });
  }
});

export const useRootStore = create<RootStore>()(
  subscribeWithSelector(
    devtools(
      (...args) => ({
        ...createAppSlice(...args)
      }),
      { name: "root" }
    )
  )
);
