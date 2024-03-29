var tool = {
    run: function () {
        this.getPixels();
        this.cleanCreeps();
    },
    getPixels: function () {
        if (Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
    },

    cleanCreeps: function () {

        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

    }
}

module.exports = tool;