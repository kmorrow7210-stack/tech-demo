import type { DialogueClip } from '@/data/corpus'

export interface ClipMatch {
  clip: DialogueClip
  /** [start, end) range of the phrase match within the quote, if any */
  phraseRange: [number, number] | null
  score: number
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
}

/**
 * Rank clips against a query. A whole-phrase hit in the quote scores
 * highest, then all-words-in-quote, then matches on title/character.
 */
export function searchClips(clips: DialogueClip[], rawQuery: string): ClipMatch[] {
  const query = normalize(rawQuery.trim())
  if (!query) return []

  const words = query.split(/\s+/).filter(Boolean)
  const matches: ClipMatch[] = []

  for (const clip of clips) {
    const quote = normalize(clip.quote)
    const meta = normalize(`${clip.title} ${clip.character}`)

    const phraseIndex = quote.indexOf(query)
    if (phraseIndex >= 0) {
      matches.push({
        clip,
        phraseRange: [phraseIndex, phraseIndex + query.length],
        score: 100 + query.length,
      })
      continue
    }

    const wordsInQuote = words.filter((w) => quote.includes(w)).length
    if (words.length > 0 && wordsInQuote === words.length) {
      matches.push({ clip, phraseRange: null, score: 50 + wordsInQuote })
      continue
    }

    if (meta.includes(query)) {
      matches.push({ clip, phraseRange: null, score: 10 })
    }
  }

  return matches.sort((a, b) => b.score - a.score)
}
