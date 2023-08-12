Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,WORK, MOVE, CARRY, MOVE,], 'init'+ Game.time, {room:'E41N24', memory: { role: 'initializer', level: 1, inTask: true }})
Game.spawns['Spawn1'].spawnCreep([MOVE], 'm', {room:'E41N22', memory: { role: 'm', level: 1, inTask: true }})
Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE, MOVE],'CLAIM', {room:'E42N21', memory: { role: 'claimer', level: 1, inTask: true }})
Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE],'a',{memory:{role:'a',level:1,inTask:true}})
Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK],'getpower4',{memory:{role:'getpower',level:1,inTask:true}})
Game.spawns['Spawn2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK],'getpower5',{memory:{role:'getpower',level:1,inTask:true}})

Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE], 'init' + Game.time, {room:'E41N24', memory: { role: 'initializer', level: 1, inTask: true }})
Game.spawns['Spawn2'].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, MOVE, MOVE], 'init' + Game.time, {room:'E41N24', memory: { role: 'initializer', level: 1, inTask: true }})


Game.spawns['Spawn5'].spawnCreep([CARRY,CARRY,MOVE], 'carrier'+ Game.time, {memory: {room:'E42N21', role: 'carrier', level: 1, inTask: false }})
for(let r in Memory.mainRooms){
    Memory.rooms[r].tasks.spawn = []
}
Game.spawns['Spawn5'].spawnCreep([MOVE], 'm', {room:'E42N21', memory: { role: 'm', level: 1, inTask: true }})

Game.spawns['Spawn5'].spawnCreep([WORK, MOVE,WORK, MOVE,WORK, MOVE], 'a'+ Game.time, {room:'E41N22', memory: { role: 'a', level: 1, inTask: true }})
