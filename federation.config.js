const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'angular-microfrontend-federation-full-fledged',

  // URLs where remote apps serve their remoteEntry.json
  remotes: {
    remote1: 'http://localhost:4300/remoteEntry.json',
    remote2: 'http://localhost:4400/remoteEntry.json',
  },

  exposes: {
    // host uses a standalone root component defined in app.ts
    './Component': './src/app/app.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
  
});
