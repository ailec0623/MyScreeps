var config = {
    harvester: {
        1: {
            num: 4,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 6,
            mod: [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
        }
    },
    upgrader: {
        1: {
            num: 2,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 4,
            mod: [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
        }
    },
    builder: {
        1: {
            num: 3,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 4,
            mod: [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
        }
    },
    carrier: {
        1: {
            num: 0,
            mod: [CARRY,CARRY,MOVE]
        },
        2: {
            num: 1,
            mod: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
        }
    }
}

module.exports = config;