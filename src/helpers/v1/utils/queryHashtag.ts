export function QueryHashtagUnique(id: string) {
  const strWithoutHyphens = id.split('-').join('').toUpperCase()
  return strWithoutHyphens
}
