import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GlobeLock, MapPinOffIcon, PackageIcon, VenetianMaskIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Informacao() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="">
        <Button variant={"outline"} className="hover:bg-primary hover:text-white">
          <GlobeLock size={30} /> Sua segurança
        </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sua segurança</DialogTitle>
        </DialogHeader>
        <div className="flex items-center text-start">
          <MapPinOffIcon className="mr-2" size={40} /> Não coletamos informações de rastreamento (IP, local, fuso horário, etc...)
        </div>

        <div className="flex items-center text-start">
          <PackageIcon className="mr-2" size={40} /> Seus arquivos serão armazenados em segurança.
        </div>

        <div className="flex items-center text-start">
          <VenetianMaskIcon className="mr-2" size={40} /> Não solicitamos nome, e-mail ou qualquer identificação.
        </div>

      </DialogContent>
    </Dialog>
  )
}