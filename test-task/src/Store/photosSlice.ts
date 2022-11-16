import {
  createAsyncThunk,
  createSlice,
  Slice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  FetchPhotosError,
  Photo,
  PhotosPayloadAction,
  PhotoState,
} from "../Types/Types";

export const fetchPhotos = createAsyncThunk<
  Photo[],
  undefined,
  { rejectValue: FetchPhotosError }
>("photos/fetchPhotos", async (_, thunkApi) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=50"
  )
    .then((data) => data.json())
    .catch(() => thunkApi.rejectWithValue({ message: "Failed to fetch" }));
  return res;
});

const initialState: PhotoState = { photos: [], status: null, error: null };

const PhotosSlice: Slice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotos(state, action: PayloadAction<PhotosPayloadAction>) {
      state.photos = [...action.payload];
    },
    addPhoto(state, action: PayloadAction<Photo>) {
      state.photos.push(action.payload);
    },
    removePhoto(state, action: PayloadAction<number>) {
      state.photos.splice(action.payload, 1);
    },
    likePhoto(state, action: PayloadAction<number>) {
      const item: Photo = state.photos[action.payload];
      if (!item.like) {
        item.like = true;
      } else {
        item.like = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(
      fetchPhotos.fulfilled,
      (state, action: PayloadAction<PhotosPayloadAction>) => {
        state.status = "fulfilled";
        state.photos = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchPhotos.rejected,
      (state, action: PayloadAction<FetchPhotosError | undefined>) => {
        state.status = "rejected";
        if (action.payload) {
          const error = action.payload;
          state.error = error.message;
        }
      }
    );
  },
});

export default PhotosSlice.reducer;
export const { setPhotos, likePhoto, addPhoto, removePhoto } =
  PhotosSlice.actions;
