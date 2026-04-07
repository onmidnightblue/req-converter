import { DAYS } from "../constants/days";
import { ASSIGNED_DAY } from "../constants/members";

interface Props {
  summaryResult: {
    memberName: string;
    committee: string;
    managerName: string;
    dueDate: string;
    requestedDate: string;
  } | null;
}

const ResultSummary = ({ summaryResult }: Props) => {
  const { memberName, committee, managerName, dueDate, requestedDate } =
    summaryResult || {};
  const dayNumber = requestedDate ? new Date(requestedDate)?.getDay() : "";
  const findDayKorean = dayNumber ? DAYS[dayNumber] : "";
  const manager = dayNumber ? ASSIGNED_DAY[dayNumber] : "";

  const SUMMARY_DATA = {
    [""]: `${requestedDate} ${findDayKorean} 요청, ${dueDate} 까지 답변`,
    [findDayKorean + "요일 담당자"]: `${manager} 주무관님`,
    요구서담당자: `${managerName} 주무관님`,
    의원명: `${memberName} 의원`,
    소속: committee?.replaceAll(",", "\n"),
  };

  return (
    summaryResult && (
      <div className="w-full flex flex-col gap-2">
        <p>요약</p>
        <ul className="flex flex-col gap-2">
          {Object.entries(SUMMARY_DATA).map(([label, value]) => (
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <div className="text-sm">{label}</div>
              <div className="whitespace-pre-wrap text-right">{value}</div>
            </li>
          ))}
        </ul>
        <p className="text-red-400 text-sm text-center">
          주무관님 휴가, 의원 소속 더블체크
        </p>
      </div>
    )
  );
};

export default ResultSummary;
