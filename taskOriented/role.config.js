var config = {
    worker: {
        1: {
            num: 3,
            mod: [WORK,WORK,CARRY,MOVE]
        },
        2: {
            num: 5,
            mod: [WORK,WORK,CARRY,MOVE,CARRY,MOVE,MOVE]
        },
        3: {
            num: 6,
            mod: [WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE]
        },
        4: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        5: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        6: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        7: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        8: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
    },
    carrier: {
        1: {
            num: 2,
            mod: [CARRY,CARRY,MOVE]
        },
        2: {
            num: 2,
            mod: [CARRY,CARRY,CARRY,MOVE]
        },
        3: {
            num: 2,
            mod: [CARRY,CARRY,CARRY,MOVE]
        },
        4: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY]
        },
        5: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY]
        },
        6: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]
        },
        7: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]
        },
        8: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]
        },
    },
    harvesterpro: {
        1: {
            num: 4,
            mod: [WORK,MOVE]
        },
        2: {
            num: 4,
            mod: [WORK,WORK,MOVE]
        },
        3: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE]
        },
        4: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]
        },
        5: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]
        },
        6: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        },
        7: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        },
        8: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]
        },
    },
    reserver: {
        1: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        2: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        3: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        4: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        5: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        6: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        7: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
        8: {
            num: 0,
            mod: [CLAIM,CLAIM,MOVE,MOVE]
        },
    },

    guard: {
        1: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        2: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        3: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        4: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        5: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        6: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        7: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
        8: {
            num: 0,
            mod: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
        },
    },
}

module.exports = config;