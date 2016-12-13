(function() {
    WaterMaterial = function (name, scene, light) {
        this.name = name;
        this.id = name;
        this.light = light;
 
        this._scene = scene;
        scene.materials.push(this);
    };
 
    WaterMaterial.prototype = Object.create(BABYLON.Material.prototype);
 
    // Properties   
    WaterMaterial.prototype.needAlphaBlending = function () {
        return false;
    };
 
    WaterMaterial.prototype.needAlphaTesting = function () {
        return false;
    };
 
    // Methods  
    WaterMaterial.prototype.isReady = function (mesh) {
        return true;
    };
 
    WaterMaterial.prototype.bind = function (world, mesh) {
    };
 
    WaterMaterial.prototype.dispose = function () {
        this.baseDispose();
    };
})();