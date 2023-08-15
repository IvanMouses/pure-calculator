import "./Calculator.css";
import { useEffect, useRef, useState } from "react";
import { BsBackspace } from "react-icons/bs";
import NumberButtons from "./buttons/NumberButtons";
import OperateButtons from "./buttons/OperateButtons";
import SubmitButtons from "./buttons/SubmitButtons";

function Calculator() {
  const [isFirstOperandCurrent, setIsFirstOperandCurrent] = useState(false);
  const [isSecondOperandCurrent, setIsSecondOperandCurrent] = useState(false);
  let [firstOperand, setFirstOperand] = useState("");
  const [operator, setOperator] = useState("");
  let [secondOperand, setSecondOperand] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState("0");
  let results = useRef([]);

  const clearOperandHandler = () => {
    if (firstOperand && isFirstOperandCurrent)
      firstOperand = firstOperand.slice(0, -1);
    setFirstOperand(firstOperand);
    if (secondOperand && isSecondOperandCurrent)
      secondOperand = secondOperand.slice(0, -1);
    setSecondOperand(secondOperand);
  };

  const keydownClearOperandHandler = (e) => {
    if (e.key === "Backspace") {
      const backspaceButton = document.querySelector(
        ".calculator__clear-button_backspace"
      );
      backspaceButton.classList.add("active");
      setTimeout(() => backspaceButton.classList.remove("active"), 50);
      if (firstOperand && isFirstOperandCurrent)
        firstOperand = firstOperand.slice(0, -1);
      setFirstOperand(firstOperand);
      if (secondOperand && isSecondOperandCurrent)
        secondOperand = secondOperand.slice(0, -1);
      setSecondOperand(secondOperand);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keydownClearOperandHandler);
    return () =>
      document.body.removeEventListener("keydown", keydownClearOperandHandler);
  });

  const clearButtonHandler = function () {
    setFirstOperand("");
    setOperator("");
    setSecondOperand("");
    setIsFirstOperandCurrent(false);
    setIsSecondOperandCurrent(false);
    setResult("0");
    results.current = [];
  };

  const keydownClearButtonHandler = (e) => {
    if (e.key === "Escape") {
      const resetButton = document.querySelector(
        ".calculator__clear-button_reset"
      );
      resetButton.classList.add("active");
      setTimeout(() => resetButton.classList.remove("active"), 50);
      setFirstOperand("");
      setOperator("");
      setSecondOperand("");
      setIsFirstOperandCurrent(false);
      setIsSecondOperandCurrent(false);
      setResult("0");
      results.current = [];
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", keydownClearButtonHandler);
    return () =>
      document.body.removeEventListener("keydown", keydownClearButtonHandler);
  });

  useEffect(() => {
    const clearInterface = function () {
      if (isSubmit) {
        setIsFirstOperandCurrent(false);
        setFirstOperand("");
        setOperator("");
        setIsSecondOperandCurrent(false);
        setSecondOperand("");
        setIsSubmit(false);
        results.current.unshift(result);
        if (isNaN(result)) {
          results.current.shift();
          results.current.unshift("Результат не определен");
          setResult("Результат не определен");
        }
        if (result === "Infinity") {
          results.current.shift();
          results.current.unshift("Деление на 0 запрещено");
          setResult("Деление на 0 запрещено");
        }
      }
    };
    clearInterface();
  }, [isSubmit, result, results]);

  return (
    <div className="calculator calculator_container">
      <div className="calculator__body">
        <div className="calculator__prev-results">
          {results.current.map((result, index) => (
            <div key={index} className="prev-result">
              {result}
            </div>
          ))}
        </div>
        <div className="calculator__operands">
          <div
            style={
              operator ? { marginRight: 0 + "px" } : { marginRight: -10 + "px" }
            }
            className="calculator__operands-top"
          >
            <div className="calculator__first-operand">{firstOperand}</div>
            <div className="calculator__operator">{operator}</div>
          </div>
          <div className="calculator__operands-bottom">
            <div className="calculator__second-operand">{secondOperand}</div>
          </div>
        </div>
        <div
          className={`calculator__result ${result.length >= 16 && "adaptive"}`}
        >
          {result}
        </div>
        <div className="calculator__operations">
          <div className="calculator__clear-buttons">
            <button
              onClick={clearButtonHandler}
              className="calculator__clear-button calculator__clear-button_reset calculator_button"
            >
              C
            </button>
            <button
              onClick={() => clearOperandHandler()}
              className="calculator__clear-button calculator__clear-button_backspace calculator_button"
            >
              <BsBackspace />
            </button>
          </div>
          <div className="calculator__main-buttons">
            <div className="calculator__number-buttons">
              <NumberButtons
                setIsFirstOperandCurrent={setIsFirstOperandCurrent}
                firstOperand={firstOperand}
                setFirstOperand={setFirstOperand}
                secondOperand={secondOperand}
                setIsSecondOperandCurrent={setIsSecondOperandCurrent}
                setSecondOperand={setSecondOperand}
                operator={operator}
                isSubmit={isSubmit}
              />
            </div>
            <div className="calculator__operate-buttons">
              <OperateButtons
                setIsFirstOperandCurrent={setIsFirstOperandCurrent}
                firstOperand={firstOperand}
                setOperator={setOperator}
                secondOperand={secondOperand}
                setIsSecondOperandCurrent={setIsSecondOperandCurrent}
              />
            </div>
            <SubmitButtons
              firstOperand={firstOperand}
              secondOperand={secondOperand}
              operator={operator}
              setResult={setResult}
              setIsSubmit={setIsSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
