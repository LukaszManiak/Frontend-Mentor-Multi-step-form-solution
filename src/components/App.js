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
import Buttons from "./Buttons";

import ThankYou from "./ThankYouScreen";

const initialState = {
  name: "",
  email: "",
  phoneNumber: 0,
  plan: "Arcade",
  onlineSelected: false,
  storageSelected: false,
  customSelected: false,

  totalCost: 0,
  arcadeCost: 9,
  advancedCost: 12,
  proCost: 15,

  onlineCost: 1,
  storageCost: 2,
  customCost: 2,

  curStep: 1,
  period: "Monthly",
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
      if (state.curStep >= 5) return state;
      return {
        ...state,
        curStep: state.curStep + 1,
      };
    case "backStepChange":
      if (state.curStep <= 1) return state;
      return {
        ...state,
        curStep: state.curStep - 1,
      };
    case "periodToggle":
      return {
        ...state,
        period: state.period === "Monthly" ? "Yearly" : "Monthly",
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
      totalCost,
      arcadeCost,
      advancedCost,
      proCost,
      onlineCost,
      storageCost,
      customCost,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(period, proCost, advancedCost, arcadeCost);
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

  return (
    <>
      {/* navigate buttons on mobile view */}
      {!mobileView && (
        <StepsList
          curStep={curStep}
          mobileView={mobileView}
          dispatch={dispatch}
        />
      )}
      <div className="app">
        {/* navigate buttons on desktop view */}
        {mobileView && (
          <StepsList
            curStep={curStep}
            mobileView={mobileView}
            dispatch={dispatch}
          />
        )}
        <Steps>
          {/* personal information inputs */}
          {curStep === 1 && (
            <PersonalInfo
              email={email}
              name={name}
              phoneNumber={phoneNumber}
              dispatch={dispatch}
            />
          )}
          {/* select plan step */}
          {curStep === 2 && (
            <SelectPlan
              plan={plan}
              period={period}
              dispatch={dispatch}
              arcadeCost={arcadeCost}
              advancedCost={advancedCost}
              proCost={proCost}
            />
          )}
          {/* pick add-ons */}
          {curStep === 3 && (
            <PickAddOns
              onlineSelected={onlineSelected}
              storageSelected={storageSelected}
              customSelected={customSelected}
              dispatch={dispatch}
            />
          )}
          {/* confirmation step */}
          {curStep === 4 && (
            <FinishingStep
              plan={plan}
              onlineSelected={onlineSelected}
              customSelected={customSelected}
              storageSelected={storageSelected}
              period={period}
              dispatch={dispatch}
            />
          )}
          {/* thank you step */}
          {curStep === 5 && <ThankYou />}
          {/* next/prev buttons on desktop view */}
          {mobileView && (
            <Buttons
              dispatch={dispatch}
              curStep={curStep}
              mobileView={mobileView}
            />
          )}
        </Steps>
      </div>

      {/* next/prev buttons on mobile view */}
      {!mobileView && (
        <Buttons
          dispatch={dispatch}
          curStep={curStep}
          mobileView={mobileView}
        />
      )}
      <AttributionP />
    </>
  );
}

function StepsList({ curStep, dispatch, mobileView }) {
  return (
    <ul className="steps-list">
      <li onClick={() => dispatch({ type: "customStepChange", payload: 1 })}>
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
      <li onClick={() => dispatch({ type: "customStepChange", payload: 2 })}>
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
      <li onClick={() => dispatch({ type: "customStepChange", payload: 3 })}>
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
      <li onClick={() => dispatch({ type: "customStepChange", payload: 4 })}>
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
function PersonalInfo({ name, dispatch, email, phoneNumber }) {
  return (
    <div className="">
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>

      <div className="personal-inputs">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) =>
            dispatch({ type: "nameChange", payload: e.target.value })
          }
          id="name"
          type="text"
          name=""
          placeholder="e.g. Stephen King"
        />
        <label htmlFor="email">Email Address</label>
        <input
          value={email}
          onChange={(e) =>
            dispatch({ type: "emailChange", payload: e.target.value })
          }
          id="email"
          type="text"
          name=""
          placeholder="e.g. stephenking@lorem.com"
        />
        <label htmlFor="number">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) =>
            dispatch({ type: "numberChange", payload: e.target.value })
          }
          id="number"
          type="number"
          name=""
          placeholder=" e.g. +1 234 567 890"
        />
      </div>
    </div>
  );
}
function SelectPlan({
  plan,
  dispatch,
  period,
  arcadeCost,
  advancedCost,
  proCost,
}) {
  return (
    <div className="select-plan-step">
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>

      <div className="plans-container">
        <div
          onClick={() => dispatch({ type: "planSelection", payload: "Arcade" })}
          className={plan !== "Arcade" ? "plan" : "plan-selected"}
        >
          <img src={arcadeIcon} alt="" />

          <p>Arcade</p>
          <p>${arcadeCost}/mo</p>
          {period === "Yearly" && <p>2 months for free</p>}
        </div>
        <div
          onClick={() =>
            dispatch({ type: "planSelection", payload: "Advanced" })
          }
          className={plan !== "Advanced" ? "plan" : "plan-selected"}
        >
          <img src={advancedIcon} alt="" />

          <p>Advanced</p>
          <p>${advancedCost}/mo</p>
          {period === "Yearly" && <p>2 months for free</p>}
        </div>
        <div
          onClick={() => dispatch({ type: "planSelection", payload: "Pro" })}
          className={plan !== "Pro" ? "plan" : "plan-selected"}
        >
          <img src={proIcon} alt="" />

          <p>Pro</p>
          <p>${proCost}/mo</p>
          {period === "Yearly" && <p>2 months for free</p>}
        </div>
      </div>

      <div className="period-select-container">
        {period === "Monthly" ? <b>Monthly</b> : <p>Monthly</p>}
        <button onClick={() => dispatch({ type: "periodToggle" })}>
          switch
        </button>
        {period === "Yearly" ? <b>Yearly</b> : <p>Yearly</p>}
      </div>
    </div>
  );
}

function PickAddOns({
  dispatch,
  onlineSelected,
  storageSelected,
  customSelected,
}) {
  return (
    <div className="add-ons-step">
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>

      <div className="add-ons-container">
        <div
          onClick={() => dispatch({ type: "onlineSelection" })}
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
          onClick={() => dispatch({ type: "storageSelection" })}
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
          onClick={() => dispatch({ type: "customSelection" })}
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
  dispatch,
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
            <button
              onClick={() => dispatch({ type: "customStepChange", payload: 2 })}
            >
              Change
            </button>
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
        <p>Total (per {period.toLowerCase().slice(0, -2)})</p> <p>+$12/mo</p>
      </div>
    </div>
  );
}

export default App;
