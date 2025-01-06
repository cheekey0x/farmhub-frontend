import { IBasicModel } from "src/types/model";

export interface IMediaModel extends IBasicModel {
  name?: string;
  type: EMediaTypes;
  url: string;
  description?: string;
  width?: number;
  height?: number;
  author?: string;
}

export enum EMediaTypes {
  image = "jpg",
  doc = "pdf",
  video = "mp4"
}
