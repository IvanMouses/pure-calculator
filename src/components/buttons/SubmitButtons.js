import { useEffect } from "react";

function SubmitButtons({
  firstOperand,
  operator,
  secondOperand,
  setResult,
  setIsSubmit,
}) {
  const submitHandler = (firstOperand, operator, secondOperand) => {
    if (firstOperand && operator && secondOperand) {
      if (operator === "/")
        setResult(String(Number(firstOperand) / Number(secondOperand)));

      if (operator === "*")
        setResult(String(Number(firstOperand) * Number(secondOperand)));

      if (operator === "-")
        setResult(String(Number(firstOperand) - Number(secondOperand)));

      if (operator === "+")
        setResult(String(Number(firstOperand) - -Number(secondOperand)));

      setIsSubmit(true);
    }
  };

  const keydownSubmitHandler = (e) => {
    if (e.key === "Enter" || e.key === "=") {
      const submitButton = document.querySelector(".calculator__submit-button");
      submitButton.classList.add("active");
      setTimeout(() => submitButton.classList.remove("active"), 50);
      if (firstOperand && operator && secondOperand) {
        if (operator === "/")
          setResult(String(Number(firstOperand) / Number(secondOperand)));

        if (operator === "*")
          setResult(String(Number(firstOperand) * Number(secondOperand)));

        if (operator === "-")
          setResult(String(Number(firstOperand) - Number(secondOperand)));

        if (operator === "+")
          setResult(String(Number(firstOperand) - -Number(secondOperand)));

        setIsSubmit(true);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keydownSubmitHandler);
    return () =>
      document.body.removeEventListener("keydown", keydownSubmitHandler);
  });

  return (
    <button
      onClick={() => submitHandler(firstOperand, operator, secondOperand)}
      className="calculator__submit-button calculator_button"
    >
      =
    </button>
  );
}

export default SubmitButtons;
