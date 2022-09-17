import './styles/main.css'
import logo from './assets/logo.svg'
import {GameController, MagnifyingGlassPlus} from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { ButtonBanner } from './components/ButtonBanner'

//isso são chamados de hooks
import {useState, useEffect} from 'react'

//MODAL UI
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from './components/Form/Input'
import { CreatAdModal } from './components/CreatAdModal'


interface ButtonProps{
  title: string
}

function Button (props: ButtonProps){
  return <button>
    {props.title}
  </button>
}

//com a interface tratamos os dados que iremos receber da api para a listagem
interface GamesProps{
  id: string;
  title: string;
  _count: {
    ads: number
  };
  bannerUrl: string;
}

function App() {
  //basicamente o useState serve para fazer eventos e ele por padrao retorna 2 coisas
  //a variavel que iremos atualizar e a funcção que ira executar
  //atualiza todo meu componente se eu não usar o useEffect
  // const [hasButtonUserClick, setButtonUserClick] = useState(false);

  // function handleButtonUserClick(){
  //   setButtonUserClick(!hasButtonUserClick)
  // }

  // //essa função meio que monitorando as variaves do useState e o que tiver dentro da função ele ira atualiza
  // //ou sejá ele não ira atualizar todo o meu componente
  // useEffect( () => {
  //   console.log('atualizou só isso')
  // }, [hasButtonUserClick])

// {/* <button onClick={handleButtonUserClick}>Clique no botao</button>
//         {hasButtonUserClick ? 'TU CLICOU NO BOTAO MENO' : null} */}

  //declaramos a interface no useState como um [] sendo que vem da API
  const [games,setGames] = useState<GamesProps[]>([])

  //Um hackzim muito loco, se eu não passar nada no meu array ele ira executar somente uma vez
  useEffect(() => {
    fetch('http://localhost:20021/games'  )
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} alt="" />
      <h1 className='text-6xl text-white font-black mt-10'>Seu <span className='bg-color-gradient bg-clip-text text-transparent'>duo</span> esta aqui</h1>
    
      <div className='grid grid-cols-6 gap-6 mt-10'>
        
        {/* É IGUAL AO FOREACH QUE USAMOS NO JAVASCRIPT PARA LISTAGEM */}
        {/* esse mano key, é um atributo do próprio react, não é absolutamente necessario listar os itens com ele, mas é uma boa pratica */}
        {games.map(game => {
          return(
            <GameBanner 
              key={game.id}
              title={game.title} 
              bannerUrl={game.bannerUrl} 
              adsCount={game._count.ads}
            />
          )
        })}


        
      </div>

      <Dialog.Root>
        <ButtonBanner/>
        <CreatAdModal/>
        
      </Dialog.Root>
    </div>
    
  )
}

export default App
