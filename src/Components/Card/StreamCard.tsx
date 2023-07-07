import React, { useContext } from "react";
import { StreamCardInterface } from "../../Interface/StreamCardInterface";
import SampleButton from "../Button/SampleButton";
import { useNavigate } from "react-router-dom";
import { ActiveUserContext } from "../../context/ActiveUser";
import { live } from "../../assets";

function StreamCard({
  image,
  cardTitle,
  cardDescription,
  url,
}: StreamCardInterface) {
  const navigate = useNavigate();
  const { activeUser } = useContext(ActiveUserContext);
  const streamHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (activeUser) {
      navigate(`/watchlive/${cardTitle}`, {
        state: { title: cardTitle, url: url },
      });
    } else {
      navigate("/login");
    }
  };

  console.log(image)
  return (
    <div className="stream__card__wrapper">
      <div className="stream__card__img">
        <img src={image} alt={cardTitle} />
      </div>
      <div className="stream__card__content">
        <div className="stream__card__title">
          <p>{cardTitle}</p>
        </div>
        {/* <p className="stream__card__description">{cardDescription}</p> */}
      </div>
      <div className="stream__card__btn">
        <SampleButton
          nameOfClass="stream__btn"
          title="Watch"
          handler={(e: React.MouseEvent<HTMLButtonElement>) => streamHandler(e)}
        />
      </div>
    </div>
  );
}

export default StreamCard;
