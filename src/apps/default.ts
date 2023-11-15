import type { ApplicationFunctionOptions, Probot } from "../index";
import { loadPackageJson } from "../helpers/load-package-json";
import { resolve } from "path";

import { probotView } from "../views/probot";

export function defaultApp(
  _app: Probot,
  { getRouter, cwd = process.cwd() }: ApplicationFunctionOptions,
) {
  if (!getRouter) {
    throw new Error("getRouter() is required for defaultApp");
  }

  const pkg = loadPackageJson(resolve(cwd, "package.json"));
  const probotViewRendered = probotView({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  });
  const router = getRouter();

  router.get("/probot", (_req, res) => {
    res.send(probotViewRendered);
  });

  router.get("/", (_req, res) => res.redirect("/probot"));
}
