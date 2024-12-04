import {getInput} from "../composables";

function calculateMultiplication(statement: RegExpExecArray){
  const paramsRegex = /([0-9]{1,3})/gm
  const params = [...statement[0].matchAll(paramsRegex)]
  const param1 = parseInt(params[0][0])
  const param2 = parseInt(params[1][0])
  return (param1 * param2)
}

function getCorrectStatements(input: string){
  const regex = /(mul\([0-9]{1,3},[0-9]{1,3}\))/gm;
  return [...input.matchAll(regex)];
}

export function day3part1(){
  // read input
  const input = getInput(3);

  // get correct statements
  const correctStatements = getCorrectStatements(input)

  // calculate sum
  let finalSum = 0;
  correctStatements.forEach((statement) => {
    finalSum += calculateMultiplication(statement)
  })

  return finalSum
}

export function day3part2(){
  // read input
  const input = getInput(3).replace(/(\r\n|\n|\r)/gm, "");

  // regex
  const enabledSegmentRegex = /(((do\(\))|^).*?((don't\(\))|$))/gm

  // global definitions
  let finalSum = 0;

  // evaluate all enabled segments
  const enabledSegments = [...input.matchAll(enabledSegmentRegex)]
  // console.log(enabledSegments[0])
  enabledSegments.forEach(segment => {
    // console.log(segment[0])
    // console.log('\n\n\n')
    const correctStatements = getCorrectStatements(segment[0])
    correctStatements.forEach((statement) => {
      finalSum += calculateMultiplication(statement)
    })
  })

  return finalSum
}