export enum ECardanoWalletType {
  None = "None",
  Nami = "Nami",
  Eternl = "Eternl",
  Flint = "Flint",
  Gero = "Gero",
  Typhon = "Typhon",
  NuFi = "Nufi",
  Lace = "Lace",
  Vespr = "Vespr",
  Begin = "Begin",
  Yoroi = "Yoroi"
}

export enum ECardanoNetwork {
  Preprod = 0,
  Mainnet = 1
}

export interface IWallet {
  walletType: ECardanoWalletType;
  address: string;
}

export enum EBlockchainNetWork {
  None = 0,
  Cardano = 1
}

export type TWalletItem = {
  title: string;
  icon: string;
  type: ECardanoWalletType;
  link: string;
};
