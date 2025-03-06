import { createFileRoute } from '@tanstack/react-router'
import WordSetDetail from '../../pages/WordSetDetailPage/components/WordSetDetail'

export const Route = createFileRoute('/_authenticated/words_/$wordSetId')({
  component: () => {
    const { wordSetId } = Route.useParams()

    return <WordSetDetail wordsetId={wordSetId} />
  },
})
