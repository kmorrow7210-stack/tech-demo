import { Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { ClipMatch } from '@/lib/search'

function HighlightedQuote({
  quote,
  range,
}: {
  quote: string
  range: [number, number] | null
}) {
  if (!range) return <>{`\u201c${quote}\u201d`}</>
  const [start, end] = range
  return (
    <>
      {'\u201c'}
      {quote.slice(0, start)}
      <mark className="rounded-sm bg-amber-300/90 px-0.5 text-neutral-950">
        {quote.slice(start, end)}
      </mark>
      {quote.slice(end)}
      {'\u201d'}
    </>
  )
}

export function ClipCard({ match }: { match: ClipMatch }) {
  const { clip, phraseRange } = match
  return (
    <Card className="group gap-0 overflow-hidden border-neutral-800 bg-neutral-900 p-0 transition-colors hover:border-neutral-600">
      <div
        className={`relative aspect-video w-full bg-linear-to-br ${clip.poster}`}
        aria-label={`Mock thumbnail for ${clip.title}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
            <Play className="size-5 fill-white text-white" aria-hidden />
          </span>
        </div>
        <Badge
          variant="secondary"
          className="absolute right-2 bottom-2 bg-black/70 font-mono text-[10px] text-neutral-200"
        >
          {clip.timestamp} &middot; {clip.duration}s
        </Badge>
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-black/70 text-[10px] text-neutral-300"
        >
          {clip.kind}
        </Badge>
      </div>
      <CardContent className="space-y-2 p-4">
        <p className="text-sm leading-snug font-medium text-neutral-100">
          <HighlightedQuote quote={clip.quote} range={phraseRange} />
        </p>
        <p className="text-xs text-neutral-400">
          <span className="font-semibold text-neutral-300">{clip.character}</span>
          {' \u00b7 '}
          {clip.title} ({clip.year})
        </p>
      </CardContent>
    </Card>
  )
}
