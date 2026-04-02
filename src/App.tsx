import { useState } from "react";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import Result from "./components/Result";
import ErrorMessage from "./components/ErrorMessage";
import type { ChangeHandlerProps, EnteredState } from "./types/index.ts";
import { useConverter } from "./hooks/useConverter.ts";
import Guide from "./components/Guide.tsx";

function App() {
  const [entered, setEntered] = useState<EnteredState>({
    enteredSummary: "",
    enteredContent: "",
  });
  const { result, errorMessage, converter, setResult, setErrorMessage } =
    useConverter(entered);

  const changeHandler = ({ key, value }: ChangeHandlerProps) => {
    setEntered((prev) => ({ ...prev, [key]: value }));
    setResult("");
    setErrorMessage("");
  };

  const resetHandler = () => {
    setEntered({ enteredSummary: "", enteredContent: "" });
    setResult("");
    setErrorMessage("");
  };

  return (
    <>
      <header className="text-center pt-12">
        <h1 className="font-bold text-4xl">요구서 메세지 변환기</h1>
        <Guide />
      </header>
      <main>
        <form className="flex flex-col gap-4 p-12">
          <TextArea
            id={"enteredSummary"}
            label={"요구서 개요"}
            value={entered.enteredSummary}
            changeHandler={changeHandler}
          />
          <TextArea
            id={"enteredContent"}
            label={"요구서 본문"}
            value={entered.enteredContent}
            changeHandler={changeHandler}
          />
          <div className="w-full flex gap-2">
            <Button
              type={"reset"}
              label={"초기화"}
              clickHandler={resetHandler}
            />
            <Button type={"submit"} label={"변환"} clickHandler={converter} />
          </div>
          <ErrorMessage errorMessage={errorMessage} />
        </form>
        <Result result={result} />
      </main>
    </>
  );
}

export default App;
