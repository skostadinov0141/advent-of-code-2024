import * as fs from "node:fs";

export function day1part1() {
  const input: string = fs.readFileSync('./day-1/input.txt', 'utf-8');
  const parsedInput: string[] = input.split('\n')

  // generate lists
  const list1 = parsedInput.map(line => {
    const lineParts = line.split(' ')
    return parseInt(lineParts[0].trim());
  });
  const list2 = parsedInput.map(line => {
    const lineParts = line.split(' ')
    return parseInt(lineParts[3].trim());
  });
  // console.log(list2)

  // sort lists
  const sortedList1 = list1.sort((a,b) => a - b)
  const sortedList2 = list2.sort((a,b) => a - b)

  // ensure lengths are the same
  if(sortedList1.length != sortedList2.length) {
    console.log('List lengths do not match!')
    return
  }

  // calculate distances
  const distances = sortedList1.map((item, index) => {
    if (item > sortedList2[index]){
      return item - sortedList2[index]
    }
    return sortedList2[index] - item
  })

  // calculate total distance
  let totalDistance = 0
  distances.forEach(distance => totalDistance += distance)

  return totalDistance
}