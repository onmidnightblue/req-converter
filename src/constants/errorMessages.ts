export const ERROR_MESSAGES = {
  MEMBER: "not found member",
  MANAGER: "not found manager",
  DUEDATE: "not found duedate",
  REQUESTED_DATE: "not found requestedDate",
  COMMITTEE: "not found member's committee",
  CONTENT: "invalid content format",
  EMPTY: "empty input",
} as const;

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export type ErrorCode = keyof typeof ERROR_MESSAGES;
