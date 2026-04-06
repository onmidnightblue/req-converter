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

  const SUMMARY_DATA = {
    요구일시: requestedDate,
    답변기한: dueDate,
    담당자: `${managerName} 주무관님`,
    의원명: `${memberName} 의원`,
    소속: committee,
  };

  return (
    summaryResult && (
      <div className="w-full flex flex-col gap-2">
        <p>요약</p>
        <ul className="flex flex-col gap-2">
          {Object.entries(SUMMARY_DATA).map((item) => {
            const label = item[0];
            let value = item[1];
            if (label === "소속") value = item[1]?.replaceAll(", ", "\n");
            return (
              <li className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <div className="text-sm">{label}</div>
                <div className="whitespace-pre-wrap text-right">{value}</div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default ResultSummary;
