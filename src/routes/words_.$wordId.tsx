import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/words_/$wordId')({
  component: WordDetailComponent,
})

function WordDetailComponent() {
  return <div>Word Detail Component</div>
}
