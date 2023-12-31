import React, { useState, useContext } from "react";
import Title from "../Components/Title/Title";
import ReactVideoPlayer from "../Utils/ReactVideoPlayer";
import { useLocation } from "react-router-dom";
import { fun } from "../assets";
import { FavoriteContext } from "../context/FavoriteContext";
import { useSnackbar } from "notistack";

function WatchLive() {
  const dataNavigator = useLocation();
  const [commentData, setCommentData] = useState<string>("");
  const [commentArray, setCommentArray] = useState<string[]>([]);
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const { enqueueSnackbar } = useSnackbar();

  const commentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCommentArray([...commentArray, commentData]);
    setCommentData("");
  };

  const favoriteHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string,
    title: string
  ) => {
    e.preventDefault();
    if (favorite?.find((item) => item.title === title)) {
      enqueueSnackbar("Already In favorite.", { variant: "error" });
    } else if (favorite === null) {
      setFavorite([{ url: url, title: title }]);
      enqueueSnackbar("Added to the favorite.", { variant: "success" });
    } else {
      setFavorite([...favorite!, { url: url, title: title }]);
      enqueueSnackbar("Added to the favorite.", { variant: "success" });
    }
  };
  return (
    <div className="overall__wrapper">
      <div className="watch__live__wrapper">
        <div className="container">
          <Title title={dataNavigator?.state?.title} />
          <div className="row">
            <div className="col-md-9">
              <div className="watch__live__content">
                <div className="watch__live__video__wrapper">
                  <ReactVideoPlayer
                    playing={true}
                    controls={false}
                    muted={true}
                    height="80vh"
                    width="100%"
                    url={dataNavigator?.state?.url}
                  />
                </div>
                <div className="content__description">
                  <p>FUN OLYMPICS | {dataNavigator?.state?.title} </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="comment__section">
                <div className="top__chat">
                  <p>Comment Section</p>
                </div>
                <hr />
                <div className="comment__content">
                  <ul>
                    <li>
                      <span>
                        <i className="fa-solid fa-user"></i>
                      </span>
                      Wow☄️🥰 😘 😘
                    </li>
                    <li>
                      <span>
                        <i className="fa-solid fa-user"></i>
                      </span>
                      Nepal Nepal 😍 🥰 💥 ⚡️
                    </li>
                    {commentArray.map((item) => (
                      <li>
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr />
                <div className="comment__input__section">
                  {/* <div className="comment__icon__name">
                    <span>
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <p>Saroj</p>
                  </div> */}
                  <div>
                    <input
                      type="text"
                      placeholder="comment..."
                      className="input__bar"
                      value={commentData}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCommentData(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="comment__btn">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      commentHandler(e)
                    }
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchLive;
