export const BASE_URL: string = 'http://localhost:5000'

export async function fetcher<T>(key: string): Promise<T> {
  return fetch(`${BASE_URL}${key}`).then((res) => res.json())
}
