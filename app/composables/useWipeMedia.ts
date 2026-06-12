import { ref } from 'vue'

const BUCKETS = ['portfolio', 'digitals', 'paintings'] as const
const TABLES = ['photos', 'digitals', 'paintings'] as const

/**
 * One-shot maintenance helper: deletes EVERY row from the image tables and
 * EVERY file from the storage buckets. Irreversible. Intended for clearing out
 * old un-optimised media before re-uploading.
 */
export function useWipeMedia() {
  const supabase = useSupabase()
  const busy = ref(false)
  const log = ref<string[]>([])

  function note(msg: string) { log.value.push(msg) }

  async function emptyBucket(bucket: string) {
    // Storage has no "delete all" — list everything, then remove by path.
    let removed = 0
    // Paginate in case there are many files.
    for (;;) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list('', { limit: 1000, sortBy: { column: 'name', order: 'asc' } })

      if (error) { note(`✗ ${bucket}: list failed — ${error.message}`); return }
      if (!data || data.length === 0) break

      // Only real files have an id; skip folder placeholders.
      const paths = data.filter(f => f.id).map(f => f.name)
      if (paths.length === 0) break

      const { error: rmErr } = await supabase.storage.from(bucket).remove(paths)
      if (rmErr) { note(`✗ ${bucket}: remove failed — ${rmErr.message}`); return }

      removed += paths.length
      if (data.length < 1000) break
    }
    note(`✓ ${bucket}: ${removed} file(s) deleted`)
  }

  async function wipeAll() {
    if (busy.value) return
    busy.value = true
    log.value = []

    // 1. Empty storage buckets
    for (const bucket of BUCKETS) {
      await emptyBucket(bucket)
    }

    // 2. Delete all table rows (neq impossible id → matches every row)
    for (const table of TABLES) {
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')
      note(error ? `✗ ${table}: ${error.message}` : `✓ ${table}: rows cleared`)
    }

    busy.value = false
  }

  return { busy, log, wipeAll }
}
