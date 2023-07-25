import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, index, numQuestion } = useQuiz();
  if (answer === null) return null;

  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index >= numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finished
      </button>
    );
}

export default NextButton;
