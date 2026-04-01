import { useState } from "react";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import Result from "./components/Result";
import ErrorMessage from "./components/ErrorMessage";

interface EnteredState {
  summary: string;
  requestDetails: string;
}

interface ChangeHandlerProps {
  key: keyof EnteredState;
  value: string;
}

function App() {
  const [entered, setEntered] = useState<EnteredState>({
    summary: "",
    requestDetails: "",
  });
  const [result, setResult] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const changeHandler = ({ key, value }: ChangeHandlerProps) => {
    setEntered((prev) => ({ ...prev, [key]: value }));
    setErrorMessage("");
  };

  const resetHandler = () => {
    setEntered({ summary: "", requestDetails: "" });
    setErrorMessage("");
  };

  const converter = (e?: React.SubmitEvent) => {
    if (e) e.preventDefault();
    const { summary, requestDetails } = entered;
    if (!summary || !requestDetails) {
      setErrorMessage("empty input.");
      return;
    }

    // member
    const regexMember = summary.match(/국회의원\s+([가-힣]+)의원실/);
    const memberName = regexMember?.[1];
    if (!memberName) {
      setErrorMessage("not found member");
      return;
    }

    // affiliation

    // date
    const regexDuedate = summary.match(/답변기한\s*:\s*(\d{4}-\d{2}-\d{2})/);
    const dueDate = regexDuedate?.[1];
    if (!dueDate) {
      setErrorMessage("not found duedate");
      return;
    }

    // find person in charge
    const getDate = new Date(dueDate);
    const dayNumber = getDate.getDay();
    const dailyAssignment: Record<number, string> = {
      0: import.meta.env.VITE_PERSON_IN_CHARGE_1,
      1: import.meta.env.VITE_PERSON_IN_CHARGE_1,
      2: import.meta.env.VITE_PERSON_IN_CHARGE_2,
      3: import.meta.env.VITE_PERSON_IN_CHARGE_2,
      4: import.meta.env.VITE_PERSON_IN_CHARGE_3,
      5: import.meta.env.VITE_PERSON_IN_CHARGE_3,
      6: import.meta.env.VITE_PERSON_IN_CHARGE_1,
    };
    const steeringMember_txt = import.meta.env.VITE_STEERING_MEMBERS || "";
    const steeringMembers = steeringMember_txt
      ? JSON.parse(steeringMember_txt)
      : {};
    let personInCharge = steeringMembers[memberName] || "";
    if (!personInCharge) personInCharge = dailyAssignment[dayNumber];

    // requestDetails
    const regexrequestDetailsText = requestDetails.match(
      /(1\.[\s\S]*?)(?=담당자\s*:)/
    );
    const requestDetailsText = regexrequestDetailsText?.[1];

    // result
    console.log({
      memberName,
      personInCharge,
      dueDate,
      requestDetailsText,
    });
    setResult("");
  };

  return (
    <>
      <header className="text-center text-4xl font-bold pt-12">
        <h1>Converter</h1>
      </header>
      <main>
        <form className="flex flex-col gap-4 p-12">
          <TextArea
            id={"summary"}
            label={"summary"}
            value={entered.summary}
            changeHandler={changeHandler}
          />
          <TextArea
            id={"requestDetails"}
            label={"requestDetails"}
            value={entered.requestDetails}
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
          <Result result={result} />
        </form>
      </main>
    </>
  );
}

export default App;
