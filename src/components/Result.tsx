import { useState } from "react";

interface Props {
  result: string;
}

const Result = ({ result }: Props) => {
  const [copyState, setCopyState] = useState<string>("");

  const clipboardHandler = async () => {
    try {
      setCopyState("···");
      await navigator.clipboard.writeText(result);
      setCopyState("✓");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCopyState("");
    } catch {
      setCopyState("error");
    }
  };

  return (
    result && (
      <div className="flex flex-col gap-2 p-12 pt-0">
        <div className="flex justify-end">
          <div
            className="cursor-pointer text-xs border py-1 px-2 rounded-md hover:border-gray-400 hover:text-gray-600 transition duration-100 min-w-20 text-center"
            onClick={clipboardHandler}
          >
            {copyState || "Ctrl + C"}
          </div>
        </div>
        <div className="p-4 rounded-md bg-gray-100 whitespace-pre-wrap">
          {result}
        </div>
      </div>
    )
  );
};

export default Result;
