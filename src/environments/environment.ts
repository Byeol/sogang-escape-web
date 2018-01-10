// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDFGoo38wyNBn3YmOJh3jSHfBzoRO49lDs',
    authDomain: 'sogang-escape.firebaseapp.com',
    databaseURL: 'https://sogang-escape.firebaseio.com',
    projectId: 'sogang-escape',
    storageBucket: 'sogang-escape.appspot.com',
    messagingSenderId: '754385395907'
  }
};
