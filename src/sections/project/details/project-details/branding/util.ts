import { ProjectBranding, WithoutBaseMongoDBDocument } from "cardano-api/types";
import { BrandSchemaType } from "src/types/yup.schema";

const changeBrandingInfoForCryptoApi = (
  data: BrandSchemaType
): Partial<WithoutBaseMongoDBDocument<ProjectBranding>> => {
  const newData: Partial<WithoutBaseMongoDBDocument<ProjectBranding>> = {};
  newData.title = data.title;
  newData.description = data.description;
  newData.socialLinks =
    data.socialLinks?.map((item) => ({
      platform: item.type,
      url: item.link
    })) || [];

  newData.theme = {
    logoUrl: data.logoUrl,
    bgImgUrl: data.bgImgUrl,
    bgColor: data.bgColor,
    tbColor: data.tbColor,
    headerBgColor: data.headerBgColor,
    hlColor: data.hlColor,
    btColor: data.btColor,
    bsFontColor: data.bsFontColor,
    titleFontColor: data.titleFontColor,
    btFontColor: data.btFontColor,
    tableFontColor: data.tableFontColor,
    fontType: data.fontType
  };
  return newData;
};

export { changeBrandingInfoForCryptoApi };
