import LoginPage from "@/pages/Login/Page"
import HomePage from "@/pages/Homepage/Page"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoute from "@/components/utils/ProtectedRoute"
import DashboardPage from "@/pages/Dashboard/Page"
import ChamadosPendentesPage from "@/pages/ChamadosPendentes/Page"
import ChamadosAbertosPage from "@/pages/ChamadosAbertos/Page"
import ChamadosEncerradosPage from "@/pages/ChamadosEncerrados/Page"
import VisualizarChamadoPage from "@/pages/VisualizarChamado/Page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: '/dashboard/chamados/:id',
        element: <VisualizarChamadoPage />
      },
      {
        path: '/dashboard/chamados/pendentes',
        element: <ChamadosPendentesPage />
      },
      {
        path: '/dashboard/chamados/abertos',
        element: <ChamadosAbertosPage />
      },
      {
        path: '/dashboard/chamados/encerrados',
        element: <ChamadosEncerradosPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;