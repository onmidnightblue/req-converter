interface Props {
  type?: "submit" | "reset";
  clickHandler: () => void;
  label: string;
}

const Button = ({ type, label, clickHandler }: Props) => {
  return (
    <button
      type={type}
      className={`cursor-pointer  transition-colors rounded-md w-full px-4 py-2 ${
        type === "reset" ? "bg-blue-100" : "bg-blue-400"
      }
      ${type === "reset" ? "text-black" : "text-white"}
      `}
      onClick={clickHandler}
    >
      {label}
    </button>
  );
};

export default Button;
