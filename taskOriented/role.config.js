var config = {
    worker: {
        1: {
            num: 3,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 5,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        },
        3: {
            num: 5,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        },
        4: {
            num: 6,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        },
        5: {
            num: 6,
            mod: [WORK,WORK,CARRY,MOVE,MOVE]
        }
    },
    carrier: {
        1: {
            num: 2,
            mod: [CARRY,CARRY,MOVE]
        },
        2: {
            num: 4,
            mod: [CARRY,CARRY,CARRY,MOVE,MOVE]
        },
        3: {
            num: 4,
            mod: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        },
        4: {
            num: 4,
            mod: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        },
        5: {
            num: 4,
            mod: [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        }
    },
    harvesterpro: {
        1: {
            num: 4,
            mod: [WORK,MOVE]
        },
        2: {
            num: 4,
            mod: [WORK,WORK,WORK,MOVE]
        },
        3: {
            num: 4,
            mod: [WORK,WORK,WORK,MOVE]
        }
    },
}

module.exports = config;