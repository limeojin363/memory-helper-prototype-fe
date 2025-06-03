import { createFileRoute } from '@tanstack/react-router'
import WordsMain from "../pages/WordsetListPage/components";

export const Route = createFileRoute('/words')({
  component: WordsMain,
})
