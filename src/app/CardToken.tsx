import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { EvervaultCard } from '@/components/ui/evervault-card'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from "sonner"
import { useState } from 'react';

interface Props {
  token: string
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export default function CardToken(props: Props) {

  const [allowCloseDialog, SetAllowCloseDialog] = useState(false);

  const handleModalOpen = () => {
    if (allowCloseDialog){
      props.setIsModalOpen(false)
    }else{
      toast.error("Clique no código para copiar");
    }
  }

  const handleCopyClipboard = () => {
    toast.success("Código copiado com sucesso");
    SetAllowCloseDialog(true);
  }

  return (
    <Dialog open={props.isModalOpen} onOpenChange={handleModalOpen}>
      <DialogContent onPointerDownOutside={() => { }}>
        <CopyToClipboard text={props.token}>
          <div className="flex flex-col w-full px-10 items-center justify-center h-[300px] cursor-pointer" onClick={handleCopyClipboard}>
            <EvervaultCard text={props.token} />
          </div>
        </CopyToClipboard>
        <hr />
        <DialogDescription className='text-black'>

          <HeroHighlight>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              className="font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
              <div className='w-full my-3'>
                <Highlight className="text-black dark:text-white text-lg">
                  Salve este código em um local seguro.<br />
                </Highlight>
              </div>
              <p className='text-lg font-normal'>
                Você vai precisar dele para acompanhar as atualizações do seu chamado.
              </p>
            </motion.h1>
          </HeroHighlight>

        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
