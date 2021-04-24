import React from "react";
import "tailwindcss/tailwind.css";
import { Theme } from "@components/theme-toggle";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
