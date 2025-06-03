import { createFileRoute } from '@tanstack/react-router'
import WordsMain from "../../../pages/WordsetListPage/components";

export const Route = createFileRoute('/_authenticated/_with-status-bar/words')({
  component: WordsMain,
})
