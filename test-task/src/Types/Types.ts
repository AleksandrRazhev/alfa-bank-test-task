export interface Photo {
  albumId?: number;
  id: number;
  thumbnailUrl?: string;
  title: string;
  url: string;
  like?: boolean | undefined;
}

export type PhotosStatus = null | "loading" | "fulfilled" | "rejected";

export interface PhotoState {
  photos: [] | Photo[];
  status: PhotosStatus;
  error: null | string;
}

export type PhotosPayloadAction = Photo[] | [];

export type FetchPhotosError = {
  message: string;
};
