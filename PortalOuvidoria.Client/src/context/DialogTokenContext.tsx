import { createContext, ReactNode, useContext, useState } from "react";

interface DialogContextType {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  allowCloseDialog: boolean;
  setAllowCloseDialog: (value: boolean) => void;
  attemptsCloseDialog: number;
  setAttemptsCloseDialog: (value: number) => void;
}

const DialogContext = createContext<DialogContextType |undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context){
    throw new Error("useDialog deve ser usado dentro de um DialogProvider");
  }
  return context;
}

export function DialogProvider({children}:{children: ReactNode}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allowCloseDialog, setAllowCloseDialog] = useState(false);
  const [attemptsCloseDialog, setAttemptsCloseDialog] = useState(0);

  return(
    <DialogContext.Provider value={{isDialogOpen, setIsDialogOpen, allowCloseDialog, setAllowCloseDialog, attemptsCloseDialog, setAttemptsCloseDialog}}>
      {children}
    </DialogContext.Provider>
  )
}