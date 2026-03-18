import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import GuidePage from '@/pages/GuidePage'
import CardList from '@/pages/CardList'
import CardDetail from '@/pages/CardDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <CardList /> },
      { path: 'cards/:id', element: <CardDetail /> },

      /* 가이드 화면 */
      { path: 'guide', element: <GuidePage /> },
    ],
  },
])
