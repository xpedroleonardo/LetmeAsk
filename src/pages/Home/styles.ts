import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 4;

    background: var(--primary);
    color: var(--white);

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;

    img {
      max-width: 320px;
    }

    strong {
      font: 700 36px "Poppins", sans-serif;
      line-height: 42px;
      margin-top: 16px;
    }

    p {
      font-size: 24px;
      line-height: 32px;
      margin-top: 16px;
      color: var(--background);
    }
  }

  main {
    flex: 8;

    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  align-items: stretch;
  text-align: center;

  > img {
    align-self: center;
  }

  h2 {
    font-size: 24px;
    margin: 64px 0 24px;
    font-family: "Poppins", sans-serif;
  }

  form {
    input {
      height: 50px;
      border-radius: 8px;
      padding: 0 16px;
      background: var(--white);
      border: 1px solid var(--lightGray);
      outline: none;

      &:focus {
        box-shadow: 0 0 0 1px var(--primary);
      }
    }

    button {
      margin-top: 16px;
    }

    input,
    button {
      width: 100%;
    }
  }

  p {
    font-size: 14px;
    color: #737380;
    margin-top: 16px;
    width: 299px;

    a {
      color: var(--link);
    }
  }
`;

export const CreateRoom = styled.button`
  margin-top: 64px;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: var(--white);
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 1px solid #000;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
    width: 22px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Separator = styled.div`
  font-size: 14px;
  color: var(--lightGray);

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--lightGray);
    margin-right: 16px;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--lightGray);
    margin-left: 16px;
  }
`;
