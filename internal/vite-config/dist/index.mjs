import jiti from "file:///Users/zhaobo/dashboard/node_modules/.pnpm/jiti@1.21.0/node_modules/jiti/lib/index.js";

/** @type {import("/Users/zhaobo/dashboard/internal/vite-config/src/index")} */
const _module = jiti(null, {
  "esmResolve": true,
  "interopDefault": true,
  "alias": {
    "@vben/vite-config": "/Users/zhaobo/dashboard/internal/vite-config"
  }
})("/Users/zhaobo/dashboard/internal/vite-config/src/index.ts");

export const defineApplicationConfig = _module.defineApplicationConfig;
export const definePackageConfig = _module.definePackageConfig;