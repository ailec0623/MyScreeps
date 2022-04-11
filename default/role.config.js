var config = {
    harvester: {
        1: {
            num: 6,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 0,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        }
    },
    upgrader: {
        1: {
            num: 2,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 1,
            mod: [CARRY,CARRY,WORK,MOVE,MOVE]
        }
    },
    builder: {
        1: {
            num: 1,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 3,
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
    },
    fixer: {
        1: {
            num: 0,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 1,
            mod: [WORK,CARRY,CARRY,MOVE,MOVE]
        }
    },
    harvesterpro: {
        1: {
            num: 0,
            mod: [WORK,WORK,MOVE]
        },
        2: {
            num: 4,
            mod: [WORK,WORK,WORK,MOVE]
        }
    },
    picker: {
        1: {
            num: 0,
            mod: [CARRY,CARRY,MOVE]
        },
        2: {
            num: 4,
            mod: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
        }
    },
}

module.exports = config;