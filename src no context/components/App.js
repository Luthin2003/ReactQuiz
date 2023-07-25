import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const sec_per_ques = 30;

const initialstate = {
  questions: [],
  points: 0,
  //lading error,finish,active,ready
  status: "loading",
  answer: null,
  index: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "datarecived":
      // console.log(action.payload);
      return { ...state, questions: action.payload, status: "ready", index: 0 };

    case "datafailed":
      return { ...state, status: "error" };

    case "start":
      // console.log(state.questions);
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * sec_per_ques,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialstate,
        highscore: state.highscore,
        status: "ready",
        questions: state.questions,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("action unknown");
  }
}

export default function App() {
  const [
    { secondsRemaining, highscore, questions, status, index, answer, points },
    dispatch,
  ] = useReducer(reducer, initialstate);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "datarecived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <Progress
          answer={answer}
          index={index}
          numQuestions={numQuestions}
          points={points}
          maxPossiblePoints={maxPossiblePoints}
        />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
