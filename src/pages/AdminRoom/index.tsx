import { useHistory, useParams } from "react-router-dom";
import Modal from "react-modal";

// import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { database } from "../../services/firebase";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import emptyImg from "../../assets/images/empty-questions.svg";
import dangerImg from "../../assets/images/danger.svg";

import { Container, Empty } from "../Room/styles";
import "../../styles/modal.scss";

import { Question } from "../../components/Question";
import { useState } from "react";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const { push } = useHistory();
  const [modal, setModal] = useState(false);
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  function openModal(open: boolean) {
    setModal(open);
  }

  async function modalButton(action: boolean) {
    if (action) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });

      push("/");
    } else {
      openModal(action);
    }
  }

  // async function handleEndRoom() {
  //   if (window.confirm("Deseja realmente encerrar a sala ?")) {
  //     await database.ref(`rooms/${roomId}`).update({
  //       endedAt: new Date(),
  //     });

  //     push("/");
  //   }
  // }

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
    <Container>
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk" draggable="false" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => openModal(true)}>
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
          {questions.length > 0 ? (
            questions.map(
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
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              )
            )
          ) : (
            <Empty>
              <img src={emptyImg} alt="Perguntas" />
              <h2>Nenhuma pergunta por aqui...</h2>
              <p>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </p>
            </Empty>
          )}
        </div>
      </main>

      <Modal className="modal" overlayClassName="overlay" isOpen={modal}>
        <div className="modal-content">
          <img src={dangerImg} alt="" />
          <h1>Encerrar sala</h1>
          <p>Tem certeza que você deseja encerrar esta sala?</p>
          <div className="buttons-modal">
            <button onClick={() => modalButton(false)} type="button">
              Cancelar
            </button>
            <button onClick={() => modalButton(true)} type="button">
              Sim, encerrar
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
