// Buttons component
export default function Buttons({ curStep, dispatch, mobileView }) {
  let stepClassName = curStep !== 1 ? "buttons" : "buttons-step-1";
  let mobileClassName = mobileView ? " " : "mobile-buttons ";
  return (
    <div className={`${stepClassName} ${mobileClassName}`}>
      {curStep > 1 && curStep < 5 && (
        <button
          className={"back-button"}
          onClick={() => dispatch({ type: "backStepChange" })}
        >
          Go Back
        </button>
      )}
      {curStep <= 3 && (
        <button
          className={"next-button"}
          onClick={() => dispatch({ type: "nextStepChange" })}
        >
          Next
        </button>
      )}
      {curStep === 4 && (
        <button
          className={"confirm-button"}
          onClick={() => dispatch({ type: "nextStepChange" })}
        >
          Confirm
        </button>
      )}
    </div>
  );
}
