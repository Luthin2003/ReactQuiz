function StartScreen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>welcome to React Quiz!</h2>
      <h3>{numQuestion} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
