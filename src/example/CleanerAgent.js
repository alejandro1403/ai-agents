const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);

        this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,1,0": "UP",
            "0,0,1,0,0": "UP",
            "0,0,1,1,0": "UP", //
            "0,1,0,0,0": "DOWN",
            "0,1,0,1,0": "RIGHT", //
            "0,1,1,0,0": "DOWN",
            "0,1,1,1,0": "LEFT",
            "1,0,0,0,0": "UP",
            "1,0,0,1,0": "RIGHT", //
            "1,0,1,0,0": "UP", //
            "1,0,1,1,0": "UP", //
            "1,1,0,0,0": "RIGHT", //
            "1,1,0,1,0": "RIGHT", //
            "1,1,1,0,0": "DOWN",
            "default": "TAKE"
        };
        /*//Mapa axuliar
        globalThis.track = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1]]
        */
        globalThis.flag = "";
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        
        /*//llenar mapa auxiliar
        var x = JSON.stringify(this.initialState).charAt(5)
        var y = JSON.stringify(this.initialState).charAt(11)
        track[y][x] = 1*/

        let viewKey = this.perception;
       
        switch(flag){
            case "UP":
                viewKey[3] = 1;
                break;
            case "DOWN":
                viewKey[1] = 1;
                break;
            case "LEFT":
                viewKey[2] = 1;
                break;
            case "RIGHT":
                viewKey[0] = 1;
                break;
            default:
                break;
        }

        //let action = foo(this.internalState, this.perception)
        //this.internalState = updatex(this.internalState, this.perception, action)
        //return action;
        
        if (this.table[viewKey]) {
            flag = this.table[viewKey];
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }
    };
}

module.exports = CleanerAgent;