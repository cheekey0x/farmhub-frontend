import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import { IProject } from "src/utils/service/api/project.type";
import { NewProjectDefaultValues } from "src/types/yup.schema";
import { IUser } from "src/utils/service/api/auth.type";
import { ECardanoWalletType } from "src/types/custom.crypto";

type TWallet = {
  address: string;
  balance: number;
};

type TAccount = {
  wallet: TWallet;
  walletType: ECardanoWalletType;
};

export type TPersistState = {
  newProject: Partial<IProject>;
  previewProject: Partial<IProject>;
  pageProject: Partial<IProject>;
  account: TAccount;
  user: Partial<IUser>;
};

export type TPersistStore = {
  app: TPersistState;
  actions: {
    init: () => Promise<void>;
    setNewProject: (params: Partial<IProject>) => Promise<void>;
    initNewProject: () => Promise<void>;
    initPageProject: () => Promise<void>;
    setPageProject: (params: Partial<IProject>) => Promise<void>;
    setPreviewProject: (params: Partial<IProject>) => Promise<void>;
    setAccount: (account: Partial<TAccount>) => Promise<void>;
    setUser: (user: Partial<IUser>) => Promise<void>;
  };
};

const initialState: TPersistState = {
  newProject: {
    ...NewProjectDefaultValues,
    name: ""
  },
  pageProject: { ...NewProjectDefaultValues },
  previewProject: { ...NewProjectDefaultValues },
  account: {
    wallet: {
      address: "",
      balance: 0
    },
    walletType: ECardanoWalletType.Nami
  },
  user: {}
};

export const usePersistStore = create<TPersistStore>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          app: initialState,
          actions: {
            async init() {
              set(
                produce((draft) => {
                  draft.app = initialState;
                })
              );
            },
            async initNewProject() {
              set(
                produce((draft) => {
                  draft.app.newProject = initialState.newProject;
                })
              );
            },
            async initPageProject() {
              set(
                produce((draft) => {
                  draft.app.pageProject = initialState.pageProject;
                })
              );
            },
            async setNewProject(params) {
              set(
                produce((draft) => {
                  const updatedDraft = {
                    ...draft.app.newProject,
                    ...params
                  };
                  draft.app.newProject = updatedDraft;
                })
              );
            },
            async setPreviewProject(params) {
              set(
                produce((draft) => {
                  const updatedDraft = {
                    ...draft.app.previewProject,
                    ...params
                  };
                  draft.app.previewProject = updatedDraft;
                })
              );
            },
            async setPageProject(params) {
              set(
                produce((draft) => {
                  const updatedDraft = {
                    ...draft.app.pageProject,
                    ...params
                  };
                  draft.app.pageProject = updatedDraft;
                })
              );
            },
            async setAccount(params) {
              set(
                produce((draft) => {
                  const updatedDraft = {
                    ...draft.app.account,
                    ...params
                  };
                  draft.app.account = updatedDraft;
                })
              );
            },

            async setUser(params) {
              set(
                produce((draft) => {
                  const updatedDraft = {
                    ...draft.app.user,
                    ...params
                  };
                  draft.app.user = updatedDraft;
                })
              );
            }
          }
        }),
        {
          name: "persist-store",
          partialize: (state) => ({ app: state.app })
        }
      )
    ),
    { name: "persist" }
  )
);
