import { createFileRoute, useNavigate } from '@tanstack/react-router'

const GererateNewWordSetRouteComponent = () => {
  const navigate = useNavigate()

  const goBack = () => navigate({ to: '/words' })

  return <>adsf</>
}

export const Route = createFileRoute('/words_/new/3')({
  component: GererateNewWordSetRouteComponent,
})

const S = {}
