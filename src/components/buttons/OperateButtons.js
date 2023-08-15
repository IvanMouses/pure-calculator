import { useEffect } from "react";

function OperateButtons({
  setIsFirstOperandCurrent,
  firstOperand,
  setOperator,
  setIsSecondOperandCurrent,
  secondOperand,
}) {
  const operateButtons = ["/", "*", "-", "+"];
  const operatorHandler = (firstOperand, button) => {
    if (firstOperand && !secondOperand) {
      setOperator(button);
    }
    setIsFirstOperandCurrent(false);
    setIsSecondOperandCurrent(true);
  };

  const keydownOperatorHandler = (e) => {
    for (let i = 0; i < operateButtons.length; i++) {
      if (operateButtons[i] === e.key) {
        const operateButton = document.querySelector(`.operate-button_${i}`);
        operateButton.classList.add("active");
        setTimeout(() => operateButton.classList.remove("active"), 50);
        if (firstOperand && !secondOperand) {
          setOperator(e.key);
        }
        setIsFirstOperandCurrent(false);
        setIsSecondOperandCurrent(true);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keydownOperatorHandler);
    return () =>
      document.body.removeEventListener("keydown", keydownOperatorHandler);
  });

  return operateButtons.map((button, index) => (
    <button
      onClick={() => operatorHandler(firstOperand, button)}
      key={index}
      className={`calculator__operate-button operate-button_${index} calculator_button`}
    >
      {button}
    </button>
  ));
}

export default OperateButtons;
