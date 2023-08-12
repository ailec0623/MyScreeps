var config = {
    worker: {
        auto: {
            num:2,
            base: [WORK,CARRY,MOVE,MOVE],
            extend: [WORK,CARRY,MOVE],
            max: 5
        },
        1: {
            num: 2,
            mod: [WORK,CARRY,MOVE,MOVE]
        },
        2: {
            num: 2,
            mod: [WORK,WORK,CARRY,MOVE,CARRY,MOVE,MOVE]
        },
        3: {
            num: 4,
            mod: [WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE]
        },
        4: {
            num: 3,
            mod: [WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        5: {
            num: 3,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        6: {
            num: 3,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        7: {
            num: 3,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
        8: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
        },
    },
    carrier: {
        auto: {
            num:1,
            base: [CARRY,CARRY,MOVE,MOVE],
            extend: [CARRY,CARRY,MOVE],
            max: 11
        },
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
            mod: [CARRY,CARRY,MOVE,MOVE]
        },
        4: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]
        },
        5: {
            num: 4,
            mod: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY]
        },
        6: {
            num: 4,
            mod:[CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]
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
            mod: [WORK,WORK,MOVE]
        },
        2: {
            num: 4,
            mod: [WORK,WORK,MOVE]
        },
        3: {
            num: 4,
            mod: [WORK,WORK,WORK,MOVE,MOVE]
        },
        4: {
            num: 2,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE]
        },
        5: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]
        },
        6: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
        },
        7: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
        },
        8: {
            num: 4,
            mod: [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
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
        auto: {
            num:1,
            base: [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK],
            extend: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK],
            max: 9
        },
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
    getpower: {
        1: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        2: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        3: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        4: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        5: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        6: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        7: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
        8: {
            num: 5,
            mod: [MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,ATTACK,ATTACK]
        },
    }
}

module.exports = config;