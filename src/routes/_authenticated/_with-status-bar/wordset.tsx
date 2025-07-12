import { createFileRoute } from '@tanstack/react-router'
import WordsetListPage from "../../../pages/WordsetList/components";

export const Route = createFileRoute('/_authenticated/_with-status-bar/wordset')({
  component: WordsetListPage,
})
