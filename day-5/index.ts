import {getInput} from "../composables";

interface InputParts {
  rules: number[][],
  printers: string[],
}

function parseInput(): InputParts{
  const input = getInput(5);
  const inputSplit = input.split('\n\n')
  return {
    rules: inputSplit[0].split('\n').map(item => item.split('|').map(item1 => parseInt(item1))),
    printers: inputSplit[1].split('\n'),
  }
}

function generateRuleRegex(rule: number[]){
  return new RegExp(String.raw`((?<=${rule[1]}).*?${rule[0]})`, 'gm')
}

function getApplicableRules(rules: number[][], printer:string){
  const applicableRules: number[][][] = []
  const printerList = printer.split(',').map(item => parseInt(item))

  printerList.forEach(printerItem => {
    applicableRules.push(
      rules.filter(rule => {
        return rule[0] == printerItem
      })
    )
  })

  return applicableRules
}

function testPrinter(applicableRule: number[][][], printer: string){
  const printerElements = printer.split(',').map(item => parseInt(item))
  const startIndex = printerElements.length - 1

  for (let i = startIndex; i > 0; i--) {
    const elementRelatedRules = applicableRule[i]
    for (let rule of elementRelatedRules){
      const ruleRegex = generateRuleRegex(rule)
      const valid = printer.match(ruleRegex) === null
      if (!valid) return false// console.log(`Rule ${rule} is applicable to ${printer}`)
      // else console.log(`Rule ${rule} is NOT applicable to ${printer}`)
    }
  }
  return true
}

export function day5part1(){
  const parsedInput = parseInput()

  // array 1 = printer number
  // array 2 = printer element
  // array 3 = applicable rule to element
  // array 4 = rule element
  const applicableRulesList: number[][][][]
    = parsedInput.printers.map(printer => getApplicableRules(parsedInput.rules, printer))

  const correctPrinter: string[] = []
  // TODO: Create a fix order function
  const wrongPrinter: string[] = []

  for (let i = 0; i < applicableRulesList.length; i++) {
    const printer = parsedInput.printers[i]
    const applicableRules = applicableRulesList[i]
    const result = testPrinter(applicableRules, printer)
    if(result) correctPrinter.push(printer)
    else wrongPrinter.push(printer)
  }

  let finalResult = 0

  correctPrinter.forEach(printer => {
    const printerElements = printer.split(',').map(item => parseInt(item))
    finalResult += printerElements[Math.round((printerElements.length - 1) / 2)]
  })

  return finalResult
}

export function day5part2(){

}