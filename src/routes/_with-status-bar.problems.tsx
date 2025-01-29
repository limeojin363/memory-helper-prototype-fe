import { createFileRoute } from '@tanstack/react-router'
import ProblemsMain from '../components/page-specific/ProblemsMain/ProblemsMain'

export const Route = createFileRoute('/_with-status-bar/problems')({
  component: ProblemsMain,
})
