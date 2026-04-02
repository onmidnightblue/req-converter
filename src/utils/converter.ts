import { ASSIGNED_DAY, IN_CHARGE_MAP } from "../constants/members";
import type { FormatOptions } from "../types";

export const getManager = (requestedDate: string, memberName: string) => {
  const getDate = new Date(requestedDate);
  const dayNumber = getDate.getDay();
  const result = IN_CHARGE_MAP[memberName] || ASSIGNED_DAY[dayNumber];
  return result;
};

export const generateFormat = ({
  manager,
  member,
  committee,
  content,
  dueDate,
}: FormatOptions) => {
  return [
    `${manager} 주무관님`,
    `[${member} 의원(${committee})]`,
    content,
    `답변기한 : ${dueDate}`,
  ].join("\n\n");
};
