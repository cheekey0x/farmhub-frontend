import { ECardanoWalletType, TWalletItem } from "src/types/custom.crypto";

export const CWalletList: TWalletItem[] = [
  {
    title: "Vespr",
    icon: "/assets/icon/wallet/vespr.png",
    type: ECardanoWalletType.Vespr,
    link: "https://vespr.xyz/"
  },
  {
    title: "Eternl",
    icon: "/assets/icon/wallet/eternl.png",
    type: ECardanoWalletType.Eternl,
    link: "https://chromewebstore.google.com/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka"
  },
  {
    title: "Typhon",
    icon: "/assets/icon/wallet/typhon.png",
    type: ECardanoWalletType.Typhon,
    link: "https://typhonwallet.io/#/download"
  },
  {
    title: "Gero",
    icon: "/assets/icon/wallet/gero.png",
    type: ECardanoWalletType.Gero,
    link: "https://www.gerowallet.io"
  },
  {
    title: "Begin",
    icon: "/assets/icon/wallet/begin.png",
    type: ECardanoWalletType.Begin,
    link: "https://begin.is"
  }
];
