import toast from "react-hot-toast";
import copyImg from "../../assets/images/copy.svg";

import { Container } from "./styles";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCode() {
    navigator.clipboard.writeText(`${props.code}`);
    toast.success("Code copied", {
      style: {
        fontWeight: "bold",
        fontSize: 14,
      },
    });
  }

  return (
    <Container onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="Copiar código da sala" />
      </div>
      <span>{props.code}</span>
    </Container>
  );
}
