export function assetPath(path) {
  return `${import.meta.env?.BASE_URL ?? '/'}${path.replace(/^\//, '')}`
}

export function absoluteAssetPath(path) {
  return new URL(assetPath(path), document.baseURI).href
}
