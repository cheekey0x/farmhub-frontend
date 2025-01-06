import { BACKEND_ENDPOINTS } from "src/constant/router";
import { axiosPost } from "src/utils/axios";
import { EMediaTypes, IMediaModel } from "./media.type";

export const uploadImage: (
  imageString: string
) => Promise<IMediaModel> = async (imageString) => {
  try {
    const result = await axiosPost([
      `${BACKEND_ENDPOINTS.media.upload}`,
      { data: { input: imageString, type: EMediaTypes.image } }
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
