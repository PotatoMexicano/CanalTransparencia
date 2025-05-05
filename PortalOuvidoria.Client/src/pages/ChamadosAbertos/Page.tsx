"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import { ChamadoCompletoResponse, useFinishedChamadosQuery, useOpenChamadosQuery, usePendingChamadosQuery } from "@/api/chamadoApi";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/NavBar/app-sidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { ClockAlertIcon, LucideIcon, MailCheckIcon, MailsIcon, MessageCircleMoreIcon, ViewIcon } from "lucide-react";
import { cn } from "@/lib/utils";


export function ChamadosAbertosPage() {
  const { data, isLoading, error } = useOpenChamadosQuery();

  const situacaoMap = useMemo<Record<number, { label: string; color: string, icon: LucideIcon }>>(() => ({
    0: { 
      label: "Registrado", 
      color: "bg-gray-200 border-gray-600 text-gray-800 hover:bg-gray-300 hover:text-gray-900 dark:bg-background dark:text-accent-foreground dark:border-stone-600" ,
      icon: ClockAlertIcon,
    }, // Cinza claro -> Cinza um pouco mais escuro
    1: { 
      label: "Analisando", 
      color: "bg-blue-200 dark:bg-blue-400 dark:text-black text-blue-800 hover:bg-blue-300 hover:text-blue-900 border-blue-600",
      icon: MailsIcon,
    }, // Azul claro -> Azul médio
    2: { 
      label: "Verificando Evidências", 
      color: "bg-yellow-200 dark:bg-yellow-500 dark:text-black text-yellow-800 hover:bg-yellow-300 hover:text-yellow-900 border-yellow-600" ,
      icon: ViewIcon,
    }, // Amarelo claro -> Amarelo médio
    3: { 
      label: "Atribuído Comentários", 
      color: "bg-purple-200 dark:bg-purple-400 dark:text-black text-purple-800 hover:bg-purple-300 hover:text-purple-900 border-purple-600" ,
      icon: MessageCircleMoreIcon,
    }, // Roxo claro -> Roxo médio
    4: { 
      label: "Finalizado", 
      color: "bg-green-200 dark:bg-green-400 dark:text-background text-green-800 hover:bg-green-300 hover:text-green-900 border-green-600",
      icon: MailCheckIcon,
    }, // Verde claro -> Verde médio
  }), []);

  const columns = useMemo<ColumnDef<ChamadoCompletoResponse>[]>(() => [
    {
      accessorKey: "token_acompanhamento",
      header: "Token",
      filterFn: "includesString"
    },
    {
      accessorKey: "assunto",
      header: "Assunto",
      filterFn: "includesString"
    },
    {
      accessorKey: "utc_data_registro",
      header: "Data Registro",
      filterFn: "includesString",
      cell: ({ row }) => {
        return new Date(row.original.utc_data_registro).toLocaleDateString("pt-br")
      }
    },
    {
      accessorKey: "situacao",
      header: "Situação",
      cell: ({ row }) => {
        const style = situacaoMap[Number(row.original.id_situacao)];

        return <Badge variant={"secondary"} className={cn(style.color)}>
          <div className="flex gap-2">
            <style.icon size={15} />
            {row.original.situacao}
          </div>
        </Badge>
      }
    },
    {
      accessorKey: "possui_evidencia",
      header: "Evidência",
      filterFn: (row, columnId, filterValue) => {
        if (typeof filterValue === "boolean") {
          return row.getValue(columnId) === filterValue;
        }
        return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
      },
      cell: ({ row }) => {
        return <div>
          <Badge
            className="border-stone-300 bg-background dark:border-stone-600"
            variant={row.original.possui_evidencia
              ? "destructive"
              : "outline"}
          >
            {row.original.possui_evidencia
              ? "Sim"
              : "Não"}
          </Badge>
        </div>
      }
    },
    {
      id: "actions",
      header: () => <div className="text-center">Ações</div>,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Button variant={"outline"} size={'sm'} className="hover:bg-accent hover:text-accent-foreground dark:bg-background dark:border-stone-700 hover:dark:bg-accent hover:dark:text-accent-foreground dark:text-primary">
            <Link to={`/dashboard/chamados/${row.original.id}`} >
              Continuar
            </Link>
          </Button>
        )
      }
    },
  ], []);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOption, setSelectedOption] = useState("5");
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: Number(selectedOption),
  });

  const globalFilterFn = (row, columnId, filterValue) => {
    if (!filterValue) return true;

    const value = filterValue.toLowerCase();
    const assunto = String(row.getValue("assunto") || "").toLowerCase();
    const situacao = String(row.getValue("situacao") || "").toLowerCase();
    const token = String(row.getValue("token_acompanhamento") || "").toLowerCase();
    const possuiEvidencia = row.getValue("possui_evidencia");
    const dataRegistro = String(new Date(row.getValue("utc_data_registro") || "").toLocaleDateString("pt-br")).toLowerCase();

    return (
      assunto.includes(value) ||
      token.includes(value) ||
      situacao.includes(value) ||
      (value === "sim" && possuiEvidencia === true) ||
      (value === "não" && possuiEvidencia === false) ||
      dataRegistro.includes(value)
    );
  };

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
      columnFilters,
      pagination
    }
  });

  if (isLoading) {
    return <div>Carregando tabela...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os chamados: {error.message}</div>;
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Chamados abertos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-col gap-4 pt-0 w-full h-full">

          <Card className="col-span-12 flex flex-col shadow-none border-0">
            <CardHeader>
              <CardTitle className="text-2xl w-full flex justify-between">
                Chamados abertos
              </CardTitle>
              <CardDescription>Chamados aguardando para serem finalizados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row w-full justify-between">
                <div className="relative w-full max-w-xs mb-4">
                  <Input
                    placeholder="Filtrar por assunto, token, evidência ou data..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="pr-8"
                  />
                  {globalFilter && (
                    <button
                      onClick={() => setGlobalFilter("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  )}
                </div>


                <Select
                  defaultValue="15"
                  value={selectedOption}
                  onValueChange={(value) => {
                    setSelectedOption(value);
                    setPagination(() => ({
                      pageIndex: 0,
                      pageSize: Number(value),
                    }));
                  }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Quantidade registros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Items p/ página</SelectLabel>
                      <SelectItem value="5">5 items</SelectItem>
                      <SelectItem value="10">10 items</SelectItem>
                      <SelectItem value="15">15 items</SelectItem>
                      <SelectItem value="30">30 items</SelectItem>
                      <SelectItem value="50">50 items</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

              </div>

              <div className="rounded-md border p-4 my-4">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          className="hover:bg-stone-200 dark:hover:bg-primary-foreground"
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className={cell.column.id === "actions" ? "text-center" : ""}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Próximo
                </Button>
              </div>

            </CardContent>
          </Card>

        </div>

      </SidebarInset>
    </SidebarProvider >
  );
}

export default ChamadosAbertosPage;