import { useState } from "react";

interface Props {
  result: string;
}

const Result = ({ result }: Props) => {
  const [clipboardState, setClipboardState] = useState<string>("");

  const clipboadHandler = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setClipboardState("success");
    } catch {
      setClipboardState("error");
    }
  };

  return (
    result && (
      <div>
        <div onClick={clipboadHandler}>clipboad</div>
        {clipboardState && (
          <div className="fixed top-1/2 left-1/2">{clipboardState}</div>
        )}
        <div className="border rounded-md bg-gray-100">{result}</div>
      </div>
    )
  );
};

export default Result;
