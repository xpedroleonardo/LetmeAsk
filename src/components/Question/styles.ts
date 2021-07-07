import styled from "styled-components";

export const Container = styled.div`
  .question {
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    padding: 24px;

    & + .question {
      margin-top: 8px;
    }

    &.highlighted {
      background: #f4f0ff;
      border: 2px solid var(--primary);
    }

    &.answered {
      background: #dbdcdd;
    }

    p {
      color: var(--darkGray);
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;

      > div {
        display: flex;
        gap: 16px;
      }

      button {
        border: 0;
        background: transparent;
        cursor: pointer;
        gap: 8px;
        transition: filter 0.2s;

        &.like-button {
          display: flex;
          align-items: flex-end;
          color: var(--gray);

          &.liked {
            color: var(--primary);

            svg path {
              stroke: var(--primary);
            }
          }
        }

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  span {
    margin-left: 8px;
    color: #737380;
    // color: var(--darkGray);
    // font-weight: 500;
    font-size: 14px;
  }
`;
