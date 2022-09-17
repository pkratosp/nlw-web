import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox"
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Input } from "./Form/Input";
import {Check, GameController} from 'phosphor-react'

import {useState, useEffect, FormEvent} from 'react'
import axios from "axios";

interface gamesListProps{
    id: string;
    title: string;
}

export function CreatAdModal(){

    //para listagem no select
    const [gamesListSelect,setGamesListSelect] = useState<gamesListProps[]>([])
    useEffect(()=>{
        axios('http://localhost:20021/games')
            .then(response=> {
                setGamesListSelect(response.data)
            })
    }, [])

    //IRA SELECIONAR UM MONTE DE VALORES NO INPUT DE SEMANA
    const [weekDays,setWeekDays] = useState<string[]>([])
    console.log(weekDays)

    //-----checkbox
    const [userVoice, setUserVoice] = useState(false)
    console.log(userVoice)
    //ira enviar os dados para a api
    async function handleCreateAd(event: FormEvent){
        event.preventDefault()
        console.log('enviou os dados')

        const formData = new FormData(event.target as HTMLFormElement)//com o as html... dizemos pro typescript que o target vai se um formulario
        const data = Object.fromEntries(formData)
        console.log(data)

        //adcionar validação

        try {
           await axios.post(`http://localhost:20021/games/${data.game}/ads`,{
                "name":data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "useVoiceChannel": userVoice
            })
            alert('Anúncio criado com sucesso')
        } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio')
        }
    }

    return(
        
        <Dialog.Portal>{/* abre  o nosso modal */}
          {/* telinha escura do modal */}
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/> 
          
          {/* Conteudo do meu modal */}
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

        

              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>

                  <select 
                    id="game" 
                    name="game"
                    className='bg-zinc-900 py-3 px-4 rounded mt-2 mb-2 text-sm placeholder:text-zinc-500 appearance-none'
                    defaultValue=""
                    >
                        <option value="" disabled>Selecione o game que deseja jogar</option>
                        {gamesListSelect.map(gamesList=>{
                            return(
                                <option key={gamesList.id} value={gamesList.id}>{gamesList.title}</option>
                            )
                        })}
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
                  <Input id="name" name="name" placeholder='Como te chamam dentro do game?'/>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO'/>
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input id="discord" name="discord" type="text" placeholder='Usuario#0000'/>
                  </div>
                </div>

                <div className='flex gap-6'>

                <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                        type="multiple" 
                        className='grid grid-cols-4 gap-2'
                        value={weekDays}
                        onValueChange={setWeekDays}
                        >
                        <ToggleGroup.Item 
                            value="0"
                          title='Domingo'
                          className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                          D
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                            value="1"
                          title='Segunda'
                          className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                          S
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                            value="2"
                          title='Terça'
                          className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                        >
                          T
                        </ToggleGroup.Item> 

                        <ToggleGroup.Item 
                            value="3"
                          title='Quarta'
                          className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                          Q
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                            value="4"
                          title='Quinta'
                          className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                          Q
                        </ToggleGroup.Item>

                        <ToggleGroup.Item 
                            value="5"
                          title='Sexta'
                          className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                          S
                        </ToggleGroup.Item> 
                        
                        <ToggleGroup.Item 
                            value="6"
                          title='Sábado'
                          className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                          S
                        </ToggleGroup.Item> 
                    </ToggleGroup.Root>
                </div>
           
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input name="hourStart" id='hourStart' type="time" placeholder='De'/>
                      <Input name="hourEnd" id='hourEnd' type="time" placeholder='Até'/>
                    </div>
                  </div>

                </div>


                <label className='mt-2 items-center flex gap-2 text-sm'>
                  <Checkbox.Root 
                    checked={userVoice}
                    onCheckedChange={(checked)=>{
                        if(checked == true){
                            setUserVoice(true)
                        }else{
                            setUserVoice(false)
                        }
                    }}
                    className="w-6 h-6 rounded bg-zinc-900"
                    >
                    <Checkbox.Indicator>
                        <Check className="w-6 h-6 text-emerald-400 p-1"/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>


                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close 
                    type='button'
                    className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                  >Cancelar</Dialog.Close>
                  
                  <button 
                    className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                    type='submit'
                    ><GameController className='w-6 h-6'/>Encontrar duo</button>
                </footer>
              </form>

        

          </Dialog.Content>
        </Dialog.Portal>
    )
}