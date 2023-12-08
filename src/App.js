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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  console.log(name, email, phoneNumber);

  const [plan, setPlan] = useState("Arcade");

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

  function handlePlanSelect(value) {
    const selectedPlan = value;
    setPlan(selectedPlan);
  }

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
    <>
      <div className="app">
        <StepsList curStep={curStep} onCustomStep={handleCustomStep} />
        <Steps
          onlineSelected={onlineSelected}
          customSelected={customSelected}
          storageSelected={storageSelected}
          onCustomSelect={handleCustomSelect}
          onStorageSelect={handleStorageSelect}
          onOnlineSelect={handleOnlineSelect}
          plan={plan}
          onSelectPlan={handlePlanSelect}
          email={email}
          name={name}
          phoneNumber={phoneNumber}
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          onEmailChange={handleEmailChange}
          curStep={curStep}
          onGoNext={handleNextStep}
          onGoBack={handleBackStep}
          onCustomStep={handleCustomStep}
        />
      </div>
      <AttributionP />
    </>
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

function Steps({
  curStep,
  onGoNext,
  onGoBack,
  onCustomStep,
  name,
  email,
  phoneNumber,
  onEmailChange,
  onNameChange,
  onNumberChange,
  onSelectPlan,
  plan,
  onlineSelected,
  onOnlineSelect,
  storageSelected,
  onStorageSelect,
  customSelected,
  onCustomSelect,
}) {
  return (
    <div className="steps">
      {curStep === 1 && (
        <PersonalInfo
          email={email}
          name={name}
          phoneNumber={phoneNumber}
          onNameChange={onNameChange}
          onNumberChange={onNumberChange}
          onEmailChange={onEmailChange}
        />
      )}
      {curStep === 2 && <SelectPlan onSelectPlan={onSelectPlan} plan={plan} />}
      {curStep === 3 && (
        <PickAddOns
          onlineSelected={onlineSelected}
          onOnlineSelect={onOnlineSelect}
          storageSelected={storageSelected}
          onStorageSelect={onStorageSelect}
          customSelected={customSelected}
          onCustomSelect={onCustomSelect}
        />
      )}
      {curStep === 4 && <FinishingStep onCustomStep={onCustomStep} />}
      {curStep === 5 && <ThankYou />}
      <Buttons curStep={curStep} onGoNext={onGoNext} onGoBack={onGoBack} />
    </div>
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
function SelectPlan({ plan, onSelectPlan }) {
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
        </div>
        <div
          onClick={() => onSelectPlan("Advanced")}
          className={plan !== "Advanced" ? "plan" : "plan-selected"}
        >
          <img src={advancedIcon} alt="" />

          <p>Advanced</p>
          <p>$12/mo</p>
        </div>
        <div
          onClick={() => onSelectPlan("Pro")}
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

function FinishingStep({ curStep, onCustomStep }) {
  return (
    <div className="finishing-step">
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>
      <div className="sum-up-container">
        <div className="selected-plan-container">
          <div>
            <p>Arcade (Monthly)</p>
            <button onClick={() => onCustomStep(2)}>Change</button>
          </div>
          <p>$9/mo</p>
        </div>

        <div className="selected-add-on">
          <p>Online service</p>
          <p>+$1/mo</p>
        </div>
        <div className="selected-add-on">
          <p>Larger storage</p>
          <p>+$2/mo</p>
        </div>
      </div>
      <div className="total-sum-up">
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

function AttributionP() {
  return (
    <p className="attribution-p">
      Challenge by{" "}
      <a
        className="attribution-link"
        href="https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className="attribution-link"
        href="https://github.com/LukaszManiak"
        role="button"
      >
        Łukasz Maniak
      </a>
      .
    </p>
  );
}

export default App;
