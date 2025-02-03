import { useEffect, useState, useRef } from "react";
import { data } from "../../assets/data.js";
import "./Quiz.css";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionList = [option1, option2, option3, option4];

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const checkAnswer = (e, answer) => {
    if (!disabled) {
      if (answer === question.answer) {
        e.target.classList.add("correct");
        setDisabled(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setDisabled(true);
        optionList[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const handleNextClick = () => {
    if (disabled) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }

      setIndex((prev) => prev + 1);
      setDisabled(false);
      optionList.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      });
    }
  };

  const handleResetClick = () => {
    setIndex(0);
    setQuestion(data[index]);
    setDisabled(false);
    setScore(0);
    setResult(false);
  };

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={handleNextClick}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            You scored {score} out of {data.length}
          </h2>
          <button onClick={handleResetClick}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
