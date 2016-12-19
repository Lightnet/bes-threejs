/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

export class ObjectRPGID{
	constructor(args){
		args = args || {};
		//args[''] ||
		this.gundbid = args['gundbid'] || "";

		this.hashid = args['hashid'] || "";
		this.id = args['id'] || "";
		this.name = args['name'] || "none";
		this.description = args['description'] || "none";
        this.objtype = args['objtype'] || "none";

		this.params = args['params'] || [];

		this.binteract = args['binteract'] || false;
		this.bused = args['bused'] || false;
		this.bdrop = args['bdrop'] || false;
		this.bthrow = args['bthrow'] || false;
		this.btrigger = args['btrigger'] || false;
		this.events = args['events'] || [];
		this.tag = args['tag'] || "";
		this.children = args['children'] || [];
		this.scripts = args['scripts'] || [];

		this.buyprice = args['buyprice'] || 0;
		this.sellprice = args['sellprice'] || 0;
		this.keywords = args['keywords'] || [];

		this.stack = args['stack'] || 1;
		this.maxstack = args['maxstack'] || 1;
	}
}
