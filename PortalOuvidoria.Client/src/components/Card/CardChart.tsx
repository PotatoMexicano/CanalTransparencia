// components/TicketStatusChart.js
"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCountChamadosQuery } from "@/api/chamadoApi";
import { Badge } from "../ui/badge";

// Configuração do gráfico
const chartConfig = {
  tickets: {
    label: "Chamados",
  },
  registrado: {
    label: "Registrado",
    color: "hsl(var(--chart-1))",
  },
  analisando: {
    label: "Analisando",
    color: "hsl(var(--chart-2))",
  },
  verificandoEvidencias: {
    label: "Evidências",
    color: "hsl(var(--chart-3))",
  },
  atribuidoComentarios: {
    label: "Comentários",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function CardChart() {
  const { data, isLoading } = useCountChamadosQuery();

  // Dados do gráfico baseados na resposta da API
  const chartData = [
    { status: "registrado", tickets: data?.contagem_por_situacao.registrado || 0, fill: "var(--color-registrado)" },
    { status: "analisando", tickets: data?.contagem_por_situacao.analisando || 0, fill: "var(--color-analisando)" },
    { status: "verificandoEvidencias", tickets: data?.contagem_por_situacao.verificando_evidencias || 0, fill: "var(--color-verificandoEvidencias)" },
    { status: "atribuidoComentarios", tickets: data?.contagem_por_situacao.atribuido_comentarios || 0, fill: "var(--color-atribuidoComentarios)" },
  ];
  
  const totalTickets = chartData.reduce((sum, item) => sum + item.tickets, 0);

  if (isLoading) {
    return <div>Carregando gráfico...</div>;
  }

  return (
    <Card className="relative h-full flex flex-col shadow-lg">
      
      <div className="absolute right-0 p-5 max-md:block max-lg:hidden">
        <Badge variant={"outline"}>
          {totalTickets} Registros
        </Badge>
      </div>

      <CardHeader>
        <CardTitle>Distribuição de Chamados por Situação</CardTitle>
        <CardDescription>Histórico completo</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full">
        <ChartContainer config={chartConfig} className="flex w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value]?.label || value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="tickets"
              strokeWidth={2}
              radius={8}
              activeIndex={0} // Destaca "Verificando Evidências" como exemplo
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default CardChart;