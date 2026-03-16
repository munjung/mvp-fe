import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import CardDetail from '../pages/CardDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/cards/:id',
    element: <CardDetail />,
  },
])

export default router
