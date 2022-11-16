import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../Hooks/customDispatch";
import { removePhoto, likePhoto, fetchPhotos } from "../../Store/photosSlice";
import { Photo, PhotosStatus } from "../../Types/Types";
import { Like } from "../svg/Like";

import style from "./Photos.module.scss";

export const Photos: React.FC = () => {
  const [likedState, setlikedState] = useState(false);

  const photos = useAppSelector(
    (state: { photos: { photos: Photo[] | [] } }) => state.photos.photos
  );
  const status = useAppSelector(
    (state: { photos: { status: PhotosStatus } }) => state.photos.status
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <div className={style.photos}>
      <button
        className={style.filterButton}
        onClick={() => setlikedState((likedState) => !likedState)}
      >
        {likedState ? "Показать все карточки" : "Показать залайканные карточки"}
      </button>
      {photos[0] ? (
        <ul className={style.list}>
          {photos.map((item, index) => {
            return (
              <li
                key={item.id}
                className={style.listItem}
                style={
                  likedState && item.like !== true
                    ? { display: "none" }
                    : undefined
                }
              >
                <p className={style.title}>{item.title}</p>
                <div className={style.block}>
                  <img
                    className={style.img}
                    src={item.url}
                    alt={item.id.toString()}
                  />
                  <button
                    className={style.delete}
                    onClick={() => dispatch(removePhoto(index))}
                  >
                    удалить
                  </button>
                  <button
                    className={style.button}
                    onClick={() => dispatch(likePhoto(index))}
                  >
                    <div className={item.like ? style.likeLiked : style.like}>
                      <Like />
                    </div>
                  </button>
                  <span className={style.liked}>
                    {item.like !== true ? null : "Liked"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
