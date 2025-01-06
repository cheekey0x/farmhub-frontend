import * as Yup from "yup";
import { InferType } from "yup";
import {
  IProject,
  TNFTWallet,
  TTokenWallet
} from "src/utils/service/api/project.type";

export const NewBrandDefaultValues = {
  bgColor: "#16171aff",
  tbColor: "#161d27ff",
  headerBgColor: "#161d27ff",
  hlColor: "#731ae2ff",
  btColor: "#731ae2",
  bsFontColor: "#C2C2C2",
  titleFontColor: "#C2C2C2",
  btFontColor: "#C2C2C2",
  tableFontColor: "#C2C2C2",
  fontType: "arial",
  title: "",
  description: "",
  dexHunter: {
    name: "",
    code: ""
  },
  socialLinks: [],
  logoUrl:
    "https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18",
  bgImgUrl:
    "https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18"
};

export const DefaultNewTokenWalletVaules: TTokenWallet = {
  enable: false,
  ctConfig: {}
};

export const DefaultNewNFTWalletVaules: TNFTWallet = {
  enable: false,
  ctConfig: {},
  traits: []
};

export const DefaultNewTokenValues = {
  enable: false,
  policyId: "",
  rewardTokenId: "",
  policyGate: {
    enable: false,
    type: "",
    feature: ""
  },
  custodial: DefaultNewTokenWalletVaules,
  nonCustodial: DefaultNewTokenWalletVaules,
  collections: []
};

export const DefaultNewNFTValues = {
  enable: false,
  policyId: "",
  rewardTokenId: "",
  policyGate: {
    enable: false,
    type: "",
    feature: ""
  },
  custodial: DefaultNewNFTWalletVaules,
  nonCustodial: DefaultNewNFTWalletVaules,
  collections: []
};

export const NewProjectDefaultValues: Partial<IProject> = {
  ...NewBrandDefaultValues,
  logoUrl:
    "https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18",
  bgImgUrl:
    "https://wmsyimages.nyc3.digitaloceanspaces.com/image/6596328a-6e1d-4e88-b37e-372018db7a18",
  token: DefaultNewTokenValues,
  nft: DefaultNewNFTValues
};

const socialLinkSchema = Yup.object().shape({
  type: Yup.string().required(),
  link: Yup.string().required()
});
export const NewBrandSchema = Yup.object().shape({
  // uploaded images
  bgColor: Yup.string().required("Background Color is required"),
  tbColor: Yup.string().required("Table Background Color is required"),
  headerBgColor: Yup.string().required("Header Background Color is required"),
  hlColor: Yup.string().required("Hightlight Color is required"),
  btColor: Yup.string().required("Button Color is required"),
  fontType: Yup.string().required("Font Type is required"),
  bsFontColor: Yup.string().required("Font Color is required"),
  titleFontColor: Yup.string().required("Title Font Color is required"),
  btFontColor: Yup.string().required("Button Font Color is required"),
  tableFontColor: Yup.string().required("Table Font Color is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  logoUrl: Yup.string().required("LogoUrl is required"),
  bgImgUrl: Yup.string().optional().default(null),
  dexHunter: Yup.object().shape({
    name: Yup.string(),
    code: Yup.string()
  }),
  socialLinks: Yup.array().of(socialLinkSchema).optional()
});

export type BrandSchemaType = InferType<typeof NewBrandSchema>;

export const UserAccountSchema = Yup.object().shape({
  name: Yup.string().optional(),
  avatar: Yup.string().optional(),
  userEmail: Yup.string().email("Email must be a valid email address"),
  phoneNumber: Yup.string().optional(),
  wallet: Yup.array().of(Yup.string()).optional(),
  socialLinks: Yup.array().of(socialLinkSchema).optional()
});

export const DefaultUserAccountValue = {
  name: "",
  avatar: "",
  userEmail: "",
  phoneNumber: "",
  password: "",
  wallet: [],
  socialLinks: []
};
