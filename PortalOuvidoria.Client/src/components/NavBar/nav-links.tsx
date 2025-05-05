import { CheckCheckIcon, ClockAlertIcon, FolderOpenIcon, Home, MailPlusIcon, MailSearchIcon} from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const items = [
  {
    title: "Página inicial",
    url: "/dashboard",
    icon: Home,
    group: "Acesso rápido",
  },
  {
    title: "Chamados pendentes",
    url: "/dashboard/chamados/pendentes",
    icon: ClockAlertIcon,
    group: "Chamados",
  },
  {
    title: "Chamados abertos",
    url: "/dashboard/chamados/abertos",
    icon: FolderOpenIcon,
    group: "Chamados",
  },
  {
    title: "Chamados encerrados",
    url: "/dashboard/chamados/encerrados",
    icon: CheckCheckIcon,
    group: "Chamados",
  },
  {
    title: "Registar chamado",
    url: "/?tab=registrar",
    icon: MailPlusIcon,
    group: "Externo",
  },
  {
    title: "Acompanhar chamado",
    url: "/?tab=acompanhar",
    icon: MailSearchIcon,
    group: "Externo",
  },
] as const;

export function NavLinks() {

  const groupedItems = Object.values(
    items.reduce((acc, item) => {
      const { group, ...itemData } = item;
      if (!acc[group]) {
        acc[group] = { group, items: [] };
      }
      acc[group].items.push(itemData);
      return acc;
    }, {})
  );

  return (
    <div>
      {groupedItems.map((groupItem) => (
        <SidebarGroup key={groupItem.group}>
          <SidebarGroupLabel>{groupItem.group}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupItem.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </div>
  )
}