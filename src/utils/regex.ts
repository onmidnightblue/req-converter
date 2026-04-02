export const parseMemberData = (enteredSummary: string) => {
  const memberName = enteredSummary.match(/국회의원\s+([가-힣]+)의원실/)?.[1];
  const dueDate = enteredSummary.match(
    /답변기한\s*:\s*(\d{4}-\d{2}-\d{2})/
  )?.[1];
  const requestedDate = enteredSummary.match(
    /요구서 수신일\s*:\s*(\d{4}-\d{2}-\d{2})/
  )?.[1];
  return { memberName, dueDate, requestedDate };
};

export const parseContentData = (enteredContent: string) => {
  const regexContent = enteredContent.match(/(1\.[\s\S]*?)(?=담당자\s*:)/);
  const content = regexContent?.[1];

  const result = content
    ?.replace(/([가-힣\w·()[\]])\s*\n+\s*([가-힣\w·()[\]])/g, "$1 $2") // 전체 줄바꿈 제거
    .replace(/(?<=\S)\s+(\d+(?:-\d+)?\.)/g, "\n$1")
    .replace(
      /(?<![a-zA-Z0-9])-(?![a-zA-Z0-9])|(?<=[가-힣])-|-/g,
      (_, offset, str) => {
        const isWordBound = /[a-zA-Z0-9]-[a-zA-Z0-9]/.test(
          str.substr(offset - 1, 3)
        );
        return isWordBound ? "-" : "\n  -";
      }
    )
    .replace(/^(1\.)\s*\n+/, "$1 ")
    .replace(/\n\s*\n/g, "\n")
    .replace(/[ ]{2,}/g, " ")
    .trim();

  return result;
};
