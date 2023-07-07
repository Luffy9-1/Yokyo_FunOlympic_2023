interface ScheduleCardI {
  title: string;
  date1: string;
  date2: string;
  date3: string;
  date4: string;
  time1: string;
  time2: string;
  time3: string;
  time4: string;
}
function ScheduleCard({
  title,
  date1,
  date2,
  date3,
  date4,
  time1,
  time2,
  time3,
  time4,
}: ScheduleCardI) {
  return (
    <div className="schedule__card__wrapper">
      <h3>{title}</h3>
      <div className="schedule__card__box">
        <div>
          <p className="match__status">Match 1</p>
        </div>
        <div className="schedule__card__bar">
          <p>{date1}</p>
          <p> {time1}</p>
        </div>
        <div>
          <p className="match__status">Match 2</p>
        </div>
        <div className="schedule__card__bar">
          <p>{date2}</p>
          <p>{time2}</p>
        </div>
        <div>
          <p className="match__status">Match 3</p>
        </div>
        <div className="schedule__card__bar">
          <p>{date3}</p>
          <p>{time3}</p>
        </div>
        <div>
          <p className="match__status">Match 4</p>
        </div>
        <div className="schedule__card__bar">
          <p>{date4}</p>
          <p>{time4}</p>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
