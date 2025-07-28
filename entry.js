import initSwc, { transformSync } from '@swc/wasm-web'

self.registerTs = (
  config = { react: { runtime: 'automatic', importSource: 'react' } },
  isDebug = false,
) => {
  initSwc()

  const headers = new Headers({
    'Content-Type': 'application/javascript',
    'Cache-Control': `max-age=${isDebug ? 0 : 300}`,
  })

  // this is needed to activate the worker immediately without reload
  // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
  })

  self.addEventListener('message', (event) => {
    config = event.data.config
    console.log('received config', config)
  })

  self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    if (
      url.pathname.endsWith('.ts')
      || url.pathname.endsWith('.tsx')
      || url.pathname.endsWith('.jsx')
    ) {
      const filename = url.pathname.split('/').pop().replace(/\.jsx$/, '.tsx')
      event.respondWith((async () => {
        const res = await fetch(url.toString(), {
          cache: isDebug ? 'no-cache' : 'default',
        })
        const body = await res.text()
        const { code } = transformSync(body, {
          filename,
          jsc: { transform: config },
        })
        return new Response(code, { headers })
      })())
    }
  })
}
