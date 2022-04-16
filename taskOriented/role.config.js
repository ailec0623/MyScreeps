var config = {
    worker: {
        1: {
            num: 3,
            mod: [WORK,CARRY,MOVE]
        },
        2: {
            num: 6,
            mod: [WORK,WORK,CARRY,MOVE]
        },
        3: {
            num: 5,
            mod: [WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE]
        },
        4: {
            num: 4,
            mod: [WORK,WORK,WORK
                ,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE]
        },
        5: {
            num: 4,
            mod: [WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE]
        }
    },
    carrier: {
        1: {
            num: 2,
            mod: [CARRY,CARRY,MOVE]
        },
        2: {
            num: 1,
            mod: [CARRY,CARRY,CARRY,MOVE]
        },
        3: {
            num: 2,
            mod: [CARRY,CARRY,CARRY,MOVE]
        },
        4: {
            num: 3,
            mod: [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
        },
        5: {
            num: 3,
            mod: [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
        }
    },
    harvesterpro: {
        1: {
            num: 3,
            mod: [WORK,MOVE]
        },
        2: {
            num: 3,
            mod: [WORK,WORK,MOVE]
        },
        3: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE]
        },
        4: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE]
        },
        5: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE]
        }
    },
}

module.exports = config;