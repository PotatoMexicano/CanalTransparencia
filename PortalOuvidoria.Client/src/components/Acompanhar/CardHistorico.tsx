import { useDialog } from "@/context/DialogTokenContext";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

export default function CardHistorico() {

  const { isDialogOpen, setIsDialogOpen} = useDialog();

  

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false) }>
      <DialogContent className="max-w-2xl p-8" onInteractOutside={(e) => e.preventDefault()} >
        <DialogTitle className='text-center'>Ultimas atualizações sobre seu chamado.</DialogTitle>
        <DialogDescription></DialogDescription>
          <hr className="bg-foreground/5 dark:bg-foreground" />

          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> iniciou a avaliação</div>
            </div>
            <div className="text-sm"><strong>20 jan 2020</strong></div>
          </div>

          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> começou a avaliar as evidências</div>
            </div>
            <div className="text-sm"><strong>23 jan 2020</strong></div>
          </div>

          <div className="flex flex-col gap-2 text-gray-500 dark:text-white/90 mt-5 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-center text-sm flex gap-1">
                <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
                <div> adicionou um comentário</div>
              </div>
              <div className="text-sm"><strong>24 jan 2020</strong></div>
            </div>
            <div className="text-start text-sm p-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, id harum voluptatem et ad quod iusto consequatur saepe dolorem doloremque explicabo iste similique dolore quasi molestias modi, in at voluptate!
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> encerrou seu chamado</div>
            </div>
            <div className="text-sm"><strong>25 jan 2020</strong></div>
          </div>

      </DialogContent>
    </Dialog>
  )
}