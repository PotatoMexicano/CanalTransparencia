import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { DialogProvider } from "./context/DialogTokenContext";
import Registrar from "./components/Registrar/Registar";
import Acompanhar from "./components/Acompanhar/Acompanhar";
import Informacao from "./components/Informação/Informacao";

export default function App() {

  const mensagemMotivacional = "Faça a diferença! Denuncie, participe e ajude a construir uma comunidade mais justa e segura.";

  return (
    <>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-full w-full relative flex items-center justify-center bg-grid-black/[0.05] dark:bg-grid-white/[0.2] dark:bg-black">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white dark:bg-black z-0 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>

        <div className='flex h-screen w-screen z-10'>
          <div className="m-auto">

              <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
                Portal Ouvidoria
              </h1>
              <TextGenerateEffect className="m-5 my-5 text-center" words={mensagemMotivacional} />

            <div className="flex m-auto justify-center">
              <Tabs defaultValue="registar" className="w-full p-4 md:p-0 md:w-[500px]">
                <TabsList className="grid w-full grid-cols-2 my-5">
                  <TabsTrigger value="registar">Novo chamado</TabsTrigger>
                  <TabsTrigger value="acompanhar">Acompanhar chamado</TabsTrigger>
                </TabsList>
                <TabsContent value="registar">
                  <DialogProvider>
                    <Registrar />
                  </DialogProvider>
                </TabsContent>
                <TabsContent value="acompanhar">
                  <Acompanhar />
                </TabsContent>
              </Tabs>

            </div>

            <div className="fixed flex gap-3 right-14 bottom-14 z-50 max-md:hidden">
            <ThemeToggle />
            <Informacao />
          </div>
          </div>
        </div>
        
      </div>
    </ThemeProvider>
    </>
  )
}