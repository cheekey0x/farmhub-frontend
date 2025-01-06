import { ECardanoWalletType } from "src/types/custom.crypto";
import CardanoWallet from "./wallet";

export const connectIfNotConnected = async () => {
  const isConnected = await CardanoWallet.isConnected();
  if (isConnected) return true;

  const walletType = getFirstWalletType();
  const connected = await CardanoWallet.connect(walletType);
  return connected;
};

export const getFirstWalletType = () => {
  let walletType = ECardanoWalletType.Nami;
  if (window.cardano && "nami" in window.cardano) {
    walletType = ECardanoWalletType.Nami;
  } else if (window.cardano && "eternl" in window.cardano) {
    walletType = ECardanoWalletType.Eternl;
  } else if (window.cardano && "lace" in window.cardano) {
    walletType = ECardanoWalletType.Lace;
  } else if (window.cardano && "flint" in window.cardano) {
    walletType = ECardanoWalletType.Flint;
  } else if (window.cardano && "gerowallet" in window.cardano) {
    walletType = ECardanoWalletType.Gero;
  } else if (window.cardano && "typhoncip30" in window.cardano) {
    walletType = ECardanoWalletType.Typhon;
  } else if (window.cardano && "nufi" in window.cardano) {
    walletType = ECardanoWalletType.NuFi;
  } else if (window.cardano && "vespr" in window.cardano) {
    walletType = ECardanoWalletType.Vespr;
  } else if (window.cardano && "begin" in window.cardano) {
    walletType = ECardanoWalletType.Begin;
  } else if (window.cardano && "yoroi" in window.cardano) {
    walletType = ECardanoWalletType.Yoroi;
  }
  return walletType;
};
