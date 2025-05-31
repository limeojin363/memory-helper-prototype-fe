import { createFileRoute } from '@tanstack/react-router'
import WordsMain from '../pages/WordSetListPage/components/WordsMain'

export const Route = createFileRoute('/words')({
  component: WordsMain,
})
