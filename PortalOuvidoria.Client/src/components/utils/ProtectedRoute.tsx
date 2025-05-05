import { useCheckAuthQuery } from "@/api/authApi";
import { SignalRProvider } from "@/context/SignalRContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { data, isLoading, error } = useCheckAuthQuery();

  if (isLoading){
    return <div>Carregando...</div>;
  }

  if (error || !data?.is_authenticated) {
    return <Navigate to={"/login"} replace />
  }

  return <SignalRProvider>
    <Outlet />
  </SignalRProvider>
}