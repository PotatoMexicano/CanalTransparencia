import Acompanhar from "./Acompanhar";
import Informacao from "./Informacao";
import Registrar from "./Registar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroHighlight, } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function App() {

  const mensagemMotivacional = "Faça a diferença! Denuncie, participe e ajude a construir uma comunidade mais justa e segura.";

  return (
    <>
      <div className="fixed right-14 bottom-14 z-50">
        <Informacao />
      </div>

      <div className="h-full w-full dark:bg-black dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 -z-1 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>

        <div className='flex h-screen w-screen z-10'>
          <div className="m-auto">

            <HeroHighlight>
              <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
                Portal Ouvidoria
              </h1>
              <TextGenerateEffect words={mensagemMotivacional} />
            </HeroHighlight>


            <div className="flex m-auto justify-center">
              <Tabs defaultValue="registar" className="w-[500px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="registar">Novo chamado</TabsTrigger>
                  <TabsTrigger value="acompanhar">Acompanhar chamado</TabsTrigger>
                </TabsList>
                <TabsContent value="registar">
                  <Registrar />
                </TabsContent>
                <TabsContent value="acompanhar">
                  <Acompanhar />
                </TabsContent>
              </Tabs>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}