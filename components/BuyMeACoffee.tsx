import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans();

export default function BuyMeACoffee() {
  return (
    <a href="https://buymeacoffee.com/jkn95" className="flex gap-2">
      <div className={fontFamily.className}>Buy me a coffee?</div> ☕
    </a>
  );
}
