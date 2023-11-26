import { useState } from "react";
import "./index.css";
function App() {
  const [curStep, setCurStep] = useState(1);

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
      <StepsList curStep={curStep} />
      <Steps
        curStep={curStep}
        onGoNext={handleNextStep}
        onGoBack={handleBackStep}
      />
    </div>
  );
}

function StepsList() {
  return (
    <div className="steps-list">
      <ul>
        <li>
          {" "}
          <div>1</div>{" "}
          <div>
            <p>Step 1</p>
            <p>Your info Step</p>
          </div>{" "}
        </li>
        <li>
          {" "}
          <div>2</div>{" "}
          <div>
            <p>Step 2</p>
            <p>Select plan</p>
          </div>{" "}
        </li>
        <li>
          {" "}
          <div>3</div>{" "}
          <div>
            <p>Step 3</p>
            <p>Add-ons Step</p>
          </div>{" "}
        </li>
        <li>
          {" "}
          <div>4</div>{" "}
          <div>
            <p>Step 4</p>
            <p>Summary</p>
          </div>{" "}
        </li>
      </ul>
    </div>
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
  return (
    <div>
      <h1>Personal info</h1>
      <p>Please provide your name, email address, and phone number.</p>

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="" placeholder="e.g. Stephen King" />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="text"
          name=""
          placeholder="e.g. stephenking@lorem.com"
        />
        <label htmlFor="number">Phone Number</label>
        <input
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
  return (
    <div>
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>

      <div>
        <div>
          <img src="" alt="" />

          <p>Arcade</p>
          <p>$9/mo</p>
        </div>
        <div>
          <img src="" alt="" />

          <p>Advanced</p>
          <p>$12/mo</p>
        </div>
        <div>
          <img src="" alt="" />

          <p>Pro</p>
          <p>$15/mo</p>
        </div>
      </div>

      <div>
        <p>Monthly</p>
        <Button>switch</Button>
        <p>Yearly</p>
      </div>
    </div>
  );
}

function PickAddOns() {
  return (
    <div>
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>

      <div>
        <div>
          <input type="checkbox" name="scales" />
          <div>
            <p>Online service</p>
            <p>Access to multiplayer games</p>
          </div>
          <p>+$1/mo</p>
        </div>
        <div>
          <input type="checkbox" name="scales" />
          <div>
            <p>Larger storage</p>
            <p>Extra 1TB of cloud save</p>
          </div>
          <p>+$2/mo</p>
        </div>
        <div>
          <input type="checkbox" name="scales" />
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
    <div>
      <img src="" alt="" />
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
    <div className="buttons">
      {curStep > 1 && curStep < 5 && (
        <Button onClick={onGoBack}>Go Back</Button>
      )}
      {curStep <= 3 && <Button onClick={onGoNext}>Next</Button>}
      {curStep === 4 && <Button onClick={onGoNext}>Confirm</Button>}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={() => onClick()}>{children}</button>;
}

// Challenge by Frontend Mentor. Coded by Your Name Here.

export default App;
