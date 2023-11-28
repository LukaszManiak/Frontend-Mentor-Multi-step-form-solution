import { useState } from "react";
import "./index.css";

// images

// icons
import thankYouIcon from "./assets/images/icon-thank-you.svg";
import advancedIcon from "./assets/images/icon-advanced.svg";
import arcadeIcon from "./assets/images/icon-arcade.svg";
import checkmarkIcon from "./assets/images/icon-checkmark.svg";
import proIcon from "./assets/images/icon-pro.svg";

// bg
import sideBarBgDesktop from "./assets/images/bg-sidebar-desktop.svg";
import sideBarBgMobile from "./assets/images/bg-sidebar-mobile.svg";

function App() {
  const [curStep, setCurStep] = useState(1);

  function handleCustomStep(num) {
    setCurStep(num);
  }

  function handleNextStep() {
    if (curStep >= 5) return;
    setCurStep((s) => s + 1);
  }
  function handleBackStep() {
    if (curStep <= 1) return;
    setCurStep((s) => s - 1);
  }

  console.log(curStep);
  return (
    <div className="app">
      <StepsList curStep={curStep} onCustomStep={handleCustomStep} />
      <Steps
        curStep={curStep}
        onGoNext={handleNextStep}
        onGoBack={handleBackStep}
      />
    </div>
  );
}

function StepsList({ curStep, onCustomStep }) {
  return (
    <ul className="steps-list">
      <li onClick={() => onCustomStep(1)}>
        {" "}
        <div className={curStep === 1 ? "step-number-selected" : "step-number"}>
          1
        </div>{" "}
        <div>
          <p>Step 1</p>
          <p>Your info Step</p>
        </div>{" "}
      </li>
      <li onClick={() => onCustomStep(2)}>
        {" "}
        <div className={curStep === 2 ? "step-number-selected" : "step-number"}>
          2
        </div>{" "}
        <div>
          <p>Step 2</p>
          <p>Select plan</p>
        </div>{" "}
      </li>
      <li onClick={() => onCustomStep(3)}>
        {" "}
        <div className={curStep === 3 ? "step-number-selected" : "step-number"}>
          3
        </div>{" "}
        <div>
          <p>Step 3</p>
          <p>Add-ons Step</p>
        </div>{" "}
      </li>
      <li onClick={() => onCustomStep(4)}>
        {" "}
        <div className={curStep >= 4 ? "step-number-selected" : "step-number"}>
          4
        </div>{" "}
        <div>
          <p>Step 4</p>
          <p>Summary</p>
        </div>{" "}
      </li>
    </ul>
  );
}

function Steps({ curStep, onGoNext, onGoBack }) {
  return (
    <div className="steps">
      <Step curStep={curStep} />
      <Buttons curStep={curStep} onGoNext={onGoNext} onGoBack={onGoBack} />
    </div>
  );
}

function Step({ curStep }) {
  return (
    <>
      {curStep === 1 && <PersonalInfo />}
      {curStep === 2 && <SelectPlan />}
      {curStep === 3 && <PickAddOns />}
      {curStep === 4 && <FinishingStep />}
      {curStep === 5 && <ThankYou />}
    </>
  );
}

// specific steps components
function PersonalInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  console.log(name, email, phoneNumber);

  function handleNameChange(e) {
    e.preventDefault();
    const nameInput = e.target.value;
    setName(nameInput);
  }
  function handleEmailChange(e) {
    e.preventDefault();
    const emailInput = e.target.value;
    setEmail(emailInput);
  }
  function handleNumberChange(e) {
    e.preventDefault();
    const numberInput = +e.target.value;
    setPhoneNumber(numberInput);
  }

  return (
    <div className="">
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>

      <div className="personal-inputs">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => handleNameChange(e)}
          id="name"
          type="text"
          name=""
          placeholder="e.g. Stephen King"
        />
        <label htmlFor="email">Email Address</label>
        <input
          value={email}
          onChange={(e) => handleEmailChange(e)}
          id="email"
          type="text"
          name=""
          placeholder="e.g. stephenking@lorem.com"
        />
        <label htmlFor="number">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => handleNumberChange(e)}
          id="number"
          type="number"
          name=""
          placeholder=" e.g. +1 234 567 890"
        />
      </div>
    </div>
  );
}
function SelectPlan() {
  const [plan, setPlan] = useState("Arcade");

  function handlePlanSelect(value) {
    const selectedPlan = value;
    setPlan(selectedPlan);
  }

  return (
    <div className="select-plan-step">
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>

      <div className="plans-container">
        <div
          onClick={() => handlePlanSelect("Arcade")}
          className={plan !== "Arcade" ? "plan" : "plan-selected"}
        >
          <img src={arcadeIcon} alt="" />

          <p>Arcade</p>
          <p>$9/mo</p>
        </div>
        <div
          onClick={() => handlePlanSelect("Advanced")}
          className={plan !== "Advanced" ? "plan" : "plan-selected"}
        >
          <img src={advancedIcon} alt="" />

          <p>Advanced</p>
          <p>$12/mo</p>
        </div>
        <div
          onClick={() => handlePlanSelect("Pro")}
          className={plan !== "Pro" ? "plan" : "plan-selected"}
        >
          <img src={proIcon} alt="" />

          <p>Pro</p>
          <p>$15/mo</p>
        </div>
      </div>

      <div className="period-select-container">
        <p>Monthly</p>
        <Button>switch</Button>
        <p>Yearly</p>
      </div>
    </div>
  );
}

function PickAddOns() {
  const [onlineSelected, setOnlineSelected] = useState(false);
  const [storageSelected, setStorageSelected] = useState(false);
  const [customSelected, setCustomSelected] = useState(false);

  function handleOnlineSelect() {
    setOnlineSelected(!onlineSelected);
  }
  function handleStorageSelect() {
    setStorageSelected(!storageSelected);
  }
  function handleCustomSelect() {
    setCustomSelected(!customSelected);
  }

  return (
    <div className="add-ons-step">
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>

      <div className="add-ons-container">
        <div
          onClick={() => handleOnlineSelect()}
          className={!onlineSelected ? "add-on" : "add-on-selected"}
        >
          <input type="checkbox" name="scales" checked={onlineSelected} />
          <div>
            <p>Online service</p>
            <p>Access to multiplayer games</p>
          </div>
          <p>+$1/mo</p>
        </div>
        <div
          onClick={() => handleStorageSelect()}
          className={!storageSelected ? "add-on" : "add-on-selected"}
        >
          <input type="checkbox" name="scales" checked={storageSelected} />
          <div>
            <p>Larger storage</p>
            <p>Extra 1TB of cloud save</p>
          </div>
          <p>+$2/mo</p>
        </div>
        <div
          onClick={() => handleCustomSelect()}
          className={!customSelected ? "add-on" : "add-on-selected"}
        >
          <input type="checkbox" name="scales" checked={customSelected} />
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

function FinishingStep() {
  return (
    <div>
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>
      <div></div>
      <div>
        <p>Total (per month/year)</p> <p>+$12/mo</p>
      </div>
    </div>
  );
}

function ThankYou() {
  return (
    <div className="thank-you-step">
      <img src={thankYouIcon} alt="" />
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

// Buttons components
function Buttons({ curStep, onGoNext, onGoBack }) {
  return (
    <div className={curStep !== 1 ? "buttons" : "buttons-step-1"}>
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

function Button({ children, onClick, className }) {
  return (
    <button className={className} onClick={() => onClick()}>
      {children}
    </button>
  );
}

// Challenge by Frontend Mentor. Coded by Your Name Here.

export default App;
