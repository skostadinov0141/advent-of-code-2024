import {getInput} from "../composables";

function checkReport(line: string): boolean | number[]{
  const elements = line.split(' ').map(element => parseInt(element));
  let i = 0;
  let lastDistance: number | undefined = undefined;
  let wrongPositions: number[] = []
  while(true){
    if (i == elements.length - 1) break;
    const currentDistance = elements[i] - elements[i+1];
    if (currentDistance === 0){
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    if (lastDistance === undefined) lastDistance = currentDistance
    if (Math.abs(currentDistance) > 3) {
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    if ((lastDistance > 0 && currentDistance < 0)) {
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    if (lastDistance < 0 && currentDistance > 0) {
      wrongPositions.push(i);
      i++
      lastDistance = currentDistance
      continue
    }
    lastDistance = currentDistance
    i++;
  }
  if (wrongPositions.length === 0) return true
  return wrongPositions
}

export function day2part1(): number {
  const input = getInput(2);
  const lines = input.split('\n');

  let result: number = 0;

  lines.forEach((line) => {
    const res = checkReport(line);
    if (res === true) result++
  })

  return result;
}

export function day2part2(): number {
  const input = getInput(2);
  const lines = input.split('\n');

  let result: number = 0;

  lines.forEach((line) => {
    const checkRes = checkReport(line);
    console.log(line, checkRes)
    if (checkRes === true) result++;
    else {
      const elements = line.split(' ').map(element => parseInt(element));
      let foundSolution = false;
      (checkRes as number[]).forEach((pos, index) => {
        const newLine = [...elements].splice(pos,1).join(' ')
        const checkRes = checkReport(newLine);
        if (checkRes === true) {
          foundSolution = true
        }
      })
      if (foundSolution) result++
    }
  })

  return result;
}