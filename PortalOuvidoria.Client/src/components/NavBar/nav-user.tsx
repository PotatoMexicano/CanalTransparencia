"use client"

import {
  ChevronsUpDown,
  Laptop,
  LogOut,
  MoonIcon,
  SunIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useLogoutMutation } from "@/api/authApi"
import { clearUser } from "@/auth/userSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useTheme } from "@/context/ThemeContext"

export function NavUser() {
  const user = useSelector((state: RootState) => state.user.user)

  const { isMobile } = useSidebar()
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setTheme} = useTheme();

  const FuncLogout = async () => {
    dispatch(clearUser());
    await logout().unwrap();
    navigate('/login', { replace: true});
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={`https://avatar.iran.liara.run/public/boy?username=${user?.full_name}`} alt={user?.full_name} loading="lazy" />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.full_name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={`https://avatar.iran.liara.run/public/boy?username=${user?.full_name}`} alt={user?.full_name} loading="lazy" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.full_name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="flex flex-row justify-between">
              <DropdownMenuItem className="w-full justify-center" onClick={() => setTheme("light")}><SunIcon /></DropdownMenuItem>
              <DropdownMenuItem className="w-full justify-center" onClick={() => setTheme("dark")}><MoonIcon /></DropdownMenuItem>
              <DropdownMenuItem className="w-full justify-center" onClick={() => setTheme("system")}><Laptop /></DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Button variant={'outline'} onClick={() => FuncLogout()} className="w-full flex border-none justify-start font-normal px-3 hover:bg-primary hover:text-white dark:hover:bg-primary-foreground">
              <LogOut />
              Log out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
