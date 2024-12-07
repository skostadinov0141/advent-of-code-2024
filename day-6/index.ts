import {getInput} from "../composables";

interface MapProperties{
  currentGuardPos: number[]
  currentGuardDirection: 'up' | 'down' | 'left' | 'right'
  obstaclePositions: number[][]
  mapDimensions: number[]
  visitedPositions: number[][]
}

function generateMap(): MapProperties {
  const input = getInput(6).split('\n')
  const map: MapProperties = {
    currentGuardPos: [],
    currentGuardDirection: "up",
    obstaclePositions: [],
    mapDimensions: [input[0].length, input.length],
    visitedPositions: []
  }
  input.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const currentCharacter = line[x]
      switch (currentCharacter){
        case '#':
          map.obstaclePositions.push([x,y])
          break
        case '^':
          map.currentGuardPos = [x,y]
          break
      }
    }
  })
  return map
}

function renderMap(map: MapProperties){
  let renderResult = ''
  for (let y = 0; y < map.mapDimensions[1]; y++) {
    for (let x = 0; x < map.mapDimensions[0]; x++) {
      const currentLocation = [x,y]
      if (currentLocation[0] === map.currentGuardPos[0] && currentLocation[1] === map.currentGuardPos[1]) {
        switch(map.currentGuardDirection){
          case "up":
            renderResult += '^'
            break;
          case "down":
            renderResult += 'v'
            break;
          case "left":
            renderResult += '<'
            break;
          case "right":
            renderResult += '>'
            break;
        }
      }
      else if (map.obstaclePositions.some(obs => obs[0] === x && obs[1] === y)) renderResult += '#'
      else if (map.visitedPositions.some(pos => pos[0] === x && pos[1] === y)) renderResult += 'X'
      else renderResult += '.'
    }
    renderResult += '\n'
  }
  return renderResult
}

function getNewPos(currentPos: number[], direction: 'up' | 'down' | 'left' | 'right'): number[]{
  const newGuardPos: number[] = [...currentPos]
  switch(direction){
    case "up":
      newGuardPos[1]++
      break;
    case "down":
      newGuardPos[1]--
      break;
    case "left":
      newGuardPos[0]--
      break;
    case "right":
      newGuardPos[0]++
      break;
  }
  return newGuardPos
}

function moveGuard(map: MapProperties){
  // loop until guard leaves area
  let runs = 0
  while(
    map.currentGuardPos[0] != map.mapDimensions[0] - 1 &&
    map.currentGuardPos[1] != map.mapDimensions[1] - 1
  ){
    const newGuardPos: number[] = getNewPos(map.currentGuardPos, map.currentGuardDirection)
    // check if new position would hit an obsticle
    if (map.obstaclePositions.some(obs => obs[0] === newGuardPos[0] && obs[1] === newGuardPos[1])) {
      turnRight(map)
      continue
    }
    if (!map.visitedPositions.some(
      (pos) =>
        pos[0] === newGuardPos[0] && pos[1] === newGuardPos[1])
    ) map.visitedPositions.push(map.currentGuardPos)
    map.currentGuardPos = newGuardPos
    runs++
    console.log(runs)
    if (map.visitedPositions.length % 10 == 0) renderMap(map)
  }
}

function turnRight(map: MapProperties){
  switch (map.currentGuardDirection){
    case "up":
      map.currentGuardDirection = "right"
      break;
    case "down":
      map.currentGuardDirection = "left"
      break;
    case "left":
      map.currentGuardDirection = "up"
      break;
    case "right":
      map.currentGuardDirection = "down"
      break;
  }
}

export function day6part1(){
  let map = generateMap()
  moveGuard(map)
  return map.visitedPositions.length
}