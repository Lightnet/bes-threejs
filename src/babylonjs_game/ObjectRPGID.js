
export class ObjectRPGID{
	constructor(args){
		this.hashid = "";
		this.id = "";
		this.name = "none";
		this.description = "none";
        this.objtype = "none";
        this.gundbid = "";
		if(args !=null){
			if(args['name'] !=null){
				this.name = args['name'];
			}
			if(args['id'] !=null){
				this.name = args['id'];
			}
			if(args['hashid'] !=null){
				this.name = args['hashid'];
			}
		}
	}
}
