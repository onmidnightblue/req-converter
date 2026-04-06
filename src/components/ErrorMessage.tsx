interface Props {
  errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    errorMessage && (
      <div className="text-red-800 text-center">{errorMessage}</div>
    )
  );
};

export default ErrorMessage;
