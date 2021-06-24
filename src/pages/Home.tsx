import { useHistory } from 'react-router';
import { Button } from "../components/Button";
import { useAuth } from  '../hooks/useAuth'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

export function Home (){
  const { push } = useHistory()
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }
      
    push('/rooms/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustração de trocas de mensagens" draggable="false" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetmeAsk" draggable="false"/>

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" draggable="false"/>
            Crie a sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />

            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}