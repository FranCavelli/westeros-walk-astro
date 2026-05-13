// =========================================================
//  Firebase config — leída desde .env (variables PUBLIC_*)
// =========================================================
//
// Las variables se cargan de C:\...\westeros-walk-astro\.env
// y se exponen al cliente vía Vite gracias al prefijo PUBLIC_.
// Cambialas ahí, NO acá. El .env está en .gitignore para que no
// suba al repo. Si publicás el proyecto, dejá .env.example como
// referencia.
//
// Nota: en Firebase Web la apiKey NO es secreta — la seguridad
// vive en las Security Rules del Realtime Database.

const env = import.meta.env;

export const firebaseConfig = {
  apiKey:            env.PUBLIC_FIREBASE_API_KEY,
  authDomain:        env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL:       env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId:         env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             env.PUBLIC_FIREBASE_APP_ID,
  measurementId:     env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const DEFAULT_ROOM = env.PUBLIC_DEFAULT_ROOM || "camino-real";
