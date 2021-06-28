import { useHistory, useParams } from "react-router-dom";

// import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import "../styles/room.scss";
import { Question } from "../components/Question";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const { push } = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    push("/");
  }

  async function handleDeleteQuestion(id: string) {
    if (window.confirm("Deseja realmente apagar a pergunta ?")) {
      await database.ref(`rooms/${roomId}/questions/${id}`).remove();
    }
  }

  async function handleCheckQuestion(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isAnswered: true,
    });
  }

  async function handleAnsewerQuestion(id: string) {
    await database.ref(`rooms/${roomId}/questions/${id}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk" draggable="false" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(
            ({ id, content, author, isAnswered, isHighlighted }) => (
              <Question
                key={id}
                content={content}
                author={author}
                isAnswered={isAnswered}
                isHighlighted={isHighlighted}
              >
                {!isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(id)}
                    >
                      <img src={checkImg} alt="Marcar como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnsewerQuestion(id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button type="button" onClick={() => handleDeleteQuestion(id)}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          )}
        </div>
      </main>
    </div>
  );
}
