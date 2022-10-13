import { readFile } from "fs/promises";

export interface PackageJSON {
  version: string;
  repository: string;
}

export async function getCurrentProjectMetadata() {
  const file = await readFile(`${process.cwd()}/package.json`);
  const json: PackageJSON = JSON.parse(file.toString());

  return json;
}
