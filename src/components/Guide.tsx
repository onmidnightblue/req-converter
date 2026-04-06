import { DAYS } from "../constants/days";
import { ASSIGNED_DAY } from "../constants/members";
import { yyyymmddFormater } from "../utils/converter";

const Guide = () => {
  const today = new Date();
  const dayNumber = today.getDay();
  const yyyymmdd = yyyymmddFormater(today);
  const findDayKorean = DAYS[dayNumber];
  const manager = ASSIGNED_DAY[dayNumber];

  return (
    <p className="pt-5">
      오늘은{" "}
      <span className="font-bold">
        {yyyymmdd} {findDayKorean}요일
      </span>
      , 담당은 <span className="font-bold">{manager}</span> 주무관님
    </p>
  );
};

export default Guide;
