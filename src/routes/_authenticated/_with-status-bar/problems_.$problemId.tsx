import { createFileRoute } from '@tanstack/react-router'
import ProblemsDetail from '../../../pages/ProblemSetDetailPage/ProblemsDetail'

export const Route = createFileRoute(
  '/_authenticated/_with-status-bar/problems_/$problemId',
)({
  component: () => {
    const { problemId } = Route.useParams()
    return <ProblemsDetail problemsId={problemId} />
  },
})
