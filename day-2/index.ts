import {getInput} from "../composables";

function removeElement(index: number, elementsArr: number[]){
  const copyArr = [...elementsArr]
  copyArr.splice(index,1)
  return copyArr.join(' ')
}

function checkReport(line: string, blockRecursion: boolean = false): boolean | number[]{
  const elements = line.split(' ').map(element => parseInt(element));
  let i = 0;
  let lastDistance: number | undefined = undefined;
  let wrongPositions: number[] = []
  while(true){
    if (i == elements.length - 1) break;
    const currentDistance = elements[i] - elements[i+1];
    if (currentDistance === 0){
      if(!blockRecursion){
        const res = checkReport(removeElement(i, elements), true)
        if (res === true) return true
      }
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    if (lastDistance === undefined) lastDistance = currentDistance

    if (Math.abs(currentDistance) > 3) {
      if(!blockRecursion){
        const res = checkReport(removeElement(i, elements), true)
        if (res === true) return true
      }
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    if ((lastDistance > 0 && currentDistance < 0)) {
      if(!blockRecursion){
        const res = checkReport(removeElement(i, elements), true)
        if (res === true) return true
      }
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    if (lastDistance < 0 && currentDistance > 0) {
      if(!blockRecursion){
        const res = checkReport(removeElement(i, elements), true)
        if (res === true) return true
      }
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    lastDistance = currentDistance
    i++;
  }
  return wrongPositions.length === 0;
}

export function day2part1(): number {
  const input = getInput(2);
  const lines = input.split('\n');

  let result: number = 0;

  lines.forEach((line) => {
    const res = checkReport(line, true);
    if (res === true) result++
  })

  return result;
}

export function day2part2(): number {
  const input = getInput(2);
  const lines = input.split('\n');

  let result: number = 0;

  lines.forEach((line) => {
    const res = checkReport(line);
    if (res === true) result++
  })

  return result;
}