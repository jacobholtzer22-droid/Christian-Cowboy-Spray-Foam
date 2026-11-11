Tracking install. Write this tracking block into site.config.ts as the `tracking` key, exactly as given, and change nothing else (AGENT.md, CI mode, Tracking installs):

```ts
tracking: {
  googleAdsId: 'AW-18527362419',
  conversions: { form: 'AW-18527362419/ZLcxCKHI2bAdEPO6xIJF', call: 'AW-18527362419/0s00CP2x7bUdEPO6xIJF' },
},
```

Then run the gate: check 22 must pass.