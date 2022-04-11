var config = {
    harvester: {
        1: {
            num: 6,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 6,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        }
    },
    upgrader: {
        1: {
            num: 2,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 2,
            mod: [CARRY,CARRY,WORK,MOVE,MOVE]
        }
    },
    builder: {
        1: {
            num: 2,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 2,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        }
    },
    carrier: {
        1: {
            num: 0,
            mod: [CARRY,CARRY,MOVE]
        },
        2: {
            num: 1,
            mod: [CARRY,CARRY,CARRY,MOVE,MOVE]
        }
    }
}

module.exports = config;