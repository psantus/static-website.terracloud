/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
