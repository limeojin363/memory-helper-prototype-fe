import { createFileRoute } from '@tanstack/react-router'
import Settings from '../components/page-specific/Settings/Settings'

export const Route = createFileRoute('/_with-status-bar/settings')({
  component: Settings,
})
