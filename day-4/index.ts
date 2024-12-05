import {getInput} from "../composables";

export function day4part1(){
  // read input
  // const input = getInput(4).replace(/(\r\n|\n|\r)/gm, "");
  const input = getInput(4);
  // console.log(input)

  let result = 0

  // regex
  const tbDiagonal = /(?=(X)[A-Z\n]{141}(M)[A-Z\n]{141}(A)[A-Z\n]{141}(S))/gm
  const tbDiagonalInverse = /(?=(S)[A-Z\n]{141}(A)[A-Z\n]{141}(M)[A-Z\n]{141}(X))/gm
  const btDiagonal = /(?=(X)[A-Z\n]{139}(M)[A-Z\n]{139}(A)[A-Z\n]{139}(S))/gm
  const btDiagonalInverse = /(?=(S)[A-Z\n]{139}(A)[A-Z\n]{139}(M)[A-Z\n]{139}(X))/gm

  const tb = /(?=(S)[A-Z\n]{140}(A)[A-Z\n]{140}(M)[A-Z\n]{140}(X))/gm
  const tbInverse = /(?=(X)[A-Z\n]{140}(M)[A-Z\n]{140}(A)[A-Z\n]{140}(S))/gm

  const ltr = /(?=(XMAS))/gm
  const ltrInverse = /(?=(SAMX))/gm

  const matchesCount = [
    [...input.matchAll(tbDiagonal)].length,
    [...input.matchAll(tbDiagonalInverse)].length,
    [...input.matchAll(btDiagonal)].length,
    [...input.matchAll(btDiagonalInverse)].length,
    [...input.matchAll(tb)].length,
    [...input.matchAll(tbInverse)].length,
    [...input.matchAll(ltr)].length,
    [...input.matchAll(ltrInverse)].length,
  ]

  matchesCount.forEach(count => result += count)

  return result
}

export function day4part2(){
  const input = getInput(4);

  let result = 0;

  // regex
  const regex1 = /(?=(S)[A-Z\n]{1}(S)[A-Z\n]{139}(A)[A-Z\n]{139}(M)[A-Z\n]{1}(M))/gm;
  const regex2 = /(?=(M)[A-Z\n]{1}(M)[A-Z\n]{139}(A)[A-Z\n]{139}(S)[A-Z\n]{1}(S))/gm;
  const regex3 = /(?=(S)[A-Z\n]{1}(M)[A-Z\n]{139}(A)[A-Z\n]{139}(S)[A-Z\n]{1}(M))/gm;
  const regex4 = /(?=(M)[A-Z\n]{1}(S)[A-Z\n]{139}(A)[A-Z\n]{139}(M)[A-Z\n]{1}(S))/gm;

  const matchesCount = [
    [...input.matchAll(regex1)].length,
    [...input.matchAll(regex2)].length,
    [...input.matchAll(regex3)].length,
    [...input.matchAll(regex4)].length,
  ]

  matchesCount.forEach(count => result += count)
  return result
}