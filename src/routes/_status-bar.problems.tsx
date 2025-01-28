import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_status-bar/problems')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/problems"!</div>
}
