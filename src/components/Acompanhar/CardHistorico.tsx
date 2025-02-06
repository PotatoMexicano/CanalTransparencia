import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

export default function CardHistorico() {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogTitle className='text-center'>Ultimas atualizações sobre seu chamado.</DialogTitle>
        <DialogDescription className='text-foreground text-lg text-center p-3'>

          <div className="flex items-center justify-between text-gray-500 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> iniciou a avaliação</div>
            </div>
            <div className="text-sm">20 jan 2020</div>
          </div>

          <div className="flex items-center justify-between text-gray-500 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> começou a avaliar as evidências</div>
            </div>
            <div className="text-sm">23 jan 2020</div>
          </div>

          <div className="flex flex-col gap-2 text-gray-500 mt-5 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between text-gray-500">
              <div className="text-center text-sm flex gap-1">
                <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
                <div> adicionou um comentário</div>
              </div>
              <div className="text-sm">24 jan 2020</div>
            </div>
            <div className="text-start text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, id harum voluptatem et ad quod iusto consequatur saepe dolorem doloremque explicabo iste similique dolore quasi molestias modi, in at voluptate!
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-500 mt-5">
          {/* <CheckCircle2 /> */}
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> encerrou seu chamado</div>
            </div>
            <div className="text-sm">25 jan 2020</div>
          </div>


        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}