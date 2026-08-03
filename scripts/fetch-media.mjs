#!/usr/bin/env node
/**
 * Downloads every remote image referenced in src/data/projects.js into
 * /public/media, so the site stops depending on Steam and Google Play CDNs.
 *
 *   npm run fetch:media
 *
 * Then set USE_LOCAL_MEDIA = true at the top of src/data/projects.js.
 *
 * Store CDN paths change when a developer re-uploads their assets, which is
 * exactly the kind of thing that breaks while a recruiter is looking at it.
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(here, '../public/media')

const { projects } = await import('../src/data/projects.js')

/** Walk the project data and collect every { remote, local } pair. */
function collect() {
  const found = []
  for (const p of projects) {
    const m = p.media
    if (!m) continue
    for (const key of ['hero', 'header', 'icon']) {
      if (m[key]?.remote) found.push(m[key])
    }
    for (const shot of m.shots ?? []) {
      if (shot.remote) found.push(shot)
    }
  }
  return found
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function download({ remote, local }, index, total) {
  const target = resolve(outDir, local)
  const tag = `[${String(index + 1).padStart(2, '0')}/${total}]`

  if (await exists(target)) {
    console.log(`${tag} skip   ${local} (already present)`)
    return { ok: true, skipped: true }
  }

  try {
    const res = await fetch(remote, {
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio asset fetch)' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 512) throw new Error('response too small to be an image')
    await writeFile(target, buf)
    console.log(`${tag} saved  ${local}  (${(buf.length / 1024).toFixed(0)} KB)`)
    return { ok: true }
  } catch (err) {
    console.error(`${tag} FAILED ${local} — ${err.message}`)
    console.error(`         ${remote}`)
    return { ok: false }
  }
}

const items = collect()
await mkdir(outDir, { recursive: true })

console.log(`Fetching ${items.length} images into public/media\n`)

const results = []
for (const [i, item] of items.entries()) {
  results.push(await download(item, i, items.length))
}

const failed = results.filter((r) => !r.ok).length
const saved = results.filter((r) => r.ok && !r.skipped).length

console.log(`\nDone. ${saved} downloaded, ${failed} failed.`)
if (failed > 0) {
  console.log(
    'A failure usually means the store re-uploaded that asset. Open the store\n' +
      'listing, copy the new image URL, and update the `remote` field in\n' +
      'src/data/projects.js.',
  )
} else {
  console.log('Now set USE_LOCAL_MEDIA = true in src/data/projects.js.')
}
