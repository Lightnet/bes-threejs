define(['exports', '../system/Babylonjs_game_module'], function (exports, _Babylonjs_game_module) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_jqueryui = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Babylonjs_game_jqueryui = exports.Babylonjs_game_jqueryui = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_jqueryui, _Babylonjs_game_modul);

        function Babylonjs_game_jqueryui(args) {
            _classCallCheck(this, Babylonjs_game_jqueryui);

            return _possibleConstructorReturn(this, (Babylonjs_game_jqueryui.__proto__ || Object.getPrototypeOf(Babylonjs_game_jqueryui)).call(this, args));
        }

        _createClass(Babylonjs_game_jqueryui, [{
            key: 'create_window_jqui',
            value: function create_window_jqui() {

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
        }, {
            key: 'create_leftsidebar',
            value: function create_leftsidebar() {
                //http://jsfiddle.net/eHded/4/
                //http://stackoverflow.com/questions/19392453/jquery-show-hide-sliding-panel-from-left-side
                var _style = document.createElement("style");
                var _style_ = '\n        .panel {\n        \twidth:300px;\n        \tfloat:left;\n        \theight:550px;\n        \tbackground:#d9dada;\n        \tposition:relative;\n        \tleft:-300px;\n        }\n\n        .panel.expand {\n            left: 0;\n        }\n\n        .slider-arrow {\n        \tpadding:5px;\n        \twidth:10px;\n        \tfloat:left;\n        \tbackground:#d9dada;\n        \tfont:400 12px Arial, Helvetica, sans-serif;\n        \tcolor:#000;\n        \ttext-decoration:none;\n        \tposition:relative;\n        \tleft:-300px;\n        }';
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
                _div.innerHTML = '\n            <div class="panel">Hello World</div>\n            <a href="javascript:void(0);" class="slider-arrow show">&raquo;</a>';
                //document.getElementById('TopRight').appendChild(_div);
                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {

                    $('.slider-arrow').click(function () {
                        $('.panel').toggleClass('expand');
                    });
                });
            }
        }, {
            key: 'create_rightsidebar',
            value: function create_rightsidebar() {
                //http://jsfiddle.net/shijukbabu/QgD5Y/8/
                var _style = document.createElement("style");
                var _style_ = '\n        #side{\n            float:right;\n            width:50px;\n            height:50px;\n            background:#BBB;\n        }\n\n        .hide{\n            display:none;\n        }\n\n        #slidable{\n            float:right;\n            height:50px;\n            background:#888;\n            width:200px;\n        }';
                _style.innerHTML = _style_;
                document.getElementsByTagName('head')[0].appendChild(_style);

                var _div = document.createElement("div");
                _div.id = "container";
                _div.style = "float:right;";
                _div.style.position = "absolute";
                _div.style.top = 0;
                _div.style.right = 0;
                //_div.style.width = "100%";
                //_div.style.height = "100%";
                _div.innerHTML = '\n            <div id="slidable"class="hide">Foobar</div>\n            <div id="side"></div>';
                //document.getElementById('TopRight').appendChild(_div);
                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {
                    $("#side").click(function () {
                        $('#slidable').animate({ width: 'toggle' });
                    });
                });
            }
        }, {
            key: 'create_navmenu',
            value: function create_navmenu() {
                var _div = document.createElement("div");
                _div.id = "TopRight";
                _div.style.position = "absolute";
                _div.style.top = 0;
                _div.style.left = 0;
                //_div.style.width = "100%";
                //_div.style.height = "100%";

                var strhtml = '<ul id="navmenu">';
                strhtml += '<li>';
                //strhtml += `<div><span class="ui-icon ui-icon-disk"></span>Save</div>`;
                strhtml += '<div><span class="ui-icon ui-icon-plus"></span>Menu</div>';
                strhtml += '<ul>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#assets\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Assets</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#scene\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Scene</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#character\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Character</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#sceneobject\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Scene Object</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#scripts\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Scripts</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#codeeditor\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Script Editor</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#shape\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Shape</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="$(\'#terrain\').dialog(\'open\');"><span class="ui-icon ui-icon-newwin"></span>Terrain</div>';
                strhtml += '</li>';

                strhtml += '</ul>';

                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="BABYLONJSAPI.SaveSceneMap();"><span class="ui-icon ui-icon-plus"></span>Save Scene</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="BABYLONJSAPI.LoadSceneMap();"><span class="ui-icon ui-icon-plus"></span>Load Scene</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="BABYLONJSAPI.ClearSceneMap();"><span class="ui-icon ui-icon-plus"></span>Clear Scene</div>';
                strhtml += '</li>';

                strhtml += '<li>';
                strhtml += '<div onclick="BABYLONJSAPI.DeleteSceneMap();"><span class="ui-icon ui-icon-plus"></span>Delete Scene</div>';
                strhtml += '</li>';

                strhtml += '</ul>';

                _div.innerHTML = strhtml;
                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {
                    $("#navmenu").menu();
                });
            }
        }, {
            key: 'create_worldsettings_jqui',
            value: function create_worldsettings_jqui() {
                var _div = document.createElement("div");
                _div.id = "worldsettings";
                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {
                    $("#worldsettings").dialog();
                    $("#worldsettings").dialog('close');
                });
            }
        }, {
            key: 'create_assets_jqui',
            value: function create_assets_jqui() {
                var div_assets = document.createElement("div");
                div_assets.id = "assets";
                document.getElementsByTagName('body')[0].appendChild(div_assets);

                $(function () {
                    $("#assets").dialog();
                    $("#assets").dialog('close');
                });
            }
        }, {
            key: 'create_scene_jqui',
            value: function create_scene_jqui() {
                var self = this;
                var _div = document.createElement("div");
                _div.id = "scene";
                var strhtml = '<button onclick="BABYLONJSAPI.ui_updatesceneobject();">Refresh</button>\n        <button onclick="BABYLONJSAPI.ui_delete_select_sceneobject();">Delete</button>\n        <br><span>Selected:</span> <span id="select-result">none</span>';
                strhtml += '<ol id="selectsceneobj" style="list-style-type: none; margin: 0; padding: 0; width: 60%;  ">';
                //strhtml +=    `<li class="ui-widget-content">Item 1</li>`;
                strhtml += '</ol>';
                _div.innerHTML = strhtml;

                document.getElementsByTagName('body')[0].appendChild(_div);
                //var selectsceneobj = document.getElementById("selectsceneobj");

                $(function () {
                    $("#scene").dialog();
                    $("#scene").dialog('close');
                    $("#selectsceneobj").selectable({
                        stop: function stop() {
                            console.log("selected");
                            var result = $("#select-result").empty();
                            $(".ui-selected", this).each(function () {
                                console.log(this);
                                console.log(this.id);
                                if (this.id != null) {
                                    self.ui_select_sceneobject(this.id);
                                }
                                var index = $("#selectsceneobj li").index(this);
                                result.append(" #" + (index + 1));
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

        }, {
            key: 'ui_updatesceneobject',
            value: function ui_updatesceneobject() {
                $("#selectsceneobj").empty();
                for (var i = 0; i < this.scene.meshes.length; i++) {
                    if (this.scene.meshes[i].rpgobj != null) {
                        var rpgobj = this.scene.meshes[i].rpgobj;
                        var ELList = '<li class="ui-widget-content" id="' + rpgobj.uuid + '">' + rpgobj.nameClass + '</li>';
                        $("#selectsceneobj").append(ELList);
                    }
                }
            }
        }, {
            key: 'ui_select_sceneobject',
            value: function ui_select_sceneobject(_id) {
                console.log("select object");
                for (var i = 0; i < this.scene.meshes.length; i++) {
                    if (this.scene.meshes[i].rpgobj != null) {
                        //var rpgobj = this.scene.meshes[i].rpgobj;
                        if (this.scene.meshes[i].rpgobj.uuid == _id) {
                            this.selectobject = this.scene.meshes[i];
                            this.updateselectobject();
                        }
                    }
                }
            }
        }, {
            key: 'ui_delete_select_sceneobject',
            value: function ui_delete_select_sceneobject() {
                var _this2 = this;

                console.log("delete select object");
                if (this.selectobject != null) {
                    if (this.selectobject.rpgobj != null) {
                        this.check_gunsceneobj(this.selectobject.rpgobj['uuid'], function (bfind, id) {
                            //console.log("....CALLS");
                            var gscene = _this2.gun.get('scene');
                            if (bfind) {
                                console.log("set scene object delete");
                                if (id != null) {
                                    console.log(id);
                                    gscene.path(id).put(null);
                                }
                            }
                            console.log("object delete!");
                            //need to change this later
                            _this2.selectobject.dispose();
                        });
                    }
                }
            }

            //BABYLONJSAPI.ui_create_character();

        }, {
            key: 'create_character_jqui',
            value: function create_character_jqui() {
                var _div = document.createElement("div");
                _div.id = "character";
                var _strui = '\n        PX:<input id="char_px" value="0">\n        <br>PY:<input id="char_py" value="1">\n        <br>PZ:<input id="char_pz" value="0">\n        <br><button onclick="BABYLONJSAPI.ui_create_character();">Create Character</button>\n        ';

                _div.innerHTML = _strui;
                document.getElementsByTagName('body')[0].appendChild(_div);
                $(function () {
                    $("#character").dialog();
                    $("#character").dialog('close');
                });
            }
        }, {
            key: 'ui_create_character',
            value: function ui_create_character() {

                this.spawn_character({
                    x: document.getElementById("char_px").value || 0,
                    y: document.getElementById("char_py").value || 0,
                    z: document.getElementById("char_pz").value || 0
                });

                //var npc = this.spawn_character({y: 64});
            }
        }, {
            key: 'create_sceneobject_jqui',
            value: function create_sceneobject_jqui() {
                var self = this;
                var div_sceneobject = document.createElement("div");
                div_sceneobject.id = "sceneobject";

                var strhtml = "";
                strhtml += '<div id="accordion_sceneobject">';
                strhtml += '<h3>Transform</h3>';
                strhtml += '<div>';

                strhtml += 'PX:<input id="obj_px" value="0">';
                strhtml += '<br>PY:<input id="obj_py" value="0">';
                strhtml += '<br>PZ:<input id="obj_pz" value="0">';

                strhtml += '<br>RX:<input id="obj_rx" value="0">';
                strhtml += '<br>RY:<input id="obj_ry" value="0">';
                strhtml += '<br>RZ:<input id="obj_rz" value="0">';
                strhtml += '<br>SX:<input id="obj_sx" value="1">';
                strhtml += '<br>SY:<input id="obj_sy" value="1">';
                strhtml += '<br>SZ:<input id="obj_sz" value="1">';

                strhtml += '</div>';
                strhtml += '<h3>Mesh</h3>';
                strhtml += '<div>';
                strhtml += '<p>\n                    Mesh\n                     </p>';
                strhtml += '</div>';
                strhtml += '<h3>Material</h3>';
                strhtml += '<div>';
                strhtml += '<p>\n                    Mesh\n                     </p>';
                strhtml += '</div>';
                strhtml += '<h3>Animation</h3>';
                strhtml += '<div>';
                strhtml += '<p>\n                    Mesh\n                     </p>';
                strhtml += '</div>';
                strhtml += '<h3>Physics</h3>';
                strhtml += '<div>';
                strhtml += '<p>\n                    Mesh\n                     </p>';
                strhtml += '</div>';
                strhtml += '<h3>Scripts</h3>';
                strhtml += '<div>';
                strhtml += '<p>\n                    Mesh\n                     </p>';
                strhtml += '</div>';
                strhtml += '';

                div_sceneobject.innerHTML = strhtml;
                document.getElementsByTagName('body')[0].appendChild(div_sceneobject);

                $(function () {
                    $("#sceneobject").dialog({ width: 400 });
                    $("#accordion_sceneobject").accordion();

                    var obj_px = $("#obj_px").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.position.x = Number($(this).val());
                            if (self.selectobject.rpgobj != null) {
                                self.selectobject.rpgobj.position.x = Number($(this).val());
                            }
                        }
                    });

                    $("#obj_py").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.position.y = Number($(this).val());
                            if (self.selectobject.rpgobj != null) {
                                self.selectobject.rpgobj.position.y = Number($(this).val());
                            }
                        }
                    });
                    $("#obj_pz").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.position.z = Number($(this).val());
                            if (self.selectobject.rpgobj != null) {
                                self.selectobject.rpgobj.position.z = Number($(this).val());
                            }
                        }
                    });

                    $("#obj_rx").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.rotation.x = Number($(this).val());
                        }
                    });
                    $("#obj_ry").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.rotation.y = Number($(this).val());
                        }
                    });
                    $("#obj_rz").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.rotation.z = Number($(this).val());
                        }
                    });

                    $("#obj_sx").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.scaling.x = Number($(this).val());
                        }
                    });
                    $("#obj_sy").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.scaling.y = Number($(this).val());
                        }
                    });
                    $("#obj_sz").spinner({ step: 0.01, numberFormat: "n",
                        spin: function spin(event, ui) {
                            //console.log( ui.value);
                            $(this).val(ui.value).trigger('value_changed');
                        } }).on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            console.log(this.value);
                            $(this).val(this.value).trigger('value_changed');
                        }
                    }).on('value_changed', function (e) {
                        //console.log('value changed to '+$(this).val());
                        //console.log($(this).val());
                        if (self.selectobject != null) {
                            self.selectobject.scaling.z = Number($(this).val());
                        }
                    });

                    $("#sceneobject").dialog('close');
                });
            }
        }, {
            key: 'create_codeeditor_jqui',
            value: function create_codeeditor_jqui() {
                var _div = document.createElement("div");
                _div.id = "codeeditor";
                _div.innerHTML = '<textarea id="editor"></textarea>';
                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {
                    $("#codeeditor").dialog();
                    $("#codeeditor").dialog('close');
                });

                tinymce.init({
                    selector: '#editor',
                    menubar: false,
                    plugins: "codesample",
                    toolbar: 'undo redo | code | BtnSave',

                    setup: function setup(editor) {
                        editor.addButton('BtnSave', {
                            text: 'Save',
                            icon: false,
                            onclick: function onclick() {
                                console.log("save?");
                                //editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
                            }
                        });
                    }
                });
            }
        }, {
            key: 'create_terrain_jqui',
            value: function create_terrain_jqui() {
                var _div = document.createElement("div");
                _div.id = "terrain";
                _div.innerHTML += 'Camera Position: <input id="terrain_camera" type="checkbox">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'x:<input id="terrain_x" class="numbersOnly" value="0">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'y:<input id="terrain_y" class="numbersOnly" value="0">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'z:<input id="terrain_z" class="numbersOnly" value="0">';
                _div.innerHTML += '<br>';
                _div.innerHTML += '<button onclick="BABYLONJSAPI.ui_createterrain();">Create Terrain</button>';

                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {
                    $("#terrain").dialog();
                    $("#terrain").dialog('close');
                });
            }

            //BABYLONJSAPI.ui_createterrain();

        }, {
            key: 'ui_createterrain',
            value: function ui_createterrain() {
                console.log("test click!");
                var pos_x = document.getElementById("terrain_x").value;
                //console.log(pos_x);
                var pos_y = document.getElementById("terrain_y").value;
                var pos_z = document.getElementById("terrain_z").value;

                this.createterrain({ x: pos_x, y: pos_y, z: pos_z });
            }

            //BABYLONJSAPI.ui_selectshape();

        }, {
            key: 'create_shape_jqui',
            value: function create_shape_jqui() {
                var _div = document.createElement("div");
                _div.id = "shape";
                _div.innerHTML += 'Camera Position: <input id="terrain_camera" type="checkbox">';
                _div.innerHTML += '<br>';

                var options = '<select id="sceneshape" onclick="BABYLONJSAPI.ui_selectshape();">';
                options += '<option value="cube">Cube</option>';
                options += '<option value="cylinder">Cylinder</option>';
                options += '<option value="sphere">Sphere</option>';
                options += '<option value="plane">Plane</option>';
                options += '</select>';
                _div.innerHTML += options;

                _div.innerHTML += '<br>';
                _div.innerHTML += 'height:<input id="shape_height" class="numbersOnly" value="1">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'width:<input id="shape_width" class="numbersOnly" value="1">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'depth:<input id="shape_depth" class="numbersOnly" value="1">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'diameter:<input id="shape_diameter" class="numbersOnly" value="1" style="display:none;">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'segments:<input id="shape_segments" class="numbersOnly" value="1" style="display:none;">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'diameterTop:<input id="shape_diameterTop" class="numbersOnly" value="1" style="display:none;">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'tessellation:<input id="shape_tessellation" class="numbersOnly" value="4" style="display:none;">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'x:<input id="shape_x" class="numbersOnly" value="0">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'y:<input id="shape_y" class="numbersOnly" value="0">';
                _div.innerHTML += '<br>';
                _div.innerHTML += 'z:<input id="shape_z" class="numbersOnly" value="0">';
                _div.innerHTML += '<br>';
                _div.innerHTML += '<button onclick="BABYLONJSAPI.ui_createshape();">Create Shape</button>';

                _div.innerHTML += '';
                document.getElementsByTagName('body')[0].appendChild(_div);

                $(function () {
                    $("#shape").dialog();
                    $("#shape").dialog('close');
                });
            }
        }, {
            key: 'ui_selectshape',
            value: function ui_selectshape() {
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

                if (this.selectsceneshape == 'cube') {
                    document.getElementById("shape_height").style.display = "inline";
                    document.getElementById("shape_width").style.display = "inline";
                    document.getElementById("shape_depth").style.display = "inline";
                }

                if (this.selectsceneshape == 'sphere') {
                    document.getElementById("shape_diameter").style.display = "inline";
                }

                if (this.selectsceneshape == 'cylinder') {
                    //document.getElementById("shape_diameterTop").style.display = "inline";
                    document.getElementById("shape_diameter").style.display = "inline";
                    document.getElementById("shape_tessellation").style.display = "inline";
                }
            }
        }, {
            key: 'ui_createshape',
            value: function ui_createshape() {
                this.selectsceneshape = document.getElementById("sceneshape").value || 'box';

                this.shape_x = document.getElementById("shape_x").value || 1;
                this.shape_y = document.getElementById("shape_y").value || 1;
                this.shape_z = document.getElementById("shape_z").value || 1;

                if (this.selectsceneshape == "cube") {
                    var shape_height = document.getElementById("shape_height").value;
                    var shape_width = document.getElementById("shape_width").value;
                    var shape_depth = document.getElementById("shape_depth").value;
                    this.parse_object({ geometrytype: 'cube',
                        parameters: {
                            height: shape_height,
                            width: shape_width,
                            depth: shape_depth },
                        position: {
                            x: this.shape_x,
                            y: this.shape_y,
                            z: this.shape_z
                        }
                    });
                }

                if (this.selectsceneshape == "sphere") {
                    this.parse_object({ geometrytype: 'sphere',
                        parameters: {
                            diameter: document.getElementById("shape_diameter").value
                        },
                        position: {
                            x: this.shape_x,
                            y: this.shape_y,
                            z: this.shape_z
                        }
                    });
                }

                if (this.selectsceneshape == "cylinder") {
                    this.parse_object({ geometrytype: 'cylinder',
                        parameters: {
                            //diameterTop: document.getElementById("shape_diameterTop").value,
                            diameter: document.getElementById("shape_diameter").value,
                            tessellation: document.getElementById("shape_tessellation").value
                        },
                        position: {
                            x: this.shape_x,
                            y: this.shape_y,
                            z: this.shape_z
                        }
                    });
                }

                //console.log(this.selectsceneshape);
                console.log("add shape to scene!");
            }
        }]);

        return Babylonjs_game_jqueryui;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});