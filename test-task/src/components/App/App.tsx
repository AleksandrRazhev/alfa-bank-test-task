import { Provider } from "react-redux";
import { store } from "../../Store";
import { Photos } from "../Photos/Photos";

import style from "./App.module.scss";

interface Item {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={style.app}>
        <Photos />
      </div>
    </Provider>
  );
};
