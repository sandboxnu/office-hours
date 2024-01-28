// Shared functions across queue components. Kinda sad rn pls add :(

export function truncate(string: string, length: number) {
  if (string.length > length) {
    return string.substring(0, length - 3) + '...'
  }
  return string
}
