import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f8f8f8;
    --primary: #0b87a3;
    --white: #fff;
    --lightGray: #a8a8b3;
    --gray: #737380;
    --darkGray: #29292e;
    --red: #ea4335;
    --link: #00caff;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    color: var(--darkGray);
  }

  body,
  input,
  textarea,
  button {
    font: 400 16px "Poppins", sans-serif;
  }
`;
