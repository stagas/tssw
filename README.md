# tssw

TypeScript in the browser, no build step, using a Service Worker.


## Usage

Create a Service Worker and put it at the root of your static directory.

### `/sw.js`:
```js
importScripts('https://unpkg.com/tssw@1.0.0/bundle.js')

self.registerTs({
  react: {
    runtime: 'automatic',
    importSource: 'react'
  }
})
```
> For available options visit swc [jsc.transform docs](https://swc.rs/docs/configuration/compilation#jsctransform).

Register it and you're ready to import TypeScript files.

```html
<!-- Register the Service Worker -->
<script>navigator.serviceWorker.register('/sw.js')</script>

<!-- Scripts with extensions .ts and .tsx will be transpiled automagically -->
<script type="module" src="./script.tsx"></script>
```

## Support

<a href="https://www.buymeacoffee.com/stagas" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License

MIT
