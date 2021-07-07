import { useState, FormEvent } from "react";
import { useHistory } from "react-router";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import ilustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Container, CreateRoom, MainContent, Separator } from "./styles";

import toast from "react-hot-toast";

export function Home() {
  const { push } = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Room does not exist!", {
        style: {
          fontWeight: "bold",
          fontSize: 14,
        },
      });
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Room alreaty closed!", {
        style: {
          fontWeight: "bold",
          fontSize: 14,
        },
      });
      return;
    }

    push(`/rooms/${roomCode}`);
  }

  return (
    <Container>
      <aside>
        <img
          src={ilustrationImg}
          alt="Ilustração de trocas de mensagens"
          draggable="false"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <MainContent>
          <img src={logoImg} alt="LetmeAsk" draggable="false" />

          <CreateRoom onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" draggable="false" />
            Crie a sua sala com o Google
          </CreateRoom>

          <Separator>ou entre em uma sala</Separator>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </MainContent>
      </main>
    </Container>
  );
}
