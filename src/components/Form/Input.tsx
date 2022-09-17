import {InputHTMLAttributes} from 'react'

//InputHTMLAttributes, ira exportar todas as minhas propriedades html

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}


export function Input(props: InputProps){


    // com esse mano ...prosp exportamos todos os atributos html de uma vez 
    //dai não precisamos setar um de cada vez
    return(
        <input 
            {...props}
            className='bg-zinc-900 py-3 px-4 rounded mt-2 mb-2 text-sm placeholder:text-zinc-500'
        />
    )
}