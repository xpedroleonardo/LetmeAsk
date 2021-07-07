import { ReactNode } from "react";
import cn from "classnames";

import { Container, UserInfo } from "./styles";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <Container
      className={cn(
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfo>
        <div>{children}</div>
      </footer>
    </Container>
  );
}
