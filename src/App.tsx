import { useState } from "react";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import Result from "./components/Result";
import ErrorMessage from "./components/ErrorMessage";
import type { ChangeHandlerProps, EnteredState } from "./types/index.ts";
import { useConverter } from "./hooks/useConverter.ts";

function App() {
  const [entered, setEntered] = useState<EnteredState>({
    enteredSummary: "",
    enteredContent: "",
  });
  const { result, errorMessage, converter, setResult, setErrorMessage } =
    useConverter(entered);

  const changeHandler = ({ key, value }: ChangeHandlerProps) => {
    setEntered((prev) => ({ ...prev, [key]: value }));
    setErrorMessage("");
  };

  const resetHandler = () => {
    setEntered({ enteredSummary: "", enteredContent: "" });
    setResult("");
    setErrorMessage("");
  };

  return (
    <>
      <header className="text-center text-4xl font-bold pt-12">
        <h1>Converter</h1>
      </header>
      <main>
        <form className="flex flex-col gap-4 p-12">
          <TextArea
            id={"enteredSummary"}
            label={"enteredSummary"}
            value={entered.enteredSummary}
            changeHandler={changeHandler}
          />
          <TextArea
            id={"enteredContent"}
            label={"enteredContent"}
            value={entered.enteredContent}
            changeHandler={changeHandler}
          />
          <div className="w-full flex gap-2">
            <Button
              type={"reset"}
              label={"reset"}
              clickHandler={resetHandler}
            />
            <Button
              type={"submit"}
              label={"convert"}
              clickHandler={converter}
            />
          </div>
          <ErrorMessage errorMessage={errorMessage} />
        </form>
        <Result result={result} />
      </main>
    </>
  );
}

export default App;
