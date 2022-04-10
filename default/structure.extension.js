var Extension = {
    build: function(room, pos) {
        var capacity = (room.controller.level - 1) * 5;
        var extensions = _.filter(room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_EXTENSION);
        if(room.find(FIND_MY_CONSTRUCTION_SITES) < 1 && extensions.length < capacity){
            var pos = this.bestPosition(room, pos);
            pos.createConstructionSite(STRUCTURE_EXTENSION);
        }
    },
    bestPosition: function(room, position){
        var searched = [];
        var todo = [position];
        var t = room.getTerrain()
        while(todo.length != 0){
            var cur = todo.shift();
            searched.push(cur);
            var structures = cur.lookFor(LOOK_STRUCTURES);
            if(t.get(cur.x, cur.y) != TERRAIN_MASK_WALL && (structures.length == 0 || (structures.length == 1 && structures[0].structureTypestring == STRUCTURE_ROAD))){
                return cur;
            }else{
                if(room.getPositionAt(cur.x - 1, cur.y)){
                    todo.push(room.getPositionAt(cur.x - 1, cur.y));
                }
                if(room.getPositionAt(cur.x + 1, cur.y)){
                    todo.push(room.getPositionAt(cur.x + 1, cur.y));
                }
                if(room.getPositionAt(cur.x, cur.y - 1)){
                    todo.push(room.getPositionAt(cur.x, cur.y - 1));
                }
                if(room.getPositionAt(cur.x, cur.y + 1)){
                    todo.push(room.getPositionAt(cur.x, cur.y + 1));
                }
            }
            
        }
    }
}

module.exports = Extension;