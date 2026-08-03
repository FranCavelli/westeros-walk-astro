// config desde .env (prefijo PUBLIC_), la seguridad real está en las rules

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
