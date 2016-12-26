/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/
import {Babylonjs_game_module} from '../system/babylonjs_game_module';

export class Babylonjs_game_jqueryui extends Babylonjs_game_module{

    constructor(args){
        super(args);
    }

    create_window_jqui(){

        //console.log("window?");
        this.create_assets_jqui();
        this.create_scene_jqui();
        this.create_character_jqui();
        this.create_sceneobject_jqui();
        this.create_codeeditor_jqui();
        this.create_worldsettings_jqui();
        this.create_terrain_jqui();
        this.create_shape_jqui();

        this.create_navmenu();

        //var re_number = /[+-]?[0-9]+(?:\.[0-9]+)?/g;
        //add listener if key is press
        //jQuery('.numbersOnly').keyup(function () {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            //this.value = this.value.replace(re_number,'');
        //});

    }



    create_navmenu(){
        var _div = document.createElement("div");
        _div.id = "TopRight";
        _div.style.position = "absolute";
        _div.style.top = 0;
        _div.style.left = 0;

        var strhtml = `<ul id="navmenu">`;
        strhtml += `<li>`;
        //strhtml += `<div><span class="ui-icon ui-icon-disk"></span>Save</div>`;
        strhtml += `<div><span class="ui-icon ui-icon-plus"></span>Menu</div>`;
        strhtml += `<ul>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#assets').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Assets</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#scene').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Scene</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#character').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Character</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#sceneobject').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Scene Object</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#scripts').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Scripts</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#codeeditor').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Script Editor</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#shape').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Shape</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="$('#terrain').dialog('open');"><span class="ui-icon ui-icon-newwin"></span>Terrain</div>`;
        strhtml += `</li>`;

        strhtml += `</ul>`;

        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="BABYLONJSAPI.SaveSceneMap();"><span class="ui-icon ui-icon-plus"></span>Save Scene</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="BABYLONJSAPI.LoadSceneMap();"><span class="ui-icon ui-icon-plus"></span>Load Scene</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="BABYLONJSAPI.ClearSceneMap();"><span class="ui-icon ui-icon-plus"></span>Clear Scene</div>`;
        strhtml += `</li>`;

        strhtml += `<li>`;
        strhtml += `<div onclick="BABYLONJSAPI.DeleteSceneMap();"><span class="ui-icon ui-icon-plus"></span>Delete Scene</div>`;
        strhtml += `</li>`;

        strhtml += `</ul>`;

        _div.innerHTML = strhtml;
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#navmenu").menu();
        });

    }

    create_worldsettings_jqui(){
        var _div = document.createElement("div");
        _div.id = "worldsettings";
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#worldsettings").dialog();
            $("#worldsettings").dialog('close');
        });
    }

    create_assets_jqui(){
        var div_assets = document.createElement("div");
        div_assets.id = "assets";
        document.getElementsByTagName('body')[0].appendChild(div_assets);

        $(function(){
            $("#assets").dialog();
            $("#assets").dialog('close');
        });
    }

    create_scene_jqui(){
        var div_scene = document.createElement("div");
        div_scene.id = "scene";
        document.getElementsByTagName('body')[0].appendChild(div_scene);

        $(function(){
            $("#scene").dialog();
            $("#scene").dialog('close');
        });
    }

    create_character_jqui(){
        var _div = document.createElement("div");
        _div.id = "character";
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#character").dialog();
            $("#character").dialog('close');
        });
    }

    create_sceneobject_jqui(){
        var div_sceneobject = document.createElement("div");
        div_sceneobject.id = "sceneobject";

        var strhtml = "";
        strhtml +=  `<div id="accordion_sceneobject">`;
        strhtml +=  `<h3>Transform</h3>`;
        strhtml +=  `<div>`;
        strhtml +=  `<p>
                Mesh
                    </p>`;
        strhtml +=  `</div>`;
        strhtml +=  `<h3>Mesh</h3>`;
        strhtml +=  `<div>`;
        strhtml +=  `<p>
                    Mesh
                     </p>`;
        strhtml +=  `</div>`;
        strhtml +=  `<h3>Material</h3>`;
        strhtml +=  `<div>`;
        strhtml +=  `<p>
                    Mesh
                     </p>`;
        strhtml +=  `</div>`;
        strhtml +=  `<h3>Animation</h3>`;
        strhtml +=  `<div>`;
        strhtml +=  `<p>
                    Mesh
                     </p>`;
        strhtml +=  `</div>`;
        strhtml +=  `<h3>Physics</h3>`;
        strhtml +=  `<div>`;
        strhtml +=  `<p>
                    Mesh
                     </p>`;
        strhtml +=  `</div>`;
        strhtml +=  `<h3>Scripts</h3>`;
        strhtml +=  `<div>`;
        strhtml +=  `<p>
                    Mesh
                     </p>`;
        strhtml +=  `</div>`;
        strhtml +=  ``;

        div_sceneobject.innerHTML = strhtml;
        document.getElementsByTagName('body')[0].appendChild(div_sceneobject);

        $(function(){
            $("#sceneobject").dialog();
            $("#accordion_sceneobject").accordion();
            $("#sceneobject").dialog('close');
        });
    }

    create_codeeditor_jqui(){
        var _div = document.createElement("div");
        _div.id = "codeeditor";
        _div.innerHTML = `<textarea id="editor"></textarea>`;
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#codeeditor").dialog();
            $("#codeeditor").dialog('close');
        });


        tinymce.init({
          selector: '#editor',
          menubar: false,
          plugins: "codesample",
          toolbar: 'undo redo | code | BtnSave',

          setup: function (editor) {
            editor.addButton('BtnSave', {
              text: 'Save',
              icon: false,
              onclick: function () {
        		  console.log("save?");
                  //editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
              }
            });
          }
        });
    }

    create_terrain_jqui(){
        var _div = document.createElement("div");
        _div.id = "terrain";
        _div.innerHTML += `Camera Position: <input id="terrain_camera" type="checkbox">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `x:<input id="terrain_x" class="numbersOnly" value="0">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `y:<input id="terrain_y" class="numbersOnly" value="0">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `z:<input id="terrain_z" class="numbersOnly" value="0">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `<button onclick="BABYLONJSAPI.ui_createterrain();">Create Terrain</button>`;

        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#terrain").dialog();
            $("#terrain").dialog('close');
        });
    }

    //BABYLONJSAPI.ui_createterrain();
    ui_createterrain(){
        console.log("test click!");
        var pos_x = document.getElementById("terrain_x").value;
        //console.log(pos_x);
        var pos_y = document.getElementById("terrain_y").value;
        var pos_z = document.getElementById("terrain_z").value;

        this.createterrain({x:pos_x,y:pos_y,z:pos_z});
    }

    //BABYLONJSAPI.ui_selectshape();
    create_shape_jqui(){
        var _div = document.createElement("div");
        _div.id = "shape";
        _div.innerHTML += `Camera Position: <input id="terrain_camera" type="checkbox">`;
        _div.innerHTML += `<br>`;

        var options = `<select id="sceneshape" onclick="BABYLONJSAPI.ui_selectshape();">`;
        options += `<option value="cube">Cube</option>`;
        options += `<option value="cylinder">Cylinder</option>`;
        options += `<option value="sphere">Sphere</option>`;
        options += `<option value="plane">Plane</option>`;
        options += `</select>`;
        _div.innerHTML += options;

        _div.innerHTML += `<br>`;
        _div.innerHTML += `height:<input id="shape_height" class="numbersOnly" value="1">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `width:<input id="shape_width" class="numbersOnly" value="1">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `depth:<input id="shape_depth" class="numbersOnly" value="1">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `diameter:<input id="shape_diameter" class="numbersOnly" value="1" style="display:none;">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `segments:<input id="shape_segments" class="numbersOnly" value="1" style="display:none;">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `diameterTop:<input id="shape_diameterTop" class="numbersOnly" value="1" style="display:none;">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `tessellation:<input id="shape_tessellation" class="numbersOnly" value="4" style="display:none;">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `x:<input id="shape_x" class="numbersOnly" value="0">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `y:<input id="shape_y" class="numbersOnly" value="0">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `z:<input id="shape_z" class="numbersOnly" value="0">`;
        _div.innerHTML += `<br>`;
        _div.innerHTML += `<button onclick="BABYLONJSAPI.ui_createshape();">Create Shape</button>`;

        _div.innerHTML += ``;
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#shape").dialog();
            $("#shape").dialog('close');
        });
    }

    ui_selectshape(){
        //https://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter#box
        this.selectsceneshape = document.getElementById("sceneshape").value || 'cube';
        console.log(document.getElementById("shape_height").style.display);
        document.getElementById("shape_height").style.display = "none";
        document.getElementById("shape_width").style.display = "none";
        document.getElementById("shape_depth").style.display = "none";
        document.getElementById("shape_diameter").style.display = "none";
        document.getElementById("shape_segments").style.display = "none";
        document.getElementById("shape_diameterTop").style.display = "none";
        document.getElementById("shape_tessellation").style.display = "none";

        if(this.selectsceneshape == 'cube'){
            document.getElementById("shape_height").style.display = "inline";
            document.getElementById("shape_width").style.display = "inline";
            document.getElementById("shape_depth").style.display = "inline";
        }

        if(this.selectsceneshape == 'sphere'){
            document.getElementById("shape_diameter").style.display = "inline";
        }

        if(this.selectsceneshape == 'cylinder'){
            //document.getElementById("shape_diameterTop").style.display = "inline";
            document.getElementById("shape_diameter").style.display = "inline";
            document.getElementById("shape_tessellation").style.display = "inline";
        }
    }

    ui_createshape(){
        this.selectsceneshape = document.getElementById("sceneshape").value || 'box';

        this.shape_x = document.getElementById("shape_x").value || 1;
        this.shape_y = document.getElementById("shape_y").value || 1;
        this.shape_z = document.getElementById("shape_z").value || 1;

        if(this.selectsceneshape == "cube"){
            var shape_height = document.getElementById("shape_height").value;
            var shape_width = document.getElementById("shape_width").value;
            var shape_depth = document.getElementById("shape_depth").value;
            this.parse_object({geometrytype:'cube',
                                parameters:{
                                    height:shape_height,
                                    width:shape_width,
                                    depth:shape_depth},
                                position:{
                                    x:this.shape_x,
                                    y:this.shape_y,
                                    z:this.shape_z
                                }
                                });
        }

        if(this.selectsceneshape == "sphere"){
            this.parse_object({geometrytype:'sphere',
                                parameters:{
                                    diameter: document.getElementById("shape_diameter").value
                                },
                                position:{
                                    x:this.shape_x,
                                    y:this.shape_y,
                                    z:this.shape_z
                                }
                                });

        }

        if(this.selectsceneshape == "cylinder"){
            this.parse_object({geometrytype:'cylinder',
                                parameters:{
                                    //diameterTop: document.getElementById("shape_diameterTop").value,
                                    diameter: document.getElementById("shape_diameter").value,
                                    tessellation: document.getElementById("shape_tessellation").value
                                },
                                position:{
                                    x:this.shape_x,
                                    y:this.shape_y,
                                    z:this.shape_z
                                }
                                });

        }

        //console.log(this.selectsceneshape);
        console.log("add shape to scene!");
    }
}
