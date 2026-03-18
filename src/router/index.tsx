import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import PortalPage from '@/pages/PortalPage'
import GuidePage from '@/pages/GuidePage'
import CardList from '@/pages/CardList'
import CardDetail from '@/pages/CardDetail'
import ClaimsAgentMVP from '@/pages/mvps/ClaimsAgentMVP'
import SecurityDashboard from '@/pages/mvps/SecurityDashboard'
import AIFirewall from '@/pages/mvps/AIFirewall'
import StockPilot from '@/pages/mvps/StockPilot'
import ClaimsAgentNew from '@/pages/mvps/ClaimsAgentNew'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <CardList /> },
      { path: 'cards/:id', element: <CardDetail /> },

      /* 가이드 화면 */
      { path: 'guide', element: <GuidePage /> },
      /* 테스트용 */
      { path: 'mvps', element: <PortalPage /> },

      { path: 'mvps/claims', element: <ClaimsAgentMVP /> },
      { path: 'mvps/security', element: <SecurityDashboard /> },
      { path: 'mvps/firewall', element: <AIFirewall /> },
      { path: 'mvps/stockpilot', element: <StockPilot /> },
      { path: 'mvps/claimsNew', element: <ClaimsAgentNew /> },
    ],
  },
])
