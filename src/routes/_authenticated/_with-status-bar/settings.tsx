import { createFileRoute } from '@tanstack/react-router'
import Settings from '../../../pages/SettingsPage/Settings'

export const Route = createFileRoute(
  '/_authenticated/_with-status-bar/settings',
)({
  component: Settings,
})
