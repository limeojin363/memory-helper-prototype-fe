import { createFileRoute } from '@tanstack/react-router'
import ProblemsMain from '../pages/ProblemSetListPage/ProblemsMain'

export const Route = createFileRoute('/_with-status-bar/problems')({
  component: ProblemsMain,
})
