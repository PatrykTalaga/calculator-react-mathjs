import { evaluate } from "mathjs";
import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [resultStatus, setResultStatus] = useState(true);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  function handleNumber(num: string) {
    if (resultStatus === true) {
      setDisplay(num);
      setResult("");
      setResultStatus(false);
      return;
    }
    setDisplay(display + num);
    setResultStatus(false);
  }

  function handleOperand(operand: string) {
    if (result === "Syntax Error") return;
    if (resultStatus === true) {
      setDisplay(result + operand);
      setResult("");
      setResultStatus(false);
      return;
    }
    setDisplay(display + operand);
  }

  function handleCalculate() {
    setResultStatus(true);
    try {
      const result = evaluate(display).toString();
      setResult(result);
      setHistory([...history, `${display} = ${result}`]);
    } catch (err) {
      console.error(err);
      setResult("Syntax Error");
    }
  }

  function handleClear() {
    setDisplay("");
    setResult("");
  }
  function handleClearHistory() {
    setHistory([]);
  }

  function handleDelete() {
    setDisplay(display.slice(0, -1));
  }

  function handleHistory() {
    const sideContainer = document.getElementById("side-container");
    const mainContainer = document.getElementById("main-container");
    if (
      sideContainer &&
      mainContainer &&
      sideContainer.style.display !== "flex"
    ) {
      sideContainer.style.display = "flex";
      // Check for the user's color-scheme preference
      const prefersLightTheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

      // Add the light-theme class if the user prefers a light theme
      if (prefersLightTheme) {
        mainContainer.style.borderRight = "2px solid hsla(0, 0%, 7%, 0.986)";
        return;
      }
      mainContainer.style.borderRight = "2px solid white";
      return;
    }
    if (sideContainer && mainContainer) {
      sideContainer.style.display = "none";
      mainContainer.style.borderRight = "none";
    }
  }
  function handeHiddenBtns() {
    const btnContainer = document.getElementById("hidden-buttons");
    if (btnContainer && btnContainer.style.display !== "grid") {
      btnContainer.style.display = "grid";
      return;
    }
    if (btnContainer) {
      btnContainer.style.display = "none";
    }
  }

  return (
    <div className="calculator">
      <div className="main-container" id="main-container">
        <div className="display">
          <textarea
            rows={1}
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
          ></textarea>
          <p>= {result}</p>
        </div>

        <section className="buttons hidden-buttons" id="hidden-buttons">
          {/* row 1 */}
          <button onClick={() => handleOperand("^2")}>x^2</button>
          <button onClick={() => handleOperand("sqrt(2)")}>x√2</button>
          <button onClick={() => handleOperand("^")}>^</button>
          <button onClick={() => handleOperand("log(")}>log</button>
          {/* row 1 */}

          <button onClick={() => handleOperand("sqrt(")}>√</button>
          <button onClick={() => handleOperand("!")}>!</button>
          <button onClick={() => handleOperand("sin(")}>sin</button>
          <button onClick={() => handleOperand("cos(")}>cos</button>

          {/* row 1 */}
          <button onClick={() => handleOperand("tan(")}>tan</button>
          <button onClick={() => handleOperand("atan(")}>atan</button>
          <button onClick={() => handleOperand("(")}>(</button>
          <button onClick={() => handleOperand(")")}>)</button>
        </section>

        <section className="buttons">
          {/* row 1 */}
          <button onClick={() => handeHiddenBtns()}>
            <span className="material-symbols-outlined">
              unfold_more_double
            </span>
          </button>
          <button onClick={() => handleClear()}>
            <span className="material-symbols-outlined">
              cancel_presentation
            </span>
          </button>
          <button onClick={() => handleDelete()}>
            <span className="material-symbols-outlined">backspace</span>
          </button>
          <button onClick={() => handleHistory()}>H</button>
          {/* row 2 */}
          <button onClick={() => handleNumber("7")}>7</button>
          <button onClick={() => handleNumber("8")}>8</button>
          <button onClick={() => handleNumber("9")}>9</button>
          <button onClick={() => handleOperand("/")}>/</button>
          {/* row 3 */}
          <button onClick={() => handleNumber("4")}>4</button>
          <button onClick={() => handleNumber("5")}>5</button>
          <button onClick={() => handleNumber("6")}>6</button>
          <button onClick={() => handleOperand("*")}>*</button>
          {/* row 4 */}
          <button onClick={() => handleNumber("1")}>1</button>
          <button onClick={() => handleNumber("2")}>2</button>
          <button onClick={() => handleNumber("3")}>3</button>
          <button onClick={() => handleOperand("-")}>-</button>
          {/* row 5 */}
          <button onClick={() => handleNumber("0")}>0</button>
          <button>,</button>
          <button onClick={() => handleCalculate()}>=</button>
          <button onClick={() => handleOperand("+")}>+</button>
        </section>
      </div>
      <div className="side-container" id="side-container">
        <button className="danger-button" onClick={() => handleClearHistory()}>
          Clear History
        </button>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
