/**
 * NOTE: use only for env variables
 */
interface ImportMetaEnv {
  /**
   * Google Maps API Key
   */
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
