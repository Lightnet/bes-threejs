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
        //this.create_assets_jqui();
        //this.create_sceneobject_jqui();
        //this.create_codeeditor_jqui();
    }

    create_worldsettings_jqui(){
        var _div = document.createElement("div");
        _div.id = "worldsettings";
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#worldsettings").dialog();
        });
    }

    create_assets_jqui(){
        var div_assets = document.createElement("div");
        div_assets.id = "assets";
        document.getElementsByTagName('body')[0].appendChild(div_assets);

        $(function(){
            $("#assets").dialog();
        });
    }

    create_scene_jqui(){
        var div_scene = document.createElement("div");
        div_scene.id = "scene";
        document.getElementsByTagName('body')[0].appendChild(div_scene);

        $(function(){
            $("#scene").dialog();
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
        });
    }

    create_codeeditor_jqui(){
        var _div = document.createElement("div");
        _div.id = "codeeditor";
        _div.innerHTML = `<textarea id="editor"></textarea>`;
        document.getElementsByTagName('body')[0].appendChild(_div);

        $(function(){
            $("#codeeditor").dialog();
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
}
