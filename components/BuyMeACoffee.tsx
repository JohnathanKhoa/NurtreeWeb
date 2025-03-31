import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({ preload: false });

export default function BuyMeACoffee() {
  return (
    <a
      href="https://buymeacoffee.com/jkn95"
      target="_blank"
      className="flex gap-2"
    >
      <div className={fontFamily.className}>Buy me a coffee?</div> ☕
    </a>
  );
}
