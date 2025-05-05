import { useDialog } from "@/context/DialogTokenContext";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { AcompanharChamadoResponse } from "@/api/chamadoApi";
import { formatDate } from "@/utils/utils";

interface Props {
  data: AcompanharChamadoResponse
}

export default function CardHistorico(props: Props) {

  const { isDialogOpen, setIsDialogOpen } = useDialog();

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
      <DialogContent className="max-w-2xl p-8" onInteractOutside={(e) => e.preventDefault()} >
        <DialogTitle className='text-center'>Ultimas atualizações sobre seu chamado.</DialogTitle>
        <DialogDescription></DialogDescription>
        <hr className="bg-foreground/5 dark:bg-foreground" />

        {props.data.utc_data_registro && (
          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Você</div>
              <div>registrou o chamado</div>
            </div>
            <div className="text-sm"><strong>{formatDate(props.data.utc_data_registro)}</strong></div>
          </div>
        )}

        {props.data.utc_data_analise && (
          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> iniciou a avaliação</div>
            </div>
            <div className="text-sm"><strong>{formatDate(props.data.utc_data_analise)}</strong></div>
          </div>
        )}

        {props.data.utc_data_evidencia && (
          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> começou a avaliar as evidências</div>
            </div>
            <div className="text-sm"><strong>{formatDate(props.data.utc_data_evidencia)}</strong></div>
          </div>
        )}

        {(props.data.utc_data_comentario && props.data.comentario_finalizado) && (
          <div className="flex flex-col gap-2 text-gray-500 dark:text-white/90 mt-5 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-center text-sm flex gap-1">
                <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
                <div> adicionou um comentário</div>
              </div>
              <div className="text-sm"><strong>{formatDate(props.data.utc_data_comentario)}</strong></div>
            </div>
            <div className="text-start text-sm p-1">
              {props.data.comentario_finalizado}
            </div>
          </div>
        )}

        {props.data.utc_data_finalizado && (
          <div className="flex items-center justify-between text-gray-500 dark:text-white/90 mt-5">
            <div className="text-center text-sm flex gap-1">
              <div className="font-bold text-gray-800 dark:text-white">Administrador</div>
              <div> encerrou seu chamado</div>
            </div>
            <div className="text-sm"><strong>{formatDate(props.data.utc_data_finalizado)}</strong></div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}