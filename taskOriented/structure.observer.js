var Obverser = {
    run: function(obverser){
        var baseRoom = Game.rooms[obverser.room.name];
        var baseRoomMemory = baseRoom.memory;
        // If no power room in memory, create an empty one
        if(!baseRoomMemory.obversed){
            baseRoomMemory.obversed = obverser.room.name;
        }
        if(!baseRoomMemory.obversedRoom || baseRoomMemory.obversedRoom.length == 0){
            baseRoomMemory.obversedRoom = [];
            return;
        }
        if(!Memory.PowerRoom){
            if(Memory.PowerRoom){
                baseRoomMemory.obversed = Memory.PowerRoom;
                obverser.observeRoom(Memory.PowerRoom);
            }else{
                if(Game.rooms[baseRoomMemory.obversed].find(FIND_STRUCTURE, {
                    filter: (s) => {
                        return s.structureType == STRUCTURE_POWERBANK && s.ticksToDecay > 4000;
                    }
                })){
                    Memory.PowerRoom = Game.rooms[baseRoomMemory.obversed];
                    return;
                }
                var index = Game.time % baseRoomMemory.obversedRoom.length;
                baseRoomMemory.obversed = baseRoomMemory.obversedRoom[index];
                obverser.observeRoom(baseRoomMemory.obversedRoom[index]);
            }
        }
    }
}

module.exports = Obverser;