import { createFileRoute } from '@tanstack/react-router'
import WordsMain from "../../../pages/WordsetList/components";

export const Route = createFileRoute('/_authenticated/_with-status-bar/wordset')({
  component: WordsMain,
})
