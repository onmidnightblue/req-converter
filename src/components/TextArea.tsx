interface Props {
  id: "summary" | "requestDetails";
  label: string;
  value: string;
  changeHandler: (params: {
    key: "summary" | "requestDetails";
    value: string;
  }) => void;
}

const TextArea = ({ id, label, value, changeHandler }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => changeHandler({ key: id, value: e.target.value })}
        className="border min-h-20 rounded-md outline-none"
      />
    </div>
  );
};

export default TextArea;
