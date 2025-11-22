import fs from "fs";

export function readJSON(path) {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

export function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
