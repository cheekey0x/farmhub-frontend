import { BaseMongoDBDocument } from "./common";

type Project = Partial<
  BaseMongoDBDocument & {
    admin: string;
    name: string;
  }
>;

type ProjectBranding = Partial<
  BaseMongoDBDocument & {
    project: string;
    title: string;
    description: string;
    theme: ProjectTheme;
    socialLinks: SocialLinks;
  }
>;

type ProjectWallet = Partial<{
  project: string;
  address: string;
}>;

type ProjectTheme = Partial<{
  logoUrl: string;
  bgImgUrl: string;
  bgColor: string;
  tbColor: string;
  headerBgColor: string;
  hlColor: string;
  btColor: string;
  bsFontColor: string;
  titleFontColor: string;
  btFontColor: string;
  tableFontColor: string;
  fontType: string;
}>;

type SocialLinks = { platform: string; url: string }[];

export type { Project, ProjectBranding, ProjectWallet };
