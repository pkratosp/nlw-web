import { MagnifyingGlassPlus } from "phosphor-react";
//MODAL UI
import * as Dialog from "@radix-ui/react-dialog";

export function ButtonBanner(){
    return(
        <div className='pt-1 self-stretch bg-color-gradient rounded-lg overflow-hidden  mt-8'>
        <div className='bg-[#2A2634] px-8 py-8 flex justify-between items-center'>
          <div>
            <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400'>Publique um anúncio para encontrar novos players!</span>
          </div>

            {/* Esse triger vai funcionar tipo o onClick do react */}
            <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3'>
                <MagnifyingGlassPlus size={24}/>
                Publicar anúncio
            </Dialog.Trigger>
        </div>
      </div>
    )
}