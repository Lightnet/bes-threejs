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

        this.create_navmenu();
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
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#terrain").dialog();
            $("#terrain").dialog('close');
        });
    }

    create_shape_jqui(){
        var _div = document.createElement("div");
        _div.id = "shape";
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#shape").dialog();
            $("#shape").dialog('close');
        });
    }
}
