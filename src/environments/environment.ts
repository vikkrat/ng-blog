// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyAIpFhCrZ6F7TmIqgBV1jPK_zeqiS_cD4c',
  fbDbUrl: 'https://ng-blog-5fcef.firebaseio.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>
//
//   <!-- TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
//
//   <script>
// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyAIpFhCrZ6F7TmIqgBV1jPK_zeqiS_cD4c",
//   authDomain: "ng-blog-5fcef.firebaseapp.com",
//   databaseURL: "https://ng-blog-5fcef.firebaseio.com",
//   projectId: "ng-blog-5fcef",
//   storageBucket: "ng-blog-5fcef.appspot.com",
//   messagingSenderId: "607404658025",
//   appId: "1:607404658025:web:617104a292efd1ee5ec1f8"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// </script>
