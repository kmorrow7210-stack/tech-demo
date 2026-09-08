import { useMemo, useState } from 'react'
import { Clapperboard, SearchX } from 'lucide-react'
import { ClipCard } from '@/components/clip-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { corpus } from '@/data/corpus'
import { searchClips } from '@/lib/search'

const SUGGESTIONS = [
  'I\u2019ll be back',
  'bigger boat',
  'winter is coming',
  'box of chocolates',
  'the one who knocks',
]

export default function App() {
  const [query, setQuery] = useState('')
  const trimmed = query.trim()
  const results = useMemo(() => searchClips(corpus, trimmed), [trimmed])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-amber-300">
            <Clapperboard className="size-7" aria-hidden />
            <h1 className="text-3xl font-bold tracking-tight">ClipQuote</h1>
          </div>
          <p className="text-sm text-neutral-400">
            Type a line of dialogue, find the scene. A tiny Yarn-inspired demo
            over {corpus.length} famous movie &amp; TV quotes.
          </p>
        </header>

        <div className="mx-auto mb-4 flex max-w-xl gap-2">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={'Try \u201cmay the force be with you\u201d\u2026'}
            aria-label="Search dialogue"
            className="h-11 border-neutral-700 bg-neutral-900 text-base placeholder:text-neutral-500"
          />
          {query && (
            <Button
              variant="secondary"
              className="h-11"
              onClick={() => setQuery('')}
            >
              Clear
            </Button>
          )}
        </div>

        <div className="mx-auto mb-10 flex max-w-xl flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <Button
              key={s}
              variant="outline"
              size="sm"
              className="rounded-full border-neutral-700 bg-transparent text-xs text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
              onClick={() => setQuery(s)}
            >
              {s}
            </Button>
          ))}
        </div>

        {trimmed === '' ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-neutral-500">
            <Clapperboard className="size-10" aria-hidden />
            <p className="text-sm">
              Search a phrase to pull up matching clips, or tap a suggestion
              above.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-neutral-500">
            <SearchX className="size-10" aria-hidden />
            <p className="text-sm">
              No clips match &ldquo;{trimmed}&rdquo;. Try a shorter phrase or one
              of the suggestions.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-xs tracking-wide text-neutral-500 uppercase">
              {results.length} clip{results.length === 1 ? '' : 's'} found
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((m) => (
                <ClipCard key={m.clip.id} match={m} />
              ))}
            </div>
          </>
        )}

        <footer className="mt-16 text-center text-xs text-neutral-600">
          Demo only — mock thumbnails and timestamps, no real clips. Inspired by
          Yarn-style dialogue search.
        </footer>
      </main>
    </div>
  )
}
