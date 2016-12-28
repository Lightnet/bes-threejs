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
        //this.create_leftsidebar();
        //this.create_rightsidebar();
    }

    create_leftsidebar(){
        //http://jsfiddle.net/eHded/4/
        //http://stackoverflow.com/questions/19392453/jquery-show-hide-sliding-panel-from-left-side
        var _style = document.createElement("style");
        var _style_ = `
        .panel {
        	width:300px;
        	float:left;
        	height:550px;
        	background:#d9dada;
        	position:relative;
        	left:-300px;
        }

        .panel.expand {
            left: 0;
        }

        .slider-arrow {
        	padding:5px;
        	width:10px;
        	float:left;
        	background:#d9dada;
        	font:400 12px Arial, Helvetica, sans-serif;
        	color:#000;
        	text-decoration:none;
        	position:relative;
        	left:-300px;
        }`;
        _style.innerHTML = _style_;
        document.getElementsByTagName('head')[0].appendChild(_style);

        var _div = document.createElement("div");
        //_div.id="container";
        //_div.style = "float:right;";
        _div.style.position = "absolute";
        _div.style.top = 0;
        _div.style.left = 0;
        //_div.style.width = "100%";
        //_div.style.height = "100%";
        _div.innerHTML =`
            <div class="panel">Hello World</div>
            <a href="javascript:void(0);" class="slider-arrow show">&raquo;</a>`;
        //document.getElementById('TopRight').appendChild(_div);
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){

            $('.slider-arrow').click(function() {
                $('.panel').toggleClass('expand');
            });

        });
    }

    create_rightsidebar(){
        //http://jsfiddle.net/shijukbabu/QgD5Y/8/
        var _style = document.createElement("style");
        var _style_ = `
        #side{
            float:right;
            width:50px;
            height:50px;
            background:#BBB;
        }

        .hide{
            display:none;
        }

        #slidable{
            float:right;
            height:50px;
            background:#888;
            width:200px;
        }`;
        _style.innerHTML = _style_;
        document.getElementsByTagName('head')[0].appendChild(_style);

        var _div = document.createElement("div");
        _div.id="container";
        _div.style = "float:right;";
        _div.style.position = "absolute";
        _div.style.top = 0;
        _div.style.right = 0;
        //_div.style.width = "100%";
        //_div.style.height = "100%";
        _div.innerHTML =`
            <div id="slidable"class="hide">Foobar</div>
            <div id="side"></div>`;
        //document.getElementById('TopRight').appendChild(_div);
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $( "#side" ).click(function() {
                $('#slidable').animate({width: 'toggle'});
            });
        });

    }

    create_navmenu(){
        var _div = document.createElement("div");
        _div.id = "TopRight";
        _div.style.position = "absolute";
        _div.style.top = 0;
        _div.style.left = 0;
        //_div.style.width = "100%";
        //_div.style.height = "100%";

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
        var self = this;
        var _div = document.createElement("div");
        _div.id = "scene";
        var strhtml = `<button onclick="BABYLONJSAPI.ui_updatesceneobject();">Refresh</button>
        <button onclick="BABYLONJSAPI.ui_delete_select_sceneobject();">Delete</button>
        <br><span>Selected:</span> <span id="select-result">none</span>`;
        strhtml += `<ol id="selectsceneobj" style="list-style-type: none; margin: 0; padding: 0; width: 60%;  ">`;
        //strhtml +=    `<li class="ui-widget-content">Item 1</li>`;
        strhtml += `</ol>`;
        _div.innerHTML = strhtml;

        document.getElementsByTagName('body')[0].appendChild(_div);
        //var selectsceneobj = document.getElementById("selectsceneobj");

        $(function(){
            $("#scene").dialog();
            $("#scene").dialog('close');
            $( "#selectsceneobj" ).selectable({
                stop: function() {
                    console.log("selected");
                    var result = $( "#select-result" ).empty();
                    $( ".ui-selected", this ).each(function() {
                        console.log(this);
                        console.log(this.id);
                        if(this.id != null){
                            self.ui_select_sceneobject(this.id);
                        }
                        var index = $( "#selectsceneobj li" ).index( this );
                        result.append( " #" + ( index + 1 ) );
                    });
                }
            });
            //var ELList = `<li class="ui-widget-content">Item 1</li>`;
            //$( "#selectsceneobj" ).append( ELList );
            //$( "#selectsceneobj" ).empty();
            //$('.container').append(listHTML);
        });
    }
    //BABYLONJSAPI.ui_updatesceneobject();
    ui_updatesceneobject(){
        $( "#selectsceneobj" ).empty();
        for(var i = 0; i < this.scene.meshes.length;i++){
            if( this.scene.meshes[i].rpgobj != null){
                var rpgobj = this.scene.meshes[i].rpgobj;
                var ELList = `<li class="ui-widget-content" id="` + rpgobj.uuid + `">` + rpgobj.nameClass  + `</li>`;
                $( "#selectsceneobj" ).append( ELList );
            }
        }
    }

    ui_select_sceneobject(_id){
        console.log("select object");
        for(var i = 0; i < this.scene.meshes.length;i++){
            if( this.scene.meshes[i].rpgobj != null){
                //var rpgobj = this.scene.meshes[i].rpgobj;
                if( this.scene.meshes[i].rpgobj.uuid == _id){
                    this.selectobject = this.scene.meshes[i];
                    this.updateselectobject()
                }
            }
        }
    }

    ui_delete_select_sceneobject(){
        console.log("delete select object");
        if(this.selectobject !=null){
            if(this.selectobject.rpgobj !=null){
                this.check_gunsceneobj(this.selectobject.rpgobj['uuid'],(bfind,id)=>{
                    //console.log("....CALLS");
                    var gscene = this.gun.get('scene');
                    if(bfind){
                        console.log("set scene object delete");
                        if(id !=null){
                            console.log(id);
                            gscene.path(id).put(null);
                        }
                    }
                    console.log("object delete!");
                    //need to change this later
                    this.selectobject.dispose();
                });

            }
        }
    }

    //BABYLONJSAPI.ui_create_character();
    create_character_jqui(){
        var _div = document.createElement("div");
        _div.id = "character";
        var _strui = `
        PX:<input id="char_px" value="0">
        <br>PY:<input id="char_py" value="1">
        <br>PZ:<input id="char_pz" value="0">
        <br><button onclick="BABYLONJSAPI.ui_create_character();">Create Character</button>
        `;

        _div.innerHTML = _strui;
        document.getElementsByTagName('body')[0].appendChild(_div);
        $(function(){
            $("#character").dialog();
            $("#character").dialog('close');
        });
    }

    ui_create_character(){

        this.spawn_character({
                                x: document.getElementById("char_px").value || 0,
                                y: document.getElementById("char_py").value || 0,
                                z: document.getElementById("char_pz").value || 0
                            });

        //var npc = this.spawn_character({y: 64});

    }

    create_sceneobject_jqui(){
        var self = this;
        var div_sceneobject = document.createElement("div");
        div_sceneobject.id = "sceneobject";

        var strhtml = "";
        strhtml +=  `<div id="accordion_sceneobject">`;
        strhtml +=  `<h3>Transform</h3>`;
        strhtml +=  `<div>`;

        strhtml +=  `PX:<input id="obj_px" value="0">`;
        strhtml +=  `<br>PY:<input id="obj_py" value="0">`;
        strhtml +=  `<br>PZ:<input id="obj_pz" value="0">`;

        strhtml +=  `<br>RX:<input id="obj_rx" value="0">`;
        strhtml +=  `<br>RY:<input id="obj_ry" value="0">`;
        strhtml +=  `<br>RZ:<input id="obj_rz" value="0">`;
        strhtml +=  `<br>SX:<input id="obj_sx" value="1">`;
        strhtml +=  `<br>SY:<input id="obj_sy" value="1">`;
        strhtml +=  `<br>SZ:<input id="obj_sz" value="1">`;


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
            $("#sceneobject").dialog({width:400});
            $("#accordion_sceneobject").accordion();

            var obj_px = $( "#obj_px" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.position.x = Number($(this).val());
                    if(self.selectobject.rpgobj !=null){
                        self.selectobject.rpgobj.position.x = Number($(this).val());
                    }
                }
            });

            $( "#obj_py" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.position.y = Number($(this).val());
                    if(self.selectobject.rpgobj !=null){
                        self.selectobject.rpgobj.position.y = Number($(this).val());
                    }
                }
            });
            $( "#obj_pz" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.position.z = Number($(this).val());
                    if(self.selectobject.rpgobj !=null){
                        self.selectobject.rpgobj.position.z = Number($(this).val());
                    }
                }
            });

            $( "#obj_rx" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.rotation.x = Number($(this).val());
                }
            });
            $( "#obj_ry" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.rotation.y = Number($(this).val());
                }
            });
            $( "#obj_rz" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.rotation.z = Number($(this).val());
                }
            });

            $( "#obj_sx" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.scaling.x = Number($(this).val());
                }
            });
            $( "#obj_sy" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.scaling.y = Number($(this).val());
                }
            });
            $( "#obj_sz" ).spinner({step: 0.01,numberFormat: "n",
            spin: function(event, ui) {
                //console.log( ui.value);
                $(this).val(ui.value).trigger('value_changed');
            }}).on('keydown', function (e) {
                if(e.keyCode == 13){
                    console.log(this.value);
                    $(this).val(this.value).trigger('value_changed');
                }
            }).on('value_changed', function(e){
                //console.log('value changed to '+$(this).val());
                //console.log($(this).val());
                if(self.selectobject !=null){
                    self.selectobject.scaling.z = Number($(this).val());
                }
            });


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
