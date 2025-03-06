import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_with-status-bar/problems',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/_with-status-bar/problems"!</div>
}
