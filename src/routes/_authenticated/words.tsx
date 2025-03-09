import { createFileRoute } from '@tanstack/react-router'
import WordsMain from '../../pages/WordSetListPage/components/WordsMain'

export const Route = createFileRoute('/_authenticated/words')({
  component: WordsMain,
})
