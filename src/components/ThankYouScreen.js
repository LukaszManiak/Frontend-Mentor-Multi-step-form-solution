import thankYouIcon from "../assets/images/icon-thank-you.svg";

export default function ThankYou() {
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
