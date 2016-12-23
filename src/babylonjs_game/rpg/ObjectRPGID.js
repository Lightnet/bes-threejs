/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

function uuid() {
	var buf = new Uint32Array(4);
	window.crypto.getRandomValues(buf);
	var idx = -1;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		idx++;
		var r = (buf[idx>>3] >> ((idx%8)*4))&15;
		var v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

export class ObjectRPGID{

	static getClass() {
      return 'ObjectRPGID';
    }

	constructor(args){
		args = args || {};
		//args[''] ||
		this.gundbid = args['gundbid'] || "";
		this.uuid = args['uuid'] || uuid();
		this.nameClass = "ObjectRPGID";

		this.hashid = args['hashid'] || "";
		this.id = args['id'] || "";
		this.name = args['name'] || "none";
		this.description = args['description'] || "none";
        this.objtype = args['objtype'] || "none";

		this.params = args['params'] || {};

		this.binteract = args['binteract'] || false;
		this.bused = args['bused'] || false;
		this.bdrop = args['bdrop'] || false;
		this.bthrow = args['bthrow'] || false;
		this.btrigger = args['btrigger'] || false;
		this.events = args['events'] || {};
		this.tag = args['tag'] || "";
		this.children = args['children'] || {};
		this.scripts = args['scripts'] || {};

		this.buyprice = args['buyprice'] || 0;
		this.sellprice = args['sellprice'] || 0;
		this.keywords = args['keywords'] || {};

		this.stack = args['stack'] || 1;
		this.maxstack = args['maxstack'] || 1;
		this.x = args['x'] || 0;
		this.y = args['y'] || 0;
		this.z = args['z'] || 0;
	}
}
