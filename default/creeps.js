var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCarrier = require('role.carrier');
var roleFixer = require('role.fixer');
var roleHarvesterPro = require('role.harvesterpro');
var rolePicker = require('role.picker');

var Creeps = {
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'carrier') {
                roleCarrier.run(creep);
            }
            if(creep.memory.role == 'fixer') {
                roleFixer.run(creep);
            }
            if(creep.memory.role == 'harvesterpro') {
                roleHarvesterPro.run(creep);
            }
            if(creep.memory.role == 'picker') {
                rolePicker.run(creep);
            }
        }
	}
};

module.exports = Creeps;