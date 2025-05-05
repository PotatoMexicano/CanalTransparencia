import { ClockAlertIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useCountChamadosQuery } from "@/api/chamadoApi";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function CardNumber() {

  const { data, isLoading, error } = useCountChamadosQuery();

  if (isLoading) {
    return <></>;
  }
  return (
    <Card className="flex flex-col h-full relative shadow-lg">

      <div className="absolute p-4 max-md:block max-xl:hidden">
        <ClockAlertIcon />
      </div>

      <CardHeader className="h-full">
        <CardTitle className="text-xl font-semibold flex justify-center">
          <div className="flex gap-2 max-lg:text-center">
            Chamados pendentes
          </div>
        </CardTitle>
      </CardHeader>
    
      <CardContent className="h-full relative flex justify-center text-2xl max-xl:text-center">
        <div>
          {data && data?.contagem_por_situacao.registrado > 0 
          ? data?.contagem_por_situacao.registrado
          : "Sem"
          } Novos chamados
        </div>

        <div className="absolute pt-20 max-lg:hidden">
          <Button type="button" variant={"default"} asChild>
            <Link to={"/dashboard/chamados/pendentes"}>
              Visualizar
            </Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter className=" bottom-0 flex justify-center text-md text-primary/50">
        <div className="line-clamp-1 font-medium">
          Últimos três meses: {data?.contagem_tres_meses} chamados
        </div>
      </CardFooter>
    </Card>
  )
}