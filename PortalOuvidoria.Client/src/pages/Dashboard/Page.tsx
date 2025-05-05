import CardChart from "@/components/Card/CardChart";
import CardNumber from "@/components/Card/CardNumber";
import { AppSidebar } from "@/components/NavBar/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPage() {
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
                  Dashboard
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inicio</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-col gap-4 p-4 pt-0 w-full h-full">

          <div className="grid grid-cols-3 gap-4 h-full">

            <div className="md:col-span-1 col-span-3 rounded-xl bg-muted/50" >
              <CardNumber />
            </div>
            <div className="md:col-span-2 col-span-3 rounded-xl bg-muted/50">
              <CardChart />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}