import * as fs from "node:fs";

export function getInput(day: number): string {
  return fs.readFileSync(`./day-${day}/input.txt`, 'utf-8');
}