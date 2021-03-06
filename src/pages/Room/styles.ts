import styled from "styled-components";

export const Container = styled.div`
  header {
    padding: 24px;
    border-bottom: 1px solid #e2e2e2;

    .content {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-height: 45px;
      }

      > div {
        display: flex;
        gap: 16px;

        > button {
          height: 40px;
        }
      }
    }
  }

  main {
    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 32px 0 24px;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Poppins", sans-serif;
        font-size: 24px;
        color: var(--darkGray);
      }

      span {
        margin-left: 16px;
        background: var(--link);
        border-radius: 9999px;
        padding: 8px 16px;
        color: var(--white);
        font-weight: 500;
        font-size: 14px;
      }
    }

    form {
      textarea {
        width: 100% !important;
        border: 0;
        padding: 16px;
        border-radius: 8px;
        background: var(--white);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
        resize: none;
        height: 200px;
        outline: none;

        &:focus {
          box-shadow: 0 0 0 2px var(--primary);
        }
      }
    }

    .question-list {
      margin: 32px 0;
    }
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  .user-info {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      margin-left: 8px;
      color: var(--darkGray);
      font-weight: 500;
      font-size: 14px;
    }
  }

  > span {
    font-size: 14px;
    color: #737380;
    font-weight: 500;

    button {
      font-size: 14px;
      font-weight: 500;

      background: transparent;
      color: var(--primary);
      border: none;
      outline: none;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const Empty = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px 190px;

  img {
    width: 250px;
  }

  h2 {
    margin: 10px 0;
  }
`;
