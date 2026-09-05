import { useEffect, useState } from 'react'

/**
 * useFetch — a small custom hook that fetches JSON from a URL and tracks
 * loading / error / data state for you.
 *
 * @param {string} url - the resource to fetch
 * @returns {{ data: any, loading: boolean, error: Error | null }}
 *
 * Notes:
 * - Refetches whenever `url` changes.
 * - Uses an AbortController so an in-flight request is cancelled if the
 *   component unmounts or the url changes before the response arrives,
 *   which prevents state updates on an unmounted component.
 */
export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function run() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }
        const json = await res.json()
        setData(json)
      } catch (err) {
        // Aborting is expected during cleanup, so don't surface it as an error.
        if (err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        // Only flip loading off if we weren't aborted.
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    run()

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
