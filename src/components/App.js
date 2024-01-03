import { useState, useEffect, useReducer } from "react";
import "../index.css";

// images

// icons

import advancedIcon from "../assets/images/icon-advanced.svg";
import arcadeIcon from "../assets/images/icon-arcade.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";
import proIcon from "../assets/images/icon-pro.svg";

// bg
import sideBarBgDesktop from "../assets/images/bg-sidebar-desktop.svg";
import sideBarBgMobile from "../assets/images/bg-sidebar-mobile.svg";

// components
import Steps from "./Steps";
import AttributionP from "./AttributionP";
import Button from "./Button";
import ThankYou from "./ThankYouScreen";

const initialState = {
  name: "",
  email: "",
  phoneNumber: 0,
  plan: "Arcade",
  onlineSelected: false,
  storageSelected: false,
  customSelected: false,
  curStep: 1,
  period: "monthly",
};

function reducer(state, action) {
  switch (action.type) {
    case "onlineSelection":
      return {
        ...state,
        onlineSelected: !state.onlineSelected,
      };
    case "storageSelection":
      return {
        ...state,
        storageSelected: !state.storageSelected,
      };
    case "customSelection":
      return {
        ...state,
        customSelected: !state.customSelected,
      };
    case "planSelection":
      return {
        ...state,
        plan: action.payload,
      };
    case "nameChange":
      return {
        ...state,
        name: action.payload,
      };
    case "numberChange":
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case "emailChange":
      return {
        ...state,
        email: action.payload,
      };
    case "customStepChange":
      return {
        ...state,
        curStep: action.payload,
      };
    case "nextStepChange":
      return {
        ...state,
        curStep: state.curStep + 1,
      };
    case "backStepChange":
      return {
        ...state,
        curStep: state.curStep - 1,
      };
    case "periodToggle":
      return {
        ...state,
        period: state.period === "monthly" ? "yearly" : "monthly",
      };

    default:
      throw new Error("Unkown");
  }
}

function App() {
  const [mobileView, setMobileView] = useState(false);
  const [
    {
      name,
      email,
      phoneNumber,
      plan,
      onlineSelected,
      storageSelected,
      customSelected,
      curStep,
      period,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleOnlineSelect() {
    dispatch({ type: "onlineSelection" });
  }
  function handleStorageSelect() {
    dispatch({ type: "storageSelection" });
  }
  function handleCustomSelect() {
    dispatch({ type: "customSelection" });
  }

  function handlePlanSelect(value) {
    const selectedPlan = value;
    dispatch({ type: "planSelection", payload: selectedPlan });
  }

  function handleNameChange(e) {
    e.preventDefault();
    const nameInput = e.target.value;
    dispatch({ type: "nameChange", payload: nameInput });
  }
  function handleEmailChange(e) {
    e.preventDefault();
    const emailInput = e.target.value;
    dispatch({ type: "emailChange", payload: emailInput });
  }
  function handleNumberChange(e) {
    e.preventDefault();
    const numberInput = +e.target.value;
    dispatch({ type: "numberChange", payload: numberInput });
  }

  function handleCustomStep(num) {
    dispatch({ type: "customStepChange", payload: num });
  }

  function handleNextStep() {
    if (curStep >= 5) return;
    dispatch({ type: "nextStepChange" });
  }
  function handleBackStep() {
    if (curStep <= 1) return;
    dispatch({ type: "backStepChange" });
  }

  // handling screen size change
  useEffect(function () {
    function handleMobileView() {
      setMobileView(window.innerWidth > 668);
    }

    handleMobileView();

    window.addEventListener("resize", handleMobileView);

    // return () => {
    //   window.removeEventListener("resize", handleMobileView);
    // };
  }, []);

  console.log(mobileView);

  return (
    <>
      {!mobileView && (
        <StepsList
          curStep={curStep}
          onCustomStep={handleCustomStep}
          mobileView={mobileView}
        />
      )}
      <div className="app">
        {mobileView && (
          <StepsList
            curStep={curStep}
            onCustomStep={handleCustomStep}
            mobileView={mobileView}
          />
        )}
        <Steps>
          {curStep === 1 && (
            <PersonalInfo
              email={email}
              name={name}
              phoneNumber={phoneNumber}
              onNameChange={handleNameChange}
              onNumberChange={handleNumberChange}
              onEmailChange={handleEmailChange}
            />
          )}
          {curStep === 2 && (
            <SelectPlan
              onSelectPlan={handlePlanSelect}
              plan={plan}
              period={period}
              dispatch={dispatch}
            />
          )}
          {curStep === 3 && (
            <PickAddOns
              onlineSelected={onlineSelected}
              onOnlineSelect={handleOnlineSelect}
              storageSelected={storageSelected}
              onStorageSelect={handleStorageSelect}
              customSelected={customSelected}
              onCustomSelect={handleCustomSelect}
            />
          )}
          {curStep === 4 && (
            <FinishingStep
              plan={plan}
              onCustomStep={handleCustomSelect}
              onlineSelected={onlineSelected}
              customSelected={customSelected}
              storageSelected={storageSelected}
              period={period}
            />
          )}
          {curStep === 5 && <ThankYou />}
          {mobileView && (
            <Buttons
              curStep={curStep}
              onGoNext={handleNextStep}
              onGoBack={handleBackStep}
            />
          )}
        </Steps>
      </div>
      {!mobileView && (
        <Buttons
          curStep={curStep}
          onGoNext={handleNextStep}
          onGoBack={handleBackStep}
          mobileView={mobileView}
        />
      )}
      <AttributionP />
    </>
  );
}

function StepsList({ curStep, onCustomStep, mobileView }) {
  return (
    <ul className="steps-list">
      <li onClick={() => onCustomStep(1)}>
        {" "}
        <div className={curStep === 1 ? "step-number-selected" : "step-number"}>
          1
        </div>{" "}
        {mobileView && (
          <div>
            <p>Step 1</p>
            <p>Your info Step</p>
          </div>
        )}{" "}
      </li>
      <li onClick={() => onCustomStep(2)}>
        {" "}
        <div className={curStep === 2 ? "step-number-selected" : "step-number"}>
          2
        </div>{" "}
        {mobileView && (
          <div>
            <p>Step 2</p>
            <p>Select plan</p>
          </div>
        )}{" "}
      </li>
      <li onClick={() => onCustomStep(3)}>
        {" "}
        <div className={curStep === 3 ? "step-number-selected" : "step-number"}>
          3
        </div>{" "}
        {mobileView && (
          <div>
            <p>Step 3</p>
            <p>Add-ons Step</p>
          </div>
        )}{" "}
      </li>
      <li onClick={() => onCustomStep(4)}>
        {" "}
        <div className={curStep >= 4 ? "step-number-selected" : "step-number"}>
          4
        </div>{" "}
        {mobileView && (
          <div>
            <p>Step 4</p>
            <p>Summary</p>
          </div>
        )}{" "}
      </li>
    </ul>
  );
}

// specific steps components
function PersonalInfo({
  name,
  email,
  phoneNumber,
  onEmailChange,
  onNameChange,
  onNumberChange,
}) {
  return (
    <div className="">
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>

      <div className="personal-inputs">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => onNameChange(e)}
          id="name"
          type="text"
          name=""
          placeholder="e.g. Stephen King"
        />
        <label htmlFor="email">Email Address</label>
        <input
          value={email}
          onChange={(e) => onEmailChange(e)}
          id="email"
          type="text"
          name=""
          placeholder="e.g. stephenking@lorem.com"
        />
        <label htmlFor="number">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => onNumberChange(e)}
          id="number"
          type="number"
          name=""
          placeholder=" e.g. +1 234 567 890"
        />
      </div>
    </div>
  );
}
function SelectPlan({ plan, onSelectPlan, dispatch, period }) {
  return (
    <div className="select-plan-step">
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>

      <div className="plans-container">
        <div
          onClick={() => onSelectPlan("Arcade")}
          className={plan !== "Arcade" ? "plan" : "plan-selected"}
        >
          <img src={arcadeIcon} alt="" />

          <p>Arcade</p>
          <p>$9/mo</p>
          {period === "yearly" && <p>2 months for free</p>}
        </div>
        <div
          onClick={() => onSelectPlan("Advanced")}
          className={plan !== "Advanced" ? "plan" : "plan-selected"}
        >
          <img src={advancedIcon} alt="" />

          <p>Advanced</p>
          <p>$12/mo</p>
          {period === "yearly" && <p>2 months for free</p>}
        </div>
        <div
          onClick={() => onSelectPlan("Pro")}
          className={plan !== "Pro" ? "plan" : "plan-selected"}
        >
          <img src={proIcon} alt="" />

          <p>Pro</p>
          <p>$15/mo</p>
          {period === "yearly" && <p>2 months for free</p>}
        </div>
      </div>

      <div className="period-select-container">
        {period === "monthly" ? <b>Monthly</b> : <p>Monthly</p>}
        <Button onClick={() => dispatch({ type: "periodToggle" })}>
          switch
        </Button>
        {period === "yearly" ? <b>Yearly</b> : <p>Yearly</p>}
      </div>
    </div>
  );
}

function PickAddOns({
  onlineSelected,
  onOnlineSelect,
  storageSelected,
  onStorageSelect,
  customSelected,
  onCustomSelect,
}) {
  return (
    <div className="add-ons-step">
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>

      <div className="add-ons-container">
        <div
          onClick={() => onOnlineSelect()}
          className={!onlineSelected ? "add-on" : "add-on-selected"}
        >
          <div className={onlineSelected ? "checked" : "un-checked"}>
            <img src={checkmarkIcon} alt="checkboxImg" />
          </div>
          <div>
            <p>Online service</p>
            <p>Access to multiplayer games</p>
          </div>
          <p>+$1/mo</p>
        </div>
        <div
          onClick={() => onStorageSelect()}
          className={!storageSelected ? "add-on" : "add-on-selected"}
        >
          <div className={storageSelected ? "checked" : "un-checked"}>
            <img src={checkmarkIcon} alt="checkboxImg" />
          </div>
          <div>
            <p>Larger storage</p>
            <p>Extra 1TB of cloud save</p>
          </div>
          <p>+$2/mo</p>
        </div>
        <div
          onClick={() => onCustomSelect()}
          className={!customSelected ? "add-on" : "add-on-selected"}
        >
          <div className={customSelected ? "checked" : "un-checked"}>
            <img src={checkmarkIcon} alt="checkboxImg" />
          </div>
          <div>
            <p>Customizable Profile</p>
            <p>Custom theme on your profile</p>
          </div>
          <p>+$2/mo</p>
        </div>
      </div>
    </div>
  );
}

function FinishingStep({
  onlineSelected,
  storageSelected,
  customSelected,
  onCustomStep,
  plan,
  period,
}) {
  return (
    <div className="finishing-step">
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>
      <div className="sum-up-container">
        <div className="selected-plan-container">
          <div>
            <p>
              {plan} ({period})
            </p>
            <button onClick={() => onCustomStep(2)}>Change</button>
          </div>
          <p>$9/mo</p>
        </div>

        {onlineSelected && (
          <div className="selected-add-on">
            <p>Online service</p>
            <p>+$1/mo</p>
          </div>
        )}
        {storageSelected && (
          <div className="selected-add-on">
            <p>Larger storage</p>
            <p>+$2/mo</p>
          </div>
        )}
        {customSelected && (
          <div className="selected-add-on">
            <p>Custom services</p>
            <p>+$2/mo</p>
          </div>
        )}
      </div>
      <div className="total-sum-up">
        <p>Total (per {period.slice(0, -2)})</p> <p>+$12/mo</p>
      </div>
    </div>
  );
}

// Buttons components
function Buttons({ curStep, onGoNext, onGoBack, mobileView }) {
  // naprawić undefined/false -> true/false
  console.log(mobileView);
  let class1 = curStep !== 1 ? "buttons" : "buttons-step-1";
  let class2 = mobileView === undefined ? " " : "mobile-buttons ";
  return (
    <div className={`${class1} ${class2}`}>
      {curStep > 1 && curStep < 5 && (
        <Button className={"back-button"} onClick={onGoBack}>
          Go Back
        </Button>
      )}
      {curStep <= 3 && (
        <Button className={"next-button"} onClick={onGoNext}>
          Next
        </Button>
      )}
      {curStep === 4 && (
        <Button className={"confirm-button"} onClick={onGoNext}>
          Confirm
        </Button>
      )}
    </div>
  );
}

export default App;
