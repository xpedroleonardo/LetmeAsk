import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { RoomCode } from "../components/RoomCode";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";
import { Question } from "../components/Question";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");
  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      toast.error("Question empty", {
        style: {
          fontWeight: "bold",
          fontSize: 14,
        },
      });
      return;
    }

    if (!user) {
      toast.error("You must be logged in!", {
        style: {
          fontWeight: "bold",
          fontSize: 14,
        },
      });
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions/`).push(question);
    toast.success("Question sent", {
      style: {
        fontWeight: "bold",
        fontSize: 14,
      },
    });
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk" draggable="false" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="Digite a sua pergunta"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} draggable="false" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}

            <Button disabled={!user} type="submit">
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map(({ id, content, author }) => (
            <Question key={id} content={content} author={author} />
          ))}
        </div>
      </main>
    </div>
  );
}
