import MyPage from '@/pages/Me'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/me')({
  component: MyPage,
})
