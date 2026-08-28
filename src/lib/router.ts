import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

let routerInstance: AppRouterInstance | null = null;

export function setRouter(router: AppRouterInstance): void {
  routerInstance = router;
}

export function getRouter(): AppRouterInstance | null {
  return routerInstance;
}
