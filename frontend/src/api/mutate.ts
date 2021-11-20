export default async function (
  url: string,
  method: 'POST' | 'PUT',
  body: any,
): Promise<Response> {
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}
