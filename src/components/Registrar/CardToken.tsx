import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { EvervaultCard } from '@/components/ui/evervault-card'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from "sonner"
import { useDialog } from '@/context/DialogTokenContext';

interface Props {
  token: string
}

export default function CardToken(props: Props) {

  const { isDialogOpen, setIsDialogOpen, allowCloseDialog, setAllowCloseDialog, attemptsCloseDialog, setAttemptsCloseDialog } = useDialog();

  const handleModalOpen = () => {
    if (allowCloseDialog) {
      setAttemptsCloseDialog(0);
      setIsDialogOpen(false)
    } else {
      setAttemptsCloseDialog(attemptsCloseDialog + 1);

      if (attemptsCloseDialog >= 2) {
        setAttemptsCloseDialog(0);
        setIsDialogOpen(false)
      } else {
        toast.error("Clique no código para copiar");
      }
    }
  }

  const handleCopyClipboard = () => {
    toast.success("Código copiado com sucesso");
    setAllowCloseDialog(true);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleModalOpen}>
      <DialogContent>
        <DialogTitle className='text-center'>Salve este código em um local seguro.</DialogTitle>
        <CopyToClipboard text={props.token}>
          <div className="flex flex-col w-full px-10 items-center justify-center h-[300px] cursor-pointer" onClick={handleCopyClipboard}>
            <EvervaultCard text={props.token} />
          </div>
        </CopyToClipboard>
        <hr />
        <DialogDescription className='text-foreground text-lg text-center'>
          <small>Dica: Você pode copiar o código clicando sobre ele.</small><br/>
          Você vai precisar dele para acompanhar as atualizações do seu chamado.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
