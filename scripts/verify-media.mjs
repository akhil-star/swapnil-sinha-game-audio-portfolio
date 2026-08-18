#!/usr/bin/env node

import { open, readdir, stat } from 'node:fs/promises'
import { extname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.js'
import { youtubeReels } from '../src/data/capturedWorks.js'
import { identity, toolchain } from '../src/data/site.js'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const required = new Set([
  'artwork/verdant-ember-ringworld-backdrop.jpg',
  'cursors/ember-pointer.svg',
  'favicon.svg',
  'media/contact-operator-avatar.jpg',
  'media/obscura-header.jpg',
  new URL(identity.resumePdf, 'https://portfolio.local/').pathname.replace(/^\//, ''),
])

for (const project of projects) {
  if (project.media?.icon?.local) required.add(`media/${project.media.icon.local}`)
  if (project.demoVideo?.src) {
    required.add(
      new URL(project.demoVideo.src, 'https://portfolio.local/').pathname.replace(/^\//, ''),
    )
  }
  for (const shot of project.media?.shots ?? []) required.add(`media/${shot.local}`)
}

for (const reel of youtubeReels) {
  required.add(new URL(reel.thumbnail, 'https://portfolio.local/').pathname.replace(/^\//, ''))
}

for (const group of toolchain) {
  for (const item of group.items) {
    required.add(new URL(item.logo, 'https://portfolio.local/').pathname.replace(/^\//, ''))
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name)
      return entry.isDirectory() ? walk(path) : path
    }),
  )
  return files.flat()
}

async function readHeader(path, length = 512) {
  const handle = await open(path, 'r')
  try {
    const buffer = Buffer.alloc(length)
    const { bytesRead } = await handle.read(buffer, 0, length, 0)
    return buffer.subarray(0, bytesRead)
  } finally {
    await handle.close()
  }
}

const errors = []
const publicFiles = await walk(publicDir)
const publicPaths = publicFiles.map((path) => relative(publicDir, path).split(sep).join('/'))
const publicPathSet = new Set(publicPaths)
const allowedRoots = new Set([
  'artwork',
  'audio',
  'cursors',
  'favicon.svg',
  'media',
  'resume',
  'tool-logos',
])

for (const relativePath of [...required].sort()) {
  if (!publicPathSet.has(relativePath)) errors.push(`${relativePath} is missing`)
}

for (const [index, path] of publicFiles.entries()) {
  const relativePath = publicPaths[index]
  const root = relativePath.split('/')[0]
  const extension = extname(relativePath).toLowerCase()
  const info = await stat(path)
  const header = await readHeader(path)
  const ascii = (start, end) => header.subarray(start, end).toString('ascii')

  if (!allowedRoots.has(root))
    errors.push(`${relativePath} is outside the documented public folders`)
  if (!info.size) {
    errors.push(`${relativePath} is empty`)
    continue
  }

  if (
    (extension === '.jpg' || extension === '.jpeg') &&
    !header.subarray(0, 3).equals(Buffer.from('ffd8ff', 'hex'))
  ) {
    errors.push(`${relativePath} has a JPEG extension but is not a JPEG file`)
  } else if (
    extension === '.png' &&
    !header.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))
  ) {
    errors.push(`${relativePath} has a PNG extension but is not a PNG file`)
  } else if (extension === '.svg' && !header.toString('utf8').includes('<svg')) {
    errors.push(`${relativePath} has an SVG extension but does not contain SVG markup`)
  } else if (extension === '.pdf' && ascii(0, 5) !== '%PDF-') {
    errors.push(`${relativePath} has a PDF extension but is not a PDF file`)
  } else if (extension === '.wav' && (ascii(0, 4) !== 'RIFF' || ascii(8, 12) !== 'WAVE')) {
    errors.push(`${relativePath} has a WAV extension but is not a WAV file`)
  } else if (
    extension === '.mp3' &&
    ascii(0, 3) !== 'ID3' &&
    !(header[0] === 0xff && (header[1] & 0xe0) === 0xe0)
  ) {
    errors.push(`${relativePath} has an MP3 extension but is not an MP3 file`)
  } else if ((extension === '.m4a' || extension === '.mp4') && ascii(4, 8) !== 'ftyp') {
    errors.push(
      `${relativePath} has an ${extension.slice(1).toUpperCase()} extension but is not an ISO media file`,
    )
  } else if (
    !['.jpg', '.jpeg', '.png', '.svg', '.pdf', '.wav', '.mp3', '.m4a', '.mp4'].includes(extension)
  ) {
    errors.push(`${relativePath} uses unsupported public asset type ${extension || '(none)'}`)
  }
}

if (errors.length) {
  console.error(`Public asset verification failed:\n- ${errors.join('\n- ')}`)
  process.exitCode = 1
} else {
  console.log(
    `Verified ${publicFiles.length} organized public assets and ${required.size} page-critical references.`,
  )
}
