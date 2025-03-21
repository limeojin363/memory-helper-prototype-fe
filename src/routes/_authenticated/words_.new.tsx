import { createFileRoute } from '@tanstack/react-router'
import NewWord from '../../pages/GeneratingNewWordSetPage/components/Page'

export const Route = createFileRoute('/_authenticated/words_/new')({
  component: () => <NewWord />,
})
