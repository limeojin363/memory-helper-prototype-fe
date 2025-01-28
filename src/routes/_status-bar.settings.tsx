import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_status-bar/settings')({
  component: SettingsComponent,
})

function SettingsComponent() {
  return <div>Hello "/settings"!</div>
}
