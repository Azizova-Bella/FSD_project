import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Button from '../shared/ui/button'
import TableUser from '../pages/table-user/table-user'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableUser />
  </StrictMode>,
)
