/// <reference types="vite/client" />

// Node 20.11+ import.meta.dirname (used in vite.config.ts)
interface ImportMeta {
  readonly dirname?: string;
}
