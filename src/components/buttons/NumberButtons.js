import { useEffect } from "react";

function NumberButtons({
  setIsFirstOperandCurrent,
  firstOperand,
  setFirstOperand,
  setIsSecondOperandCurrent,
  secondOperand,
  setSecondOperand,
  operator,
  isSubmit,
}) {
  const numberButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
  const dotHandler = () => {
    if (firstOperand.length !== 0 && !operator) {
      setFirstOperand(firstOperand + ".");
      if (firstOperand.includes(".")) {
        setFirstOperand(firstOperand);
      }
      if (firstOperand.length === 16) {
        setFirstOperand(firstOperand);
      }
    }
    if (secondOperand.length !== 0 && operator) {
      setSecondOperand(secondOperand + ".");
      if (secondOperand.includes(".")) {
        setSecondOperand(secondOperand);
      }
      if (secondOperand.length === 16) {
        setSecondOperand(secondOperand);
      }
    }
  };

  const firstOperandHandler = (firstOperand, button) => {
    if (firstOperand === "0") {
      if (firstOperand.includes("0")) firstOperand = "";
    }
    if (!operator) {
      setFirstOperand(firstOperand + button);
      if (firstOperand.length === 16) {
        setFirstOperand(firstOperand);
      }
    }
    setIsFirstOperandCurrent(true);
  };
  const secondOperandHandler = (secondOperand, button) => {
    if (secondOperand === "0") {
      if (secondOperand.includes("0")) secondOperand = "";
    }
    if (firstOperand && !isSubmit) {
      setSecondOperand(secondOperand + button);
      if (secondOperand.length === 16) {
        setSecondOperand(secondOperand);
      }
    }
    setIsSecondOperandCurrent(true);
  };

  const keydownNumberButtonHandler = (e) => {
    for (let i = 0; i < numberButtons.length; i++) {
      if (numberButtons[i] === e.key) {
        const numberButton = document.querySelector(`.number-button_${i}`);
        numberButton.classList.add("active");
        setTimeout(() => numberButton.classList.remove("active"), 50);
        if (firstOperand === "0") {
          if (firstOperand.includes("0")) firstOperand = "";
        }
        if (!operator) {
          setFirstOperand(firstOperand + e.key);
          if (firstOperand.length === 16) {
            setFirstOperand(firstOperand);
          }
          setIsFirstOperandCurrent(true);
        }
        if (operator) {
          if (secondOperand === "0") {
            if (secondOperand.includes("0")) secondOperand = "";
          }
          if (firstOperand && !isSubmit) {
            setSecondOperand(secondOperand + e.key);
            if (secondOperand.length === 16) {
              setSecondOperand(secondOperand);
            }
          }
          setIsSecondOperandCurrent(true);
        }
      }
    }
    if (e.key === ".") {
      const dotButton = document.querySelector(".calculator_button_dot");
      dotButton.classList.add("active");
      setTimeout(() => dotButton.classList.remove("active"), 50);
      if (firstOperand.length !== 0 && !operator) {
        setFirstOperand(firstOperand + ".");
        if (firstOperand.includes(".")) {
          setFirstOperand(firstOperand);
        }
        if (firstOperand.length === 16) {
          setFirstOperand(firstOperand);
        }
      }
      if (secondOperand.length !== 0 && operator) {
        setSecondOperand(secondOperand + ".");
        if (secondOperand.includes(".")) {
          setSecondOperand(secondOperand);
        }
        if (secondOperand.length === 16) {
          setSecondOperand(secondOperand);
        }
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keydownNumberButtonHandler);
    return () =>
      document.body.removeEventListener("keydown", keydownNumberButtonHandler);
  });

  return (
    <>
      {numberButtons.map((button, index) => (
        <button
          onClick={() => {
            if (!operator) {
              firstOperandHandler(firstOperand, button);
            } else {
              secondOperandHandler(secondOperand, button);
            }
          }}
          key={index}
          className={`calculator__number-button number-button_${index} calculator_button`}
        >
          {button}
        </button>
      ))}
      <button
        onClick={dotHandler}
        className="calculator__number-button calculator_button calculator_button_dot"
      >
        .
      </button>
    </>
  );
}

export default NumberButtons;
