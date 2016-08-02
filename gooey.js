//Copyright 2015 Psymphonic LLC.

window.Gooey = function(){
    var pxToNum = function(px){
            return Number(px.slice(0, -2));
        };
    function GooeyObject(params){
        var me = this;
        this.extends = function(){
            for(var i = 0; i < arguments.length; i++){
                var obj = arguments[i];
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        me[key] = obj[key];
                    }
                }
            }
        };
        this.uid = params.uid || params.id || Gooey.UID();
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function GooeyElement(params){
        GooeyObject.call(this, params);
        var me = this;
        this.extends(DOMElement(params), MouseInteractions(params));
        this.workspace = params.workspace;
        params.style = params.style || {};
        params.style.margin = params.style.margin || me.workspace.margin+'px';
        params.style.position = params.style.position || "absolute";
        //params.style.font = params.style.font || me.workspace.element.style.font;
        params.style.fontFamily = params.style.fontFamily || me.workspace.element.style.fontFamily;
        params.style.fontSize = params.style.fontSize || me.workspace.element.style.fontSize;
        params.style['box-sizing'] = 'border-box';
        params.style.padding = params.style.padding || me.workspace.padding+'px';
        params.style.outline = 'none';
        params.style['-webkit-touch-callout'] = 'none';
        params.style['-webkit-user-select'] = 'none';
        params.style['-khtml-user-select'] = 'none';
        params.style['-moz-user-select'] = 'none';
        params.style['-ms-user-select'] = 'none';
        params.style['user-select'] = 'none';
        this.style(params.style);
    }

    function ComplexElement(params){
        params.element = document.createElement('div');
        GooeyElement.call(this, params);
        this.extends(Container());
    }

    var MouseInteractions = function(params){
        return {
            leftClick: params.leftClick || function(event){},
            tap: params.tap || function(event){},
            rightClick: params.rightClick || function(event){},
            middleClick: params.middleClick || function(event){},
            clickAndHold: params.clickAndHold || function(event){},
            tapAndHold: params.tapAndHold || function(event){},
            mouseIn: params.mouseIn || function(event){},
            mouseOut: params.mouseOut || function(event){},
            mouseMove: params.mouseMove || function(event){},
            leftMouseDown: params.leftMouseDown || function(event){},
            leftMouseUp: params.leftMouseUp || function(event){},
            rightMouseDown: params.leftMouseDown || function(event){},
            rightMouseUp: params.rightMouseUp || function(event){},
            middleMouseDown: params.middleMouseDown || function(event){},
            middleMouseUp: params.middleMouseUp || function(event){},
            touchStart: params.touchStart || function(event){},
            touchEnd: params.touchEnd || function(event){},
            pinch: params.pinch || function(event){},
            doubleClick: params.doubleClick || function(event){},
            contextMenu: params.contextMenu || function(event){},
            dragIn: params.dragIn || function(event){},
            dragOut: params.dragOut || function(event){},
            swipe: params.swipe || function(event){}
        };
    };

    var attachMouseEvents = function(gooeyThing, mods){
        mods = mods || {};
        gooeyThing.element.onmousedown = function(e){
            var mdMod = mods.hasOwnProperty('mouseDown');
            if(mdMod && mods.mouseDown.hasOwnProperty("before")){
                mods.mouseDown.before(e);
            }
            if(e.which === 1){
                var lmMod = mods.hasOwnProperty("leftMouseDown");
                if(lmMod && mods.leftMouseDown.hasOwnProperty("before")){
                    mods.leftMouseDown.before(e);
                }
                if(gooeyThing.leftMouseDown){
                    gooeyThing.leftMouseDown(e);
                }
                if(lmMod && mods.leftMouseDown.hasOwnProperty("after")){
                    mods.leftMouseDown.after(e);
                }
            }
            else if(e.which === 2){
                var mmMod = mods.hasOwnProperty("middleMouseDown");
                if(mmMod && mods.middleMouseDown.hasOwnProperty("before")){
                    mods.middleMouseDown.before(e);
                }
                if(gooeyThing.middleMouseDown){
                    gooeyThing.middleMouseDown(e);
                }
                if(mmMod && mods.middleMouseDown.hasOwnProperty("after")){
                    mods.middleMouseDown.after(e);
                }
            }
            else if(e.which === 3){
                var rmMod = mods.hasOwnProperty("rightMouseDown");
                if(rmMod && mods.rightMouseDown.hasOwnProperty("before")){
                    mods.rightMouseDown.before(e);
                }
                if(gooeyThing.rightMouseDown){
                    gooeyThing.rightMouseDown(e);
                }
                if(rmMod && mods.rightMouseDown.hasOwnProperty("after")){
                    mods.rightMouseDown.after(e);
                }
            }
            if(mdMod && mods.mouseDown.hasOwnProperty("after")){
                mods.mouseDown.after(e);
            }
        };
        gooeyThing.element.onmouseup = function(e){
            var mdMod = mods.hasOwnProperty('mouseUp');
            if(mdMod && mods.mouseUp.hasOwnProperty("before")){
                mods.mouseUp.before(e);
            }
            if(e.which === 1){
                var lmMod = mods.hasOwnProperty("leftMouseUp");
                if(lmMod && mods.leftMouseUp.hasOwnProperty("before")){
                    mods.leftMouseUp.before(e);
                }
                if(gooeyThing.leftMouseUp){
                    gooeyThing.leftMouseUp(e);
                }
                if(lmMod && mods.leftMouseUp.hasOwnProperty("after")){
                    mods.leftMouseUp.after(e);
                }
            }
            else if(e.which === 2){
                var mmMod = mods.hasOwnProperty("middleMouseUp");
                if(mmMod && mods.middleMouseUp.hasOwnProperty("before")){
                    mods.middleMouseUp.before(e);
                }
                if(gooeyThing.middleMouseUp){
                    gooeyThing.middleMouseUp(e);
                }
                if(mmMod && mods.middleMouseUp.hasOwnProperty("after")){
                    mods.middleMouseUp.after(e);
                }
            }
            else if(e.which === 3){
                var rmMod = mods.hasOwnProperty("rightMouseUp");
                if(rmMod && mods.rightMouseUp.hasOwnProperty("before")){
                    mods.rightMouseUp.before(e);
                }
                if(gooeyThing.rightMouseUp){
                    gooeyThing.rightMouseUp(e);
                }
                if(rmMod && mods.rightMouseUp.hasOwnProperty("after")){
                    mods.rightMouseUp.after(e);
                }
            }
            if(mdMod && mods.mouseUp.hasOwnProperty("after")){
                mods.mouseUp.after(e);
            }
        };
        gooeyThing.element.onclick = function(e){
            var mdMod = mods.hasOwnProperty('click');
            if(mdMod && mods.click.hasOwnProperty("before")){
                mods.click.before(e);
            }
            if(e.which === 1){
                var lmMod = mods.hasOwnProperty("leftClick");
                if(lmMod && mods.leftClick.hasOwnProperty("before")){
                    mods.leftClick.before(e);
                }
                if(gooeyThing.leftClick){
                    gooeyThing.leftClick(e);
                }
                if(lmMod && mods.leftClick.hasOwnProperty("after")){
                    mods.leftClick.after(e);
                }
            }
            else if(e.which === 2){
                var mmMod = mods.hasOwnProperty("middleClick");
                if(mmMod && mods.middleClick.hasOwnProperty("before")){
                    mods.middleClick.before(e);
                }
                if(gooeyThing.middleClick){
                    gooeyThing.middleClick(e);
                }
                if(mmMod && mods.middleClick.hasOwnProperty("after")){
                    mods.middleClick.after(e);
                }
            }
            else if(e.which === 3){
                var rmMod = mods.hasOwnProperty("rightClick");
                if(rmMod && mods.rightClick.hasOwnProperty("before")){
                    mods.rightClick.before(e);
                }
                if(gooeyThing.rightClick){
                    gooeyThing.rightClick(e);
                }
                if(rmMod && mods.rightClick.hasOwnProperty("after")){
                    mods.rightClick.after(e);
                }
            }
            if(mdMod && mods.click.hasOwnProperty("after")){
                mods.click.after(e);
            }
        };
        gooeyThing.element.onmouseenter = function(e){
            if(e.which === 0){
                var moMod = mods.hasOwnProperty('mouseIn');
                if(moMod && mods.mouseIn.hasOwnProperty('before')){
                    mods.mouseIn.before(e);
                }
                if(gooeyThing.mouseIn){
                    gooeyThing.mouseIn(e);
                }
                if(moMod && mods.mouseIn.hasOwnProperty('after')){
                    mods.mouseIn.after(e);
                }
            }
            else if(e.which === 1){
                var diMod = mods.hasOwnProperty('dragIn');
                if(diMod && mods.dragIn.hasOwnProperty('before')){
                    mods.dragIn.before(e);
                }
                if(gooeyThing.dragIn){
                    gooeyThing.dragIn(e);
                }
                if(diMod && mods.dragIn.hasOwnProperty('after')){
                    mods.dragIn.after(e);
                }
            }

        };
        gooeyThing.element.onmouseleave = function(e){
            if(e.which === 0){
                var moMod = mods.hasOwnProperty('mouseOut');
                if(moMod && mods.mouseOut.hasOwnProperty('before')){
                    mods.mouseOut.before(e);
                }
                if(gooeyThing.mouseOut){
                    gooeyThing.mouseOut(e);
                }
                if(moMod && mods.mouseOut.hasOwnProperty('after')){
                    mods.mouseOut.after(e);
                }
            }
            else if(e.which === 1){
                var diMod = mods.hasOwnProperty('dragOut');
                if(diMod && mods.dragOut.hasOwnProperty('before')){
                    mods.dragOut.before(e);
                }
                if(gooeyThing.dragOut){
                    gooeyThing.dragOut(e);
                }
                if(diMod && mods.dragOut.hasOwnProperty('after')){
                    mods.dragOut.after(e);
                }
            }
        };
        gooeyThing.element.onmousemove = function(e){
            var mmMod = mods.hasOwnProperty('mouseMove');
            if(mmMod && mods.mouseMove.hasOwnProperty('before')){
                mods.mouseMove.before(e);
            }
            if(gooeyThing.mouseMove){
                gooeyThing.mouseMove(e);
            }
            if(mmMod && mods.mouseMove.hasOwnProperty('after')){
                mods.mouseMove.after(e);
            }
        }
    };

    var pixiAttachMouseEvents = function(gooeyThing, mods){
        mods = mods || {};
        var gfx = gooeyThing.gfx();
        gfx.mousedown = function(e){
            var mdMod = mods.hasOwnProperty('mouseDown');
            if(mdMod && mods.mouseDown.hasOwnProperty("before")){
                mods.mouseDown.before(e);
            }

            if(gooeyThing.workspace.mouseWhich === 1){
                var lmMod = mods.hasOwnProperty("leftMouseDown");
                if(lmMod && mods.leftMouseDown.hasOwnProperty("before")){
                    mods.leftMouseDown.before(e);
                }
                if(gooeyThing.leftMouseDown){
                    gooeyThing.leftMouseDown(e);
                }
                if(lmMod && mods.leftMouseDown.hasOwnProperty("after")){
                    mods.leftMouseDown.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 2){
                var mmMod = mods.hasOwnProperty("middleMouseDown");
                if(mmMod && mods.middleMouseDown.hasOwnProperty("before")){
                    mods.middleMouseDown.before(e);
                }
                if(gooeyThing.middleMouseDown){
                    gooeyThing.middleMouseDown(e);
                }
                if(mmMod && mods.middleMouseDown.hasOwnProperty("after")){
                    mods.middleMouseDown.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 3){
                var rmMod = mods.hasOwnProperty("rightMouseDown");
                if(rmMod && mods.rightMouseDown.hasOwnProperty("before")){
                    mods.rightMouseDown.before(e);
                }
                if(gooeyThing.rightMouseDown){
                    gooeyThing.rightMouseDown(e);
                }
                if(rmMod && mods.rightMouseDown.hasOwnProperty("after")){
                    mods.rightMouseDown.after(e);
                }
            }
            if(mdMod && mods.mouseDown.hasOwnProperty("after")){
                mods.mouseDown.after(e);
            }
        };
        gfx.mouseup = function(e){
            var mdMod = mods.hasOwnProperty('mouseUp');
            if(mdMod && mods.mouseUp.hasOwnProperty("before")){
                mods.mouseUp.before(e);
            }
            if(gooeyThing.workspace.mouseWhich === 1){
                var lmMod = mods.hasOwnProperty("leftMouseUp");
                if(lmMod && mods.leftMouseUp.hasOwnProperty("before")){
                    mods.leftMouseUp.before(e);
                }
                if(gooeyThing.leftMouseUp){
                    gooeyThing.leftMouseUp(e);
                }
                if(lmMod && mods.leftMouseUp.hasOwnProperty("after")){
                    mods.leftMouseUp.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 2){
                var mmMod = mods.hasOwnProperty("middleMouseUp");
                if(mmMod && mods.middleMouseUp.hasOwnProperty("before")){
                    mods.middleMouseUp.before(e);
                }
                if(gooeyThing.middleMouseUp){
                    gooeyThing.middleMouseUp(e);
                }
                if(mmMod && mods.middleMouseUp.hasOwnProperty("after")){
                    mods.middleMouseUp.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 3){
                var rmMod = mods.hasOwnProperty("rightMouseUp");
                if(rmMod && mods.rightMouseUp.hasOwnProperty("before")){
                    mods.rightMouseUp.before(e);
                }
                if(gooeyThing.rightMouseUp){
                    gooeyThing.rightMouseUp(e);
                }
                if(rmMod && mods.rightMouseUp.hasOwnProperty("after")){
                    mods.rightMouseUp.after(e);
                }
            }
            if(mdMod && mods.mouseUp.hasOwnProperty("after")){
                mods.mouseUp.after(e);
            }
        };
        gfx.click = function(e){
            var mdMod = mods.hasOwnProperty('click');
            if(mdMod && mods.click.hasOwnProperty("before")){
                mods.click.before(e);
            }
            if(gooeyThing.workspace.mouseWhich === 1){
                var lmMod = mods.hasOwnProperty("leftClick");
                if(lmMod && mods.leftClick.hasOwnProperty("before")){
                    mods.leftClick.before(e);
                }
                if(gooeyThing.leftClick){
                    gooeyThing.leftClick(e);
                }
                if(lmMod && mods.leftClick.hasOwnProperty("after")){
                    mods.leftClick.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 2){
                var mmMod = mods.hasOwnProperty("middleClick");
                if(mmMod && mods.middleClick.hasOwnProperty("before")){
                    mods.middleClick.before(e);
                }
                if(gooeyThing.middleClick){
                    gooeyThing.middleClick(e);
                }
                if(mmMod && mods.middleClick.hasOwnProperty("after")){
                    mods.middleClick.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 3){
                var rmMod = mods.hasOwnProperty("rightClick");
                if(rmMod && mods.rightClick.hasOwnProperty("before")){
                    mods.rightClick.before(e);
                }
                if(gooeyThing.rightClick){
                    gooeyThing.rightClick(e);
                }
                if(rmMod && mods.rightClick.hasOwnProperty("after")){
                    mods.rightClick.after(e);
                }
            }
            if(mdMod && mods.click.hasOwnProperty("after")){
                mods.click.after(e);
            }
        };
        gfx.mouseover = function(e){
            
            if(gooeyThing.workspace.mouseWhich === 0){
                var moMod = mods.hasOwnProperty('mouseIn');
                if(moMod && mods.mouseIn.hasOwnProperty('before')){
                    mods.mouseIn.before(e);
                }
                if(gooeyThing.mouseIn){
                    gooeyThing.mouseIn(e);
                }
                if(moMod && mods.mouseIn.hasOwnProperty('after')){
                    mods.mouseIn.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 1){
                var diMod = mods.hasOwnProperty('dragIn');
                if(diMod && mods.dragIn.hasOwnProperty('before')){
                    mods.dragIn.before(e);
                }
                if(gooeyThing.dragIn){
                    gooeyThing.dragIn(e);
                }
                if(diMod && mods.dragIn.hasOwnProperty('after')){
                    mods.dragIn.after(e);
                }
            }

        };
        gfx.mouseout = function(e){
            
            if(gooeyThing.workspace.mouseWhich === 0){
                var moMod = mods.hasOwnProperty('mouseOut');
                if(moMod && mods.mouseOut.hasOwnProperty('before')){
                    mods.mouseOut.before(e);
                }
                if(gooeyThing.mouseOut){
                    gooeyThing.mouseOut(e);
                }
                if(moMod && mods.mouseOut.hasOwnProperty('after')){
                    mods.mouseOut.after(e);
                }
            }
            else if(gooeyThing.workspace.mouseWhich === 1){
                var diMod = mods.hasOwnProperty('dragOut');
                if(diMod && mods.dragOut.hasOwnProperty('before')){
                    mods.dragOut.before(e);
                }
                if(gooeyThing.dragOut){
                    gooeyThing.dragOut(e);
                }
                if(diMod && mods.dragOut.hasOwnProperty('after')){
                    mods.dragOut.after(e);
                }
            }
        };
        gfx.mousemove = function(e){
            var mmMod = mods.hasOwnProperty('mouseMove');
            if(mmMod && mods.mouseMove.hasOwnProperty('before')){
                mods.mouseMove.before(e);
            }
            if(gooeyThing.mouseMove){
                gooeyThing.mouseMove(e);
            }
            if(mmMod && mods.mouseMove.hasOwnProperty('after')){
                mods.mouseMove.after(e);
            }
        };

    };

    var KeyEvents = function(params){
        return {
            keyPress: params.keyPress || function(e){},
            keyDown: params.keyDown || function(e){},
            keyUp: params.keyUp || function(e){}
        }
    };

    var attachKeyEvents = function(gooeyThing, mods){
        mods = mods || {};
        gooeyThing.element.onkeypress = function(e){
            var kpMod = mods.hasOwnProperty('keyPress');
            if(kpMod && mods.keyPress.hasOwnProperty('before')){
                mods.keyPress.before(e);
            }
            if(gooeyThing.keyPress){
                gooeyThing.keyPress(e);
            }
            if(kpMod && mods.keyPress.hasOwnProperty('after')){
                mods.keyPress.after(e);
            }
        };
        gooeyThing.element.onkeydown = function(e){
            var kdMod = mods.hasOwnProperty('keyDown');
            if(kdMod && mods.keyDown.hasOwnProperty('before')){
                mods.keyDown.before(e);
            }
            if(gooeyThing.keyDown){
                gooeyThing.keyDown(e);
            }
            if(kdMod && mods.keyDown.hasOwnProperty('after')){
                mods.keyDown.after(e);
            }
        };
        gooeyThing.element.onkeyup = function(e){
            var kdMod = mods.hasOwnProperty('keyUp');
            if(kdMod && mods.keyUp.hasOwnProperty('async')){
                mods.keyUp.async(e, function(e){
                    if(gooeyThing.keyUp){
                        gooeyThing.keyUp(e);
                    }
                    if(kdMod && mods.keyUp.hasOwnProperty('after')){
                        mods.keyUp.after(e);
                    }
                })
            }
            else{
                if(kdMod && mods.keyUp.hasOwnProperty('before')){
                    mods.keyUp.before(e);
                }
                if(gooeyThing.keyUp){
                    gooeyThing.keyUp(e);
                }
                if(kdMod && mods.keyUp.hasOwnProperty('after')){
                    mods.keyUp.after(e);
                }
            }

        }
    };

    var DOMElement = function(params){
        return {
            element: params.element || null,
            style: function(style){
                if(typeof style === "string"){
                    var data = this.element.style[style];
                    if(data.indexOf('px') > -1){
                        //console.log(data);
                        return pxToNum(data)
                    }
                    else if(data === ""){
                        return 0;
                    }
                    return data;
                }
                else if(this.element){
                    for(var key in style){
                        if(style.hasOwnProperty(key)){
                            this.element.style[key] = style[key];
                        }
                    }
                }
            },
            height: function(h){
                var p = this.style('padding');
                var b = this.style('borderWidth');
                var m = this.style('margin');
                if(typeof h === "undefined"){
                    if(this.style('height') === 0){
                        return this.element.clientHeight+(2*p)+(2*b)+(2*m);
                    }
                    return this.style('height')+(2*m);
                }

                this.element.style.height = h-(2*m)+'px';

            },
            width: function(w){
                var p = this.style('padding');
                var b = this.style('borderWidth');
                var m = this.style('margin');
                if(typeof w === "undefined"){
                    if(this.style('width') === 0){
                        return this.element.clientWidth+(2*p)+(2*b)+(2*m);
                    }
                    return this.style('width')+(2*m);
                }

                this.element.style.width = w-(2*m)+'px';
            },
            left: function(){
                return this.element.clientLeft;
            },
            top: function(){
                return this.element.clientTop;
            },
            moveTo: function(x, y){
                this.style({
                    'top': y+'px',
                    'left': x+'px'
                });
            },
            absolutePosition: function(){
                return this.element.getBoundingClientRect();
            },
            animate: function(target, duration, onComplete){
                Gooey.animate(this, target, duration, onComplete);
            },
            containsPoint: function(p){
                var mp = this.element.getBoundingClientRect();
                return (mp.bottom >= p.y && p.y >= mp.top) && (mp.right >= p.x && p.x >= mp.left);
            },
            hasFocus: function(){
                return this.element === document.activeElement;
            },
            blur: function(){
                this.element.blur();
            },
            focus: function(){
                this.element.focus();
            }
        };


    };

    var Container = function(){
        return {
            children: [],
            addChild: function(){
                for(var i = 0; i < arguments.length; i++){
                    this.children.push(arguments[i]);
                    if(this.hasOwnProperty('element') && arguments[i].hasOwnProperty('element')){
                        this.element.appendChild(arguments[i].element);
                    }
                }
            },
            removeChild: function(){
                for(var i = 0; i < arguments.length; i++){
                    this.children.splice(this.children.indexOf(arguments[i]), 1);
                    if(this.hasOwnProperty('element') && arguments[i].hasOwnProperty('element') && this.element.contains(arguments[i].element)){
                        this.element.removeChild(arguments[i].element);
                    }

                }
            },
            addChildAt: function(obj, ind){
                if(ind > this.children.length-1){
                    ind = this.children.length-1;
                }
                if(ind < 0){
                    ind = 0;
                }
                this.children.splice(ind, 0, obj);
                if(this.hasOwnProperty('element') && obj.hasOwnProperty('element')){
                    this.element.appendChild(obj.element);
                }
            }
        }
    };

    var Palette = function(params){
        params = params || {};
        return {
            name: params.name || 'Paper',
            workspaceColors: params.workspaceColors || [
                [246,246,246],
                [230,230,230],
                [179,179,179],
                [128,128,128],
                [77,77,77],
                [26,26,26],
                [255,0,0]
            ],
            dataColorsBold: params.dataColorsBold || [
                [31, 119, 180],
                [255, 127, 14],
                [44, 160, 44],
                [214, 39, 40],
                [148, 103, 189],
                [140, 86, 75],
                [227, 119, 194],
                [127, 127, 127],
                [188, 189, 34],
                [23,190, 207]
            ],
            dataColorsLight: params.dataColorsLight || [
                [174, 199, 232],
                [255, 187, 120],
                [152, 223, 138],
                [255, 152, 150],
                [197, 176, 213],
                [196, 156, 148],
                [247, 182, 210],
                [199, 199, 199],
                [219, 219, 141],
                [158, 218, 229]
            ],
            dataColorsMedium: params.dataColorsMedium || [
                [114, 158, 206],
                [255, 158, 74],
                [103, 191, 92],
                [237, 102, 93],
                [173, 139, 201],
                [268, 120, 110],
                [237, 151, 202],
                [162, 162, 162],
                [205, 204, 93],
                [109, 204, 218]
            ],
            dataColorsBlind: params.dataColorsBlind || [
                [0, 107, 164],
                [255, 128, 14],
                [171, 171, 171],
                [89, 89, 89],
                [95, 158, 209],
                [200, 82, 0],
                [137, 137, 137],
                [162, 200, 236],
                [255, 188, 121],
                [207, 207, 207]
            ]
        }
    };

    function Workspace(params){
        var me = this;
        params = params || {};
        GooeyObject.call(this, params);
        params.element = document.body;
        params.style = params.style || {};
        this.extends(MouseInteractions(params), KeyEvents(params), DOMElement(params), Container());
        this.palette = Palette(params.palette);
        params.style.backgroundColor = params.style.backgroundColor || me.palette.color1;
        params.style.padding = params.padding+'px' || '1px';
        params.style.overflow = params.style.overflow || 'hidden';
        this.style(params.style);
        this.width = function(){
            return window.innerWidth;
        };
        this.height = function(){
            return window.innerHeight;
        };
        this.borderRadius = params.borderRadius || 3;
        this.margin = params.margin || 1;
        this.objectHeight = params.objectHeight || 36;
        this.buttonWidth = params.buttonWidth || 36;
        this.toolbarHeight = params.toolbarHeight || 40;
        this.smallFont = params.smallFont || '16px';
        this.mediumFont = params.mediumFont || '20px';
        this.largeFont = params.largeFont || '24px';
        this.scrollSensitivity = params.scrollSensitivity || 12;
        this.padding = params.padding || 1;
        this.objectSpacing = params.objectSpacing || 2;

        this.usedColors = [];
        this.nextDataColor = function(){
            var i = getRandomInt(0, me.palette.dataColorsBold.length);
            while(me.usedColors.indexOf(i) > -1 && me.usedColors.length < me.palette.dataColorsBold.length){
                i = getRandomInt(0, me.palette.dataColorsBold.length);
            }
            this.usedColors.push(i);
            return i;
        };

        function colorFormat(color, type){
            if(typeof type === "undefined"){
                type = "rgb";
            }
            if(type === "rgb"){
                return color;
            }
            else if(type === "hex"){
                return Gooey.rgbToHex(color);
            }
            else if(type === "html"){
                return Gooey.rgbToHTML(color);
            }
            else if(type === "number"){
                return Gooey.rgbToNumber(color);
            }
        }

        this.workspaceColor = function(num, type){
            return colorFormat(me.palette.workspaceColors[num], type);
        };

        this.dataColorBold = function(num, type){
            return colorFormat(me.palette.dataColorsBold[num], type);
        };

        this.dataColorLight = function(num, type){
            return colorFormat(me.palette.dataColorsLight[num], type);
        };

        this.dataColorMedium = function(num, type){
            return colorFormat(me.palette.dataColorsMedium[num], type);
        };

        //This section is deprecated.  Please use Workspace.workspaceColor() in the future.
        this.color1 = function(type){
            return colorFormat(me.palette.workspaceColors[0], type);
        };
        this.color2 = function(type){
            return colorFormat(me.palette.workspaceColors[1], type);
        };
        this.color3 = function(type){
            return colorFormat(me.palette.workspaceColors[2], type);
        };
        this.color4 = function(type){
            return colorFormat(me.palette.workspaceColors[3], type);
        };
        this.color5 = function(type){
            return colorFormat(me.palette.workspaceColors[4], type);
        };
        this.color6 = function(type){
            return colorFormat(me.palette.workspaceColors[5], type);
        };
        this.color7 = function(type){
            return colorFormat(me.palette.workspaceColors[6], type);
        };

        this.keyHeld = [];
        this.host = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '')+'/';
        window.onresize = function(){
            for(var i = 0; i < me.children.length; i++){
                if(me.children[i].constructor.name === "Toolbar"){
                    if(me.children[i].orientation === "horizontal"){
                        me.children[i].width(me.width());
                    }
                    else if(me.children[i].orientation === "vertical"){
                        me.children[i].height(me.height()-me.children[i].style('top'));
                    }

                }
            }
        };
        this.space = function(){
            return me.padding+me.margin;
        };
        var mmFuncs = [];
        this.addMouseMoveFunction = function(){
            for(var i = 0; i < arguments.length; i++){
                mmFuncs.push(arguments[i]);
            }
        };
        this.removeMouseMoveFunction = function(){
            for(var i = 0; i < arguments.length; i++){
                while(mmFuncs.indexOf(arguments[i]) > -1){
                    mmFuncs.splice(mmFuncs.indexOf(arguments[i]), 1);
                }
            }
        };
        this.hasMouseMoveFunction = function(func){
            return mmFuncs.indexOf(func) > -1;
        };
        this.pointer = {x: 0, y: 0};
        window.onmousemove = function(e){
            me.mouseWhich = e.which;
            me.pointer = {x: e.x, y: e.y};
            for(var i = 0; i < mmFuncs.length; i++){
                mmFuncs[i](e);
            }
        };
        this.held = null;
        this.tween = .11;
        this.mouseWhich = 0;
        window.onmouseup = function(e){
            me.mouseWhich = e.which;
            if(me.mouseWhich === 1 && me.leftMouseUp){
                me.leftMouseUp(e);
            }
            else if(me.mouseWhich === 2 && me.middleMouseUp){
                me.middleMouseUp(e);
            }
            else if(me.mouseWhich === 3 && me.rightMouseUp){
                me.rightMouseUp(e);

            }
        };
        window.onmousedown = function(e){
            me.mouseWhich = e.which;
            if(me.mouseWhich === 1 && me.leftMouseDown){
                me.leftMouseDown(e);
            }
            else if(me.mouseWhich === 2 && me.middleMouseDown){
                me.middleMouseDown(e);
            }
            else if(me.mouseWhich === 3 && me.rightMouseDown){
                me.rightMouseDown(e);
            }
        };
        window.oncontextmenu = function(e){
            me.mouseWhich = e.which;
            if(me.rightClick){
                me.rightClick(e);
            }
            e.preventDefault();
        };
        attachMouseEvents(this);
        attachKeyEvents(this, {
            keyDown: {
                before: function(e){
                    me.keyHeld[e.which] = true;
                }
            },
            keyUp: {
                before: function(e){
                    me.keyHeld[e.which] = false;
                }
            }
        });
    }

    var Tokenizing = function(params){
        return {
            token: params.tokenizing,
            tokens: function(){
                var toks = this.text().split(params.tokenizing);
                for(var i = toks.length-1; i >= 0; i--){
                    toks[i].trim();
                    if(toks[i] === ""){
                        toks.splice(i, 1);
                    }
                }
                return toks;
            },
            onTokenPressed: params.onTokenPressed || function(){},
            onTokenDeleted: params.onTokenDeleted || function(){},
            initTokenizing: function(){
                var me = this;
                attachKeyEvents(this, {
                    'keyPress':{
                        'before': function(e){
                            if(String.fromCharCode(e.keyCode) === me.token){
                                me.onTokenPressed();
                            }
                        }
                    },
                    'keyDown': {
                        'after': function(e){
                            if(e.keyCode === 8 && me.text().slice(-1) === me.token){
                                me.onTokenDeleted();
                            }
                        }
                    }
                })
            }
        }
    };

    var Searchable = function(params){
        var searches = {};
        var sr = {};
        if(params.hasOwnProperty("searchable")){
            for(var k in params["searchable"]){
                if(params["searchable"].hasOwnProperty(k)){
                    params['searchable'][k].limit = params['searchable'][k].limit || 50;
                    searches[k] = new Bloodhound({
                        name: k,
                        local: params["searchable"][k].data || [],
                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace(params["searchable"][k].index || 'id'),
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        limit: params['searchable'][k].limit
                    });
                    searches[k].initialize();
                    searches[k].name = k;
                    searches[k].addData = function(){
                        var nds = Array.prototype.slice.call(arguments);
                        for(var i = 0; i < nds.length; i++){
                            nds[i]._searchid = this.name;
                        }
                        this.add(nds);
                    };
                    sr[k] = [];
                }
            }
        }
        return {
            searchEngines: searches,
            searchResults: sr,
            onResults: params.onResults || function(r){},
            onEmpty: params.onEmpty || function(){},
            nextResult: params.nextResult || function(){},
            previousResult: params.previousResult || function(){},
            submit: params.submit || function(){},
            reset: function(){
                for(var k in this.searchResults){
                    if(this.searchResults.hasOwnProperty(k)){
                        this.searchResults[k].length = 0;
                    }
                }
            },
            initSearchable: function(){
                var me = this;
                var beforeKeyUp = function(e, callback){
                    var allowedKeys = [8, 32, 27];
                    if((48 <= e.which && e.which <= 90) || allowedKeys.indexOf(e.which) > -1){
                        me.reset();
                        var checked = 0;
                        var totalResults = 0;
                        for(var k in me.searchEngines){
                            if(me.searchEngines.hasOwnProperty(k)){
                                me.searchEngines[k].search(me.text(), function(sugg){
                                    checked++;
                                    if(sugg.length > 0){
                                        if(sugg[0].hasOwnProperty('_searchid')){
                                            var sid = sugg[0]._searchid;
                                            me.searchResults[sid] = sugg.splice(0,params.searchable[sid].limit);
                                            totalResults += me.searchResults[sid].length;
                                        }
                                        else{
                                            console.log(sugg);
                                        }

                                    }
                                    if(checked === Object.keys(me.searchEngines).length){
                                        if(typeof callback !== "undefined"){
                                            callback(e);
                                            if(totalResults > 0){
                                                me.onResults(me.searchResults);
                                            }
                                            else{
                                                me.onEmpty();
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                    else{
                        callback(e);
                    }

                };
                attachKeyEvents(this, {
                    keyUp: {
                        async: beforeKeyUp
                    },
                    keyDown: {
                        before: function(e){
                            if(e.which === 40){
                                e.preventDefault();
                                me.nextResult();
                                return false;
                            }
                            else if(e.which === 38){
                                e.preventDefault();
                                me.previousResult();
                                return false;
                            }
                            else if(e.which === 13){
                                e.preventDefault();
                                me.submit();
                                return false;
                            }
                            else if(e.which === 27){
                                e.preventDefault();
                                me.text("");
                                me.reset();
                                me.onEmpty();
                                return false;
                            }
                        }
                    }
                })
            }
        }
    };

    function TextBox(params){
        var me = this;
        params = params || {};
        params.element = document.createElement('input');
        GooeyElement.call(this, params);
        this.extends(KeyEvents(params));
        this.element.setAttribute("type", "text");
        var defStyle = {
            backgroundColor: me.workspace.color1('html'),
            border: params.style.border || "1px solid "+me.workspace.color3('html'),
            borderRadius: me.workspace.borderRadius+'px',
            color: me.workspace.color4('html'),
            height: me.workspace.objectHeight-2+'px',
            paddingLeft: params.style.paddingLeft || 4+'px',
            fontSize: params.style.fontSize || me.workspace.mediumFont
        };
        if(params.hasOwnProperty('style')){
            for(var k in params.style){
                if(params.style.hasOwnProperty(k)){
                    defStyle[k] = params.style[k];
                }
            }
        }
        this.style(defStyle);
        this.height(me.workspace.objectHeight);
        this.element.placeholder = params.placeholder || "";
        this.element.value = params.text || null;
        attachMouseEvents(me);
        attachKeyEvents(me);
        this.text = function(t){
            if(typeof t === "undefined"){
                return me.element.value;
            }
            me.element.value = t;
        };
        if(typeof params.tokenizing !== "undefined"){
            this.extends(Tokenizing(params));
            this.initTokenizing();
        }
        if(typeof params.searchable === "object"){
            this.extends(Searchable(params));
            this.initSearchable();
        }
    }

    function Button(params){
        var me = this;
        params = params || {};
        params.element = document.createElement('button');
        GooeyElement.call(this, params);

        var defaultStyle = params.defaultStyle || {
                backgroundColor: me.workspace.color2('html'),
                color: me.workspace.color5('html')
            };

        var toggledStyle = params.toggledStyle || {
                backgroundColor: me.workspace.color5('html'),
                color: me.workspace.color2('html')
            };

        this.defaultStyle = function(ds){
            if(typeof ds === "undefined"){
                return defaultStyle;
            }
            defaultStyle = ds;
        };

        this.toggledStyle = function(ds){
            if(typeof ds === "undefined"){
                return toggledStyle;
            }
            toggledStyle = ds;
        };

        this.style({
            border: params.style.border || "1px solid "+defaultStyle.color,
            borderRadius: params.style.borderRadius || me.workspace.borderRadius+'px'
        });
        this.style(defaultStyle);
        this.height(params.style.height || me.workspace.objectHeight);
        this.width(params.style.width || me.workspace.buttonWidth);

        var standardBehaviors = {
            mouseDown: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color3('html'),
                        color: me.workspace.color6('html')
                    })
                }
            },
            mouseUp: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color1('html'),
                        color: me.workspace.color4('html')
                    });
                },
                after: function(e){
                    me.blur();
                }
            },
            mouseIn: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color1('html'),
                        color: me.workspace.color4('html')
                    });
                }
            },
            mouseOut: {
                before: function(e){
                    me.style(me.defaultStyle());
                }
            }
        };

        var toggledBehaviors = {
            mouseDown: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color3('html'),
                        color: me.workspace.color6('html')
                    })
                }
            },
            mouseUp: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color4('html'),
                        color: me.workspace.color1('html')
                    });
                },
                after: function(e){
                    me.blur();
                }
            },
            mouseIn: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color4('html'),
                        color: me.workspace.color1('html')
                    });
                }
            },
            mouseOut: {
                before: function(e){
                    me.style(me.toggledStyle());
                }
            }
        };

        this.standardBehaviors = function(sb, attach){
            if(typeof sb === "undefined"){
                return standardBehaviors;
            }
            standardBehaviors = sb;
            attach = attach || false;
            if(attach){
                attachMouseEvents(me, me.standardBehaviors());
            }

        };

        this.toggledBehaviors = function(tb, attach){
            if(typeof tb === "undefined"){
                return toggledBehaviors;
            }
            toggledBehaviors = tb;
            attach = attach || false;
            if(attach){
                attachMouseEvents(me, me.toggledBehaviors());
            }
        };

        attachMouseEvents(me, me.standardBehaviors());

        this.toggled = false;

        this.toggle = function(){
            me.toggled = !me.toggled;
            if(!me.toggled){
                attachMouseEvents(me, me.standardBehaviors());
                me.style(me.defaultStyle());
            }
            else{
                attachMouseEvents(me, me.toggledBehaviors());
                me.style(me.toggledStyle());
            }
        };

        this.toggleOn = function(){
            me.toggled = true;
            attachMouseEvents(me, me.toggledBehaviors());
            me.style(me.toggledStyle());
        };

        this.toggleOff = function(){
            me.toggled = false;
            attachMouseEvents(me, me.standardBehaviors());
            me.style(me.defaultStyle());
        };


    }

    function TextButton(params){
        var me = this;
        params = params || {};
        Button.call(this, params);
        this.element.innerHTML = params.text;
        this.style({
            fontSize: params.style.fontSize || me.workspace.mediumFont
        });
        this.text = function(t){
            if(typeof t === "undefined"){
                return me.element.innerHTML;
            }
            me.element.innerHTML = t;
        };
    }

    function WindowTextButton(params){
        var me = this;
        params = params || {};
        TextButton.call(this, params);
        this.window = params.window || null;
        var def;
        if(this.window && this.window.nested){
            me.toggleOff();
        }
        else{
            me.toggleOn();
        }
    }

    function Spacer(params){
        var me = this;
        params = params || {};
        TextButton.call(this, params);
        this.style({
            color: me.workspace.color3('html')
        });
        attachMouseEvents(me);
    }

    function ImageButton(params){
        var me = this;
        params = params || {};
        Button.call(this, params);

        var w = this.width();
        var h = this.height();
        var s = {
            padding: 0+'px',
            border: params.style.border || "none",
            backgroundRepeat: 'no-repeat'
        };
        if(params.centerImage){
            if(this.width() > this.height()){
                w = h = this.height();
                s.backgroundPosition = ((this.width()/2)-(w/2))+'px -1px';
            }
            else{
                w = h = this.width();
                s.backgroundPosition = '-1px '+((this.height()/2)-(h/2))+'px';
            }
        }
        else{
            s.backgroundPosition = '-1px -1px';

        }
        s.backgroundSize = w+"px "+h+"px";
        this.style(s);
        this.image = function(i){
            if(typeof i === "undefined"){
                return me.element.style.backgroundImage.split('url(')[1].slice(0,-1);
            }
            if(params.centerImage){
                if(this.width() > this.height()){
                    w = h = this.height();
                    me.element.style.backgroundPosition = ((this.width()/2)-(w/2))+'px -1px';
                }
                else{
                    w = h = this.width();
                    me.element.style.backgroundPosition = '-1px '+((this.height()/2)-(h/2))+'px';
                }
            }
            else{
                me.element.style.backgroundPosition = '-1px -1px';
            }
            me.element.style.backgroundImage = "url("+i+")";
        };
        if(typeof params.image_base !== "undefined"){

            params.image_base += "_"+(2*w)+"X"+(2*h)+"_";
            params.image1 = this.workspace.host+'icons/'+params.image_base+this.workspace.color1('hex').slice(1)+".png";
            params.image2 = this.workspace.host+'icons/'+params.image_base+this.workspace.color2('hex').slice(1)+".png";
            params.image3 = this.workspace.host+'icons/'+params.image_base+this.workspace.color3('hex').slice(1)+".png";
            params.image4 = this.workspace.host+'icons/'+params.image_base+this.workspace.color4('hex').slice(1)+".png";
            params.image5 = this.workspace.host+'icons/'+params.image_base+this.workspace.color5('hex').slice(1)+".png";
            params.image6 = this.workspace.host+'icons/'+params.image_base+this.workspace.color6('hex').slice(1)+".png";
            params.image7 = this.workspace.host+'icons/'+params.image_base+this.workspace.color7('hex').slice(1)+".png";
        }
        this.image1 = params.image1;
        this.image2 = params.image2;
        this.image3 = params.image3;
        this.image4 = params.image4;
        this.image5 = params.image5;
        this.image6 = params.image6;
        this.image7 = params.image7;
        this.image(this.image5);
        this.centerImage = function(){
            if(this.width() > this.height()){
                w = h = this.height();
                me.element.style.backgroundPosition = ((this.width()/2)-(w/2))+'px -1px';
            }
            else{
                w = h = this.width();
                me.element.style.backgroundPosition = '-1px '+((this.height()/2)-(h/2))+'px';
            }
        };
        this.standardBehaviors({
            mouseDown: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color3('html'),
                        color: me.workspace.color6('html')
                    });
                    me.image(me.image6);
                }
            },
            mouseUp: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color1('html'),
                        color: me.workspace.color4('html')
                    });
                    me.image(me.image4);
                },
                after: function(e){
                    me.blur();
                }
            },
            mouseIn: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color1('html'),
                        color: me.workspace.color4('html')
                    });
                    me.image(me.image4);
                }
            },
            mouseOut: {
                before: function(e){
                    me.style(me.defaultStyle());
                    me.image(me.image5);
                }
            }
        });

        this.toggledBehaviors({
            mouseDown: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color6('html'),
                        color: me.workspace.color3('html')
                    });
                    me.image(me.image3);
                }
            },
            mouseUp: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color4('html'),
                        color: me.workspace.color1('html')
                    });
                    me.image(me.image1);
                },
                after: function(e){
                    me.blur();
                }
            },
            mouseIn: {
                before: function(e){
                    me.style({
                        backgroundColor: me.workspace.color4('html'),
                        color: me.workspace.color1('html')
                    });
                    me.image(me.image1);
                }
            },
            mouseOut: {
                before: function(e){
                    me.style(me.toggledStyle());
                    me.image(me.image2);
                }
            }
        });

        attachMouseEvents(me, me.standardBehaviors());

        this.toggle = function(){
            me.toggled = !me.toggled;
            if(!me.toggled){
                attachMouseEvents(me, me.standardBehaviors());
                me.style(me.defaultStyle());
                me.image(me.image5);
            }
            else{
                attachMouseEvents(me, me.toggledBehaviors());
                me.style(me.toggledStyle());
                me.image(me.image2);
            }
        };

        this.toggleOn = function(){
            me.toggled = true;
            attachMouseEvents(me, me.toggledBehaviors());
            me.style(me.toggledStyle());
            me.image(me.image2);
        };

        this.toggleOff = function(){
            me.toggled = false;
            attachMouseEvents(me, me.standardBehaviors());
            me.style(me.defaultStyle());
            me.image(me.image5);
        };


    }

    function WindowImageButton(params){
        var me = this;
        params = params || {};
        ImageButton.call(this, params);
        this.window = params.window || null;
        var def;
        if(this.window && this.window.nested){
            this.toggleOff();
        }
        else{
            this.toggleOn();
        }
    }

    function Picture(params){
        var me = this;
        params = params || {};
        params.element = new Image();
        GooeyElement.call(this, params);
        this.onLoad = params.onLoad || function(){};

        attachMouseEvents(me);

        this.image = function(i){
            if(typeof i === "undefined"){
                return me.element.src;
            }
            me.element.src = i;
            me.image1 = i;
        };
        this.image1 = params.image;

        var nativeSize = params.nativeSize || false;
        this.nativeSize = function(ns){
            if(typeof ns === "undefined"){
                return nativeSize;
            }
            nativeSize = ns;

            me.element.onload = function(){
                if(nativeSize){
                    var w = me.element.width+'px';
                    var h = me.element.height+'px';
                    me.style({
                        width: w,
                        height: h,
                        backgroundSize: w+" "+h
                    });
                }
                else if(typeof params.scaleToWidth !== "undefined"){
                    me.scaleToWidth(params.scaleToWidth);
                }
                 else if(typeof params.scaleToHeight !== "undefined"){
                    me.scaleToHeight(params.scaleToHeight);
                }
                me.onLoad();
            };
        };
        this.nativeSize(nativeSize);
        this.element.src = params.image;

        this.scaleToWidth = function(w){
            me.style({
                width: w+'px'
            });
        };
        this.scaleToHeight = function(h){
            me.style({
                height: h+'px'
            });
        };
    }

    function DockVoid(params){
        var me = this;
        params = params || {};
        params.element = document.createElement('div');
        GooeyElement.call(this, params);
        this.toolbar = params.toolbar;
        this.toolbarIndex = params.toolbarIndex || 0;
        this.orientation = params.orientation || "horizontal";
        this.style({
            zIndex: params.style.zIndex || 2
        });
        attachMouseEvents(this, {
            mouseIn: {
                before: function(e){
                    if(me.orientation === "horizontal"){
                        me.style({
                            cursor: 'ns-resize'
                        });
                    }
                    else if(me.orientation === "vertical"){
                        me.style({
                            cursor: 'ew-resize'
                        });
                    }
                    else if(me.orientation === "swcorner" || me.orientation === "necorner"){
                        me.style({
                            cursor: 'nesw-resize'
                        });
                    }
                    else if(me.orientation === "nwcorner" || me.orientation === "secorner"){
                        me.style({
                            cursor: 'nwse-resize'
                        });
                    }

                }
            },
            mouseOut: {
                before: function(e){
                    me.style({
                        cursor: 'auto'
                    })
                }
            }
        });
    }

    function Slider(params){
        var me = this;
        params = params || {};
        params.element = document.createElement("input");
        params.element.setAttribute("type", "range");
        params.element.setAttribute("orient", params.orientation || "horizontal");

        params.element.min = params.min || 1;
        params.element.max = params.max || 10;
        params.element.step = params.step || 1;
        params.element.defaultValue = params.defaultValue || params.min || 1;
        GooeyElement.call(this, params);
        if(params.orientation === "vertical") {
            me.style({
                'writing-mode': 'bt-lr',
                '-webkit-appearance': 'slider-vertical'
            })
        }
        this.min = function(nm){
            if(typeof nm === "undefined"){
                return me.element.min;
            }
            me.element.min = nm;
        };

        this.max = function(nm){
            if(typeof nm === "undefined"){
                return me.element.max;
            }
            me.element.max = nm;
        };

        this.step = function(s){
            if(typeof s === "undefined"){
                return me.element.step;
            }
            me.element.step = s;
        };

        this.defaultValue = function(dv){
            if(typeof dv === "undefined"){
                return me.element.defaultValue;
            }
            me.element.defaultValue = dv;
        };

        this.value = function(v){
            if(typeof v === "undefined"){
                return Number(me.element.value);
            }
            me.element.value = Number(v);
        }
    }

    function Toolbar(params){
        var me = this;
        params = params || {};
        ComplexElement.call(this, params);
        this.orientation = params.orientation || "horizontal";
        this.minWidth = params.minWidth = 231;
        this.window = params.window || null;
        var s = {
            backgroundColor: params.style.backgroundColor || me.workspace.color2('html'),
            border: params.style.border || 'none',
            padding: params.style.padding || me.workspace.padding+'px',
            overflow: 'hidden'
        };
        var reindex = function(){
            for(var i = 0; i < me.children.length; i++){
                if(me.children[i].hasOwnProperty('toolbarIndex')){
                    me.children[i].toolbarIndex = i;
                }
            }
        };
        var scrollStyle = {};
        this.topStuck = typeof params.style.top !== "undefined";
        this.bottomStuck = typeof params.style.bottom !== "undefined";
        this.rightStuck = typeof params.style.right !== "undefined";
        this.leftStuck = typeof params.style.left !== "undefined";
        var scrollBuffer = 0;
        if(me.topStuck && me.rightStuck){
            scrollStyle = {
                top: scrollBuffer+'px',
                right: scrollBuffer+'px'
            }
        }
        else if(me.bottomStuck && me.rightStuck){
            scrollStyle = {
                bottom: scrollBuffer+'px',
                right: scrollBuffer+'px'
            }
        }
        else if(me.bottomStuck && me.leftStuck){
            scrollStyle = {
                bottom: scrollBuffer+'px',
                left: scrollBuffer+'px'
            }
        }
        else if(me.topStuck && me.leftStuck){
            scrollStyle = {
                top: scrollBuffer+'px',
                left: scrollBuffer+'px'
            }
        }

        if(this.orientation === "horizontal"){
            s.width = params.style.width || me.workspace.width()+'px';
            s.height = params.style.height ||  me.workspace.toolbarHeight+'px';
        }
        else if(this.orientation === "vertical"){
            s.width = params.style.width || me.workspace.toolbarHeight+'px';
            s.height = params.style.height || me.workspace.height() - me.style('top')+'px';
        }

        this.style(s);

        var scrollBar = new ScrollBar({
            workspace: me.workspace,
            toolbar: me,
            orientation: me.orientation,
            style: scrollStyle
        });
        var checkScrolls = function(){
            //console.log(me.childrenWidth());
            var vert = me.orientation === "vertical" && (me.childrenHeight() > me.height()-(2*me.workspace.space()));
            var hor = me.orientation === "horizontal" && (me.childrenWidth() > me.width()-(2*me.workspace.space()));
            if(vert || hor){
                me.enableScroll();
                scrollBar.setSlideSize();
            }
            else if(scrollBar.active()){
                me.disableScroll();
            }
        };
        this.addFromLeft = function(){
            var space = me.workspace.padding+me.workspace.margin;
            var left = space;
            for(var i = 0; i < me.children.length; i++){
                if(me.children[i].style('left') > space){
                    left += me.children[i].width() + space;
                }
            }
            for(var i = 0; i < arguments.length; i++){
                if(typeof arguments[i] === "string"){
                    var spacer = new Spacer({
                        workspace: me.workspace,
                        text: arguments[i],
                        style:{
                            width: me.workspace.objectHeight / 2 +'px',
                            border: 'none',
                            top: space+'px',
                            left: left+'px',
                            fontWeight: 'lighter'
                        }
                    });
                    me.addChild(spacer);
                    left += spacer.width() + space;
                }
                else{
                    arguments[i].style({
                        'top': space+'px',
                        'left': left+'px'
                    });
                    if(arguments[i].constructor.name === "GooeyWindow"){
                        arguments[i].height(me.height()-2*space);
                        //arguments[i].width(arguments[i].minWidth);
                        arguments[i].toolbar = me;
                        arguments[i].toolbarIndex = me.children.length;
                        arguments[i].docked = true;
                        dockedWinVoids(arguments[i]);
                    }
                    left += arguments[i].width() + space;
                    me.addChild(arguments[i]);

                }
            }
            checkScrolls();
        };
        this.addFromRight = function(){
            var space = me.workspace.padding+me.workspace.margin;
            var right = space;
            for(var i = 0; i < me.children.length; i++){
                if(me.children[i].style('right') > space){
                    right += me.children[i].width() + space;
                }
            }
            for(var i = 0; i < arguments.length; i++){

                if(typeof arguments[i] === "string"){
                    var spacer = new Spacer({
                        workspace: me.workspace,
                        text: arguments[i],
                        style:{
                            width: me.workspace.objectHeight / 2 +'px',
                            border: 'none',
                            top: space+'px',
                            right: right+'px',
                            fontWeight: 'lighter'
                        }
                    });
                    me.addChild(spacer);
                    right += spacer.width() + space;
                }
                else{
                    arguments[i].style({
                        'top': space+'px',
                        'right': right+'px'
                    });
                    if(arguments[i].constructor.name === "GooeyWindow"){
                        arguments[i].height(me.height()-2*space);
                        //arguments[i].width(arguments[i].minWidth);
                        arguments[i].toolbar = me;
                        arguments[i].toolbarIndex = me.children.length;
                        arguments[i].docked = true;
                        dockedWinVoids(arguments[i]);
                    }
                    me.addChild(arguments[i]);
                    right += arguments[i].width() + space;
                }

            }
            checkScrolls();
        };
        this.addFromTop = function(){
            var space = me.workspace.space();
            var top = space;
            for(var i = 0; i < me.children.length; i++){
                if(me.children[i].style('top') >= space){
                    top += me.children[i].style('height')+me.children[i].style('padding')+space;
                }
            }
            for(var i = 0; i < arguments.length; i++){
                arguments[i].style({
                    'top': top+'px',
                    'left': space+'px'
                });
                if(arguments[i].constructor.name === "GooeyWindow"){
                    arguments[i].width(me.width()-2*space);
                    arguments[i].toolbar = me;
                    arguments[i].toolbarIndex = me.children.length;
                    arguments[i].docked = true;
                    dockedWinVoids(arguments[i]);
                }
                me.addChild(arguments[i]);
                top += arguments[i].style('height') + arguments[i].style('padding')+space;

            }
            checkScrolls();

        };
        this.addFromBottom = function(){
            var space = me.workspace.padding+me.workspace.margin;
            var bottom = space;
            for(var i = 0; i < me.children.length; i++){
                if(me.children[i].style('bottom') > space){
                    bottom += me.children[i].height() + space;
                }
            }
            for(var i = 0; i < arguments.length; i++){
                arguments[i].style({
                    'bottom': bottom+'px',
                    'left': space+'px'
                });
                me.addChild(arguments[i]);
                bottom += arguments[i].height() + space;
            }
            checkScrolls();
        };
        this.childrenHeight = function(){
            if(me.children.length > 0){
                if(me.children[me.children.length-1].element.style.top !== ""){
                    return (me.children[me.children.length-1].style('top')+me.children[me.children.length-1].height())-me.children[0].style('top');
                }
                else if(me.children[me.children.length-1].element.style.bottom !== ""){
                    return (me.children[me.children.length-1].style('bottom')+me.children[me.children.length-1].height())-me.children[0].style('bottom');
                }
            }
            return 0;
        };
        this.childrenWidth = function(){
            if(me.children.length > 0){
                if(me.children[me.children.length-1].element.style.left !== ""){
                    return (me.children[me.children.length-1].style('left')+me.children[me.children.length-1].width())-me.children[0].style('left');
                }
                else if(me.children[me.children.length-1].style.right !== ""){
                    return (me.children[me.children.length-1].style('right')+me.children[me.children.length-1].width())-me.children[0].style('right');
                }
            }
            return 0;
        };
        this.scoot = function(distance, beg, end){
            beg = beg || 0;
            end = end || me.children.length;
            if(beg > me.children.length){
                beg = me.children.length;
            }
            if(beg < 0){
                beg = 0;
            }
            if(end > me.children.length){
                end = me.children.length;
            }
            for(var i = beg; i < end; i++){
                if(me.orientation === "vertical"){
                    me.children[i].style({
                        top: me.children[i].style('top')+distance+'px'
                    });
                }
                else if(me.orientation === "horizontal"){
                    me.children[i].style({
                        left: me.children[i].style("left")+distance+'px'
                    });
                }
            }

            if(me.orientation === "vertical"){
                var vals = {
                    contentTop: me.children[0].style('top'),
                    contentHeight: me.childrenHeight(),
                    availHeight: me.height(),
                    bottomSpace: function(){ return this.availHeight - (this.contentTop+this.contentHeight)}
                };
                if(vals.contentTop < 0 && vals.bottomSpace() > 0){
                    me.scoot(Math.min(Math.abs(vals.contentTop), vals.bottomSpace()));
                }
                else if(vals.contentTop > me.style('padding')){
                    me.scoot(-(vals.contentTop - me.style('padding')));
                }
            }
            else if(me.orientation === "horizontal"){
                var vals = {
                    contentLeft: me.children[0].style('left'),
                    contentWidth: me.childrenWidth(),
                    availWidth: me.width(),
                    rightSpace: function(){ return this.availWidth - (this.contentLeft+this.contentWidth)}
                };
                if(vals.contentLeft < 0 && vals.rightSpace() > 0){
                    me.scoot(Math.min(Math.abs(vals.contentLeft), vals.rightSpace()));
                }
                else if(vals.contentLeft > me.style('padding')){
                    me.scoot(-(vals.contentLeft - me.style('padding')));
                }
            }
            checkScrolls();


        };
        var dockedWinVoids = function(win){
            if (me.rightStuck && me.topStuck) {
                win.voids('l', 'b', 'bl');
            }
            else if(me.leftStuck && me.topStuck) {
                win.voids('r', 'b', 'br');
            }
            else if(me.rightStuck && me.bottomStuck){
                win.voids('l', 't', 'tl');
            }
            else if(me.leftStuck && me.bottomStuck){
                win.voids('r', 't', 'tr');
            }
        };
        this.dock = function(win, ind){
            var space = me.workspace.space();
            var scoot = false;
            var shadStyle = 'none';
            win.style({
                'box-shadow': shadStyle,
                '-webkit-box-shadow': shadStyle,
                '-moz-box-shadow': shadStyle
            });
            dockedWinVoids(win);

            if(ind > me.children.length - 1){
                me.addFromTop(win);
            }
            else{
                var top = me.children[ind].style('top');
                win.style({
                    'top': top+'px',
                    'left': space+'px'
                });
                win.width(me.children[ind].width());
                win.docked = true;
                me.addChildAt(win, ind);
                scoot = true;
            }
            reindex();
            if(scoot){
                me.scoot(win.height()+me.workspace.padding, ind+1);
            }
            win.unhold();
        };
        this.undock = function(win){
            me.removeChild(win);
            reindex();
            me.workspace.addChild(win);
            var shadStyle = '0px 2px 4px '+me.workspace.color5('html');
            win.style({
                'box-shadow': shadStyle,
                '-webkit-box-shadow': shadStyle,
                '-moz-box-shadow': shadStyle
            });
            me.scoot(-(win.height()+me.workspace.padding), win.toolbarIndex);
            win.docked = false;

        };
        this.setWidth = function(w){
            var thresh = me.minWidth;
            if(scrollBar.active() && me.orientation === "vertical"){
                thresh += me.workspace.space() + scrollBar.width();
            }
            if(w < thresh){
                w = thresh;
            }
            me.width(w);
            if(me.orientation === "vertical"){
                for(var i = 0; i < me.children.length; i++){
                    if(me.children[i].constructor.name === "GooeyWindow"){
                        if(scrollBar.active()){
                            me.children[i].width(w-(3*me.workspace.space())-scrollBar.width());
                            if(me.leftStuck){
                                me.children[i].style({
                                    left: scrollBar.width()+me.workspace.space() + 'px'
                                });
                            }
                        }
                        else{
                            me.children[i].width(w-(2*me.workspace.space()));
                        }

                    }
                }
                if(me.window && me.window.nested && typeof me.window.toolbar !== "undefined"){
                    if(me.width() > me.window.toolbar.width()-(me.workspace.space())){
                        me.window.toolbar.setWidth(me.width()+(me.workspace.space()));
                    }

                }
            }

        };
        this.setHeight = function(h){
            var thresh = me.minHeight;
            if(scrollBar.active() && me.orientation === "horizontal"){
                thresh += me.workspace.space() + scrollBar.height();
            }
            if(h < thresh){
                h = thresh;
            }
            me.height(h);
            if(me.orientation === "horizontal"){
                for(var i = 0; i < me.children.length; i++){
                    if(me.children[i].constructor.name === "GooeyWindow"){
                        if(scrollBar.active()){
                            me.children[i].height(h-(3*me.workspace.space())-scrollBar.height());
                            if(me.topStuck){
                                me.children[i].style({
                                    top: scrollBar.height()+me.workspace.space()+'px'
                                });
                            }
                        }
                        else{
                            me.children[i].height(h-(2*me.workspace.space()));
                        }
                    }
                }
            }
            else if(me.orientation === "vertical"){
                scrollBar.height(me.height());
            }
            checkScrolls();
        };
        this.enableScroll = function(){
            me.element.appendChild(scrollBar.element);
            scrollBar.active(true);
            if(me.orientation === "vertical"){
                me.setWidth(me.width());
            }
            else if(me.orientation === "horizontal"){
                me.setHeight(me.height());
            }
        };
        this.disableScroll = function(){
            me.element.removeChild(scrollBar.element);
            scrollBar.active(false);
            var tDiff;
            if(me.orientation === "vertical"){
                me.setWidth(me.width());
                tDiff = me.workspace.space() - me.children[0].style('top');
            }
            else if(me.orientation === "horizontal"){
                me.setHeight(me.height());
                tDiff = me.workspace.space() - me.children[0].style('left');
            }
            me.scoot(tDiff);
        };

    }

    function Label(params){
        var me = this;
        params = params || {};
        params.element = document.createElement('label');
        GooeyElement.call(this, params);
        me.element.innerText = params.text || '';
        me.style({
            fontSize: params.style.fontSize || me.workspace.mediumFont,
            color: params.style.color || me.workspace.color5('html')
        });
        this.text = function(t){
            if(typeof t === "undefined"){
                return me.element.innerText;
            }
            me.element.innerText = t;
        };
    }

    function CanvasSlider(params){
        params = params || {};
        var me = this;
        params.element = document.createElement('canvas');
        if(params.hasOwnProperty('style')){
            if(params.style.hasOwnProperty('width')){
                params.element.width = pxToNum(params.style.width);
                delete params.style.width;
            }
            else{
                params.element.width = params.workspace.buttonWidth;
            }
            if(params.style.hasOwnProperty('height')){
                params.element.height = pxToNum(params.style.height);
                delete params.style.height;
            }
            else{
                params.element.height = params.workspace.objectHeight;
            }
            params.style.backgroundColor = params.style.backgroundColor || 'transparent';

        }
        else{
            params.element.width = params.workspace.buttonWidth;
            params.element.height = params.workspace.objectHeight;
            params.style = {
                backgroundColor: 'transparent'
            };
        }
        GooeyElement.call(this, params);

        this.width = function(w){
            if(typeof w === "undefined"){
                return me.element.width;
            }
            me.element.width = w;
            me.draw();
        };

        this.height = function(h){
            if(typeof h === "undefined"){
                return me.element.height;
            }
            me.element.height = h;
            me.draw();
        };

        this.min = params.min || 1;
        this.max = params.max || 10;
        this.step = params.step || 1;

        this.handles = params.handles || 1;

        var values = [];
        var hitBoxes = [];
        var events = [];
        var pressed = null;

        this.values = function(){
            return values;
        };

        this.setValue = function(index, value){
            if(value < me.min){
                value = me.min;
            }
            else if(value > me.max){
                value = me.max;
            }
            values[index] = value;
        };

        for(var i = 0; i < params.handles; i++){
            values.push((i/(params.handles-1))*(this.max-this.min)+this.min);
            hitBoxes.push({x1: 0, x2: 0, y1: 0, y2: 0});
            events.push(undefined);
        }

        params.drawStyle = params.drawStyle || {};
        params.drawStyle.track = params.drawStyle.track || {};
        params.drawStyle.handle = params.drawStyle.handle || {};
        params.drawStyle.handle.mouseIn = params.drawStyle.handle.mouseIn || {};
        params.drawStyle.handle.mouseDown = params.drawStyle.handle.mouseDown || {};

        this.drawStyle = {
            track: {
                activeWidth: params.drawStyle.track.activeWidth || 7,
                color: params.drawStyle.track.color || me.workspace.color5('html'),
                inactiveWidth: params.drawStyle.track.inactiveWidth || 2
            },
            handle: {
                shape: params.drawStyle.handle.shape || "circle",
                lineColor: params.drawStyle.handle.lineColor || me.workspace.color5('html'),
                fill: params.drawStyle.handle.fill || me.workspace.color2('html'),
                strokeWidth: params.drawStyle.handle.strokeWidth || 3,
                size: params.drawStyle.handle.size || 5,
                mouseIn: {
                    lineColor: params.drawStyle.handle.mouseIn.lineColor || me.workspace.color4('html'),
                    fill: params.drawStyle.handle.mouseIn.fill || me.workspace.color1('html')
                },
                mouseDown: {
                    lineColor: params.drawStyle.handle.mouseDown.lineColor || me.workspace.color6('html'),
                    fill: params.drawStyle.handle.mouseDown.fill || me.workspace.color3('html')
                }
            }
        };

        var drawHandle = function(ctx, x, i){
            var y = me.element.height/2;
            if(typeof events[i] === "undefined"){
                ctx.fillStyle = me.drawStyle.handle.fill;
                ctx.strokeStyle = me.drawStyle.handle.lineColor;
            }
            else if(events[i] === "mouseIn"){
                ctx.fillStyle = me.drawStyle.handle.mouseIn.fill;
                ctx.strokeStyle = me.drawStyle.handle.mouseIn.lineColor;
            }
            else if(events[i] === "mouseDown"){
                ctx.fillStyle = me.drawStyle.handle.mouseDown.fill;
                ctx.strokeStyle = me.drawStyle.handle.mouseDown.lineColor;
            }
            ctx.lineWidth = me.drawStyle.handle.strokeWidth;
            ctx.beginPath();
            var r = me.drawStyle.handle.size;
            if(me.drawStyle.handle.shape === "circle"){
                ctx.arc(x, y, r, 0, 2*Math.PI);
            }
            else if(me.drawStyle.handle.shape === "square"){
                ctx.rect(x-(r/2), y-(r/2), r, r);
            }
            ctx.fill();
            ctx.stroke();
        };

        var drawCenterLine = function(ctx, margin){
            var center = me.element.height/2;
            var length = me.element.width-(2*margin);
            ctx.fillStyle = me.drawStyle.track.color;
            ctx.beginPath();
            ctx.fillRect(margin, center - (me.drawStyle.track.inactiveWidth/2), length, me.drawStyle.track.inactiveWidth);
        };

        var drawBar = function(ctx, x, width){
            var h = me.drawStyle.track.activeWidth;
            var y = (me.element.height/2) - (h/2);
            ctx.fillStyle = me.drawStyle.track.color;
            ctx.beginPath();
            ctx.fillRect(x, y, width, h);
        };

        var margin = function(){
            var margin = me.workspace.objectSpacing;
            if(me.drawStyle.handle.shape === "circle"){
                margin += me.drawStyle.handle.size;
            }
            else if(me.drawStyle.handle.shape === "square"){
                margin += me.drawStyle.handle.size/2;
            }
            return margin;
        };

        this.draw = function(){
            var ctx = me.element.getContext('2d');
            ctx.clearRect(0, 0, me.element.width, me.element.height);

            var m = margin();

            var length = me.element.width-(2*m);

            drawCenterLine(ctx, m);

            var bStart = m;

            var bEnd;

            if(values.length === 1){
                bEnd = m + (((values[0] - me.min) / (me.max - me.min)) * length);
            }
            else{
                bStart = m + (((values[0] - me.min) / (me.max - me.min)) * length);
                bEnd = m + (((values[values.length-1] - me.min) / (me.max - me.min)) * length);
            }

            drawBar(ctx, bStart, bEnd-bStart);

            var y = me.element.height / 2;
            for(var i = 0; i < values.length; i++){
                var x = m + (((values[i] - me.min) / (me.max - me.min)) * length);
                drawHandle(ctx, x, i);
                var r = 0;

                if(me.drawStyle.handle.shape === "circle"){
                    r = me.drawStyle.handle.size;
                }
                else if(me.drawStyle.handle.shape === "square"){
                    r = me.drawStyle.handle.size / 2;
                }
                hitBoxes[i] = {x1: x-r, x2: x+r, y1: y-r, y2: y+r};
            }
        };

        this.onInput = params.onInput || function(vals){};

        var mmFunc = function(e){
            var m = margin();
            var length = me.element.width-(2*m);
            var val = (e.offsetX-m)/length;
            if(val < 0){
                val = 0;
            }
            else if(val > 1){
                val = 1;
            }
            if(pressed !== null){
                var ov = values[pressed];
                values[pressed] = Math.round(((val*(me.max-me.min))+me.min) / me.step) * me.step;
                if(ov !== values[pressed]){
                    me.onInput(values);
                }
            }
            me.draw();
        };

        this.element.onmousemove = function(e){
            var x = e.offsetX;
            var y = e.offsetY;
            var draw = false;
            for(var i = 0; i < hitBoxes.length; i++){
                var b = hitBoxes[i];
                if(b.x1 <= x && x <= b.x2 && b.y1 <= y && y <= b.y2){
                    if(events[i] !== 'mouseIn'){
                        draw = true;
                    }
                    events[i] = 'mouseIn';
                }
                else{
                    if(events[i] !== undefined){
                        draw = true;
                    }
                    events[i] = undefined;
                }
            }
            if(draw){
                me.draw();
            }
        };

        this.element.onmousedown = function(e){
            var x = e.offsetX;
            var y = e.offsetY;
            var draw = false;
            for(var i = 0; i < hitBoxes.length; i++){
                var b = hitBoxes[i];
                if(b.x1 <= x && x <= b.x2 && b.y1 <= y && y <= b.y2){
                    if(events[i] !== 'mouseDown'){
                        draw = true;
                        me.workspace.addMouseMoveFunction(mmFunc);
                    }
                    events[i] = 'mouseDown';
                    pressed = i;
                }
                else{
                    if(events[i] !== undefined){
                        draw = true;
                    }
                    events[i] = undefined;
                }
            }
            if(draw){
                me.draw();
            }
        };

        this.element.onmouseup = function(e){
            var x = e.offsetX;
            var y = e.offsetY;
            var draw = false;
            for(var i = 0; i < hitBoxes.length; i++){
                var b = hitBoxes[i];
                if(b.x1 <= x && x <= b.x2 && b.y1 <= y && y <= b.y2){
                    if(events[i] !== 'mouseIn'){
                        draw = true;
                    }
                    events[i] = 'mouseIn';
                }
                else{
                    if(events[i] !== undefined){
                        draw = true;
                    }
                    events[i] = undefined;
                }
            }
            if(draw){
                me.draw();
            }
            me.workspace.removeMouseMoveFunction(mmFunc);
            pressed = null;
        };

        this.element.onmouseout = function(){
            me.workspace.removeMouseMoveFunction(mmFunc);
        };

        this.clear = function(){
            var ctx = me.element.getContext('2d');
            ctx.clearRect(0, 0, me.element.width, me.element.height);
        }
    }

    function DropDownMenu(params){
        var me = this;
        params = params || {};
        ComplexElement.call(this, params);
        this.style({
            height: me.workspace.objectHeight+'px'
        });
        var top = new TextButton({
            workspace: me.workspace,
            text: '&#9658;        '+params.label,
            style: {
                textAlign: 'left',
                verticalAlign: 'middle',
                width: me.width()+'px',
                'white-space': 'nowrap'
            },
            leftClick: function(){
                if(me.expanded){
                    me.collapse();
                }
                else{
                    me.expand();
                }
            }
        });
        if(typeof params.reverseColored !== "undefined" && params.reverseColored){
            top.toggleOn();
        }
        var rgb = me.workspace.color5('rgb');
        var htmlColor = "rgba("+rgb[0]+','+rgb[1]+','+rgb[2]+',.75)';
        this.options = params.options || [];
        var contents = new ComplexElement({
            workspace: me.workspace,
            style: {
                zIndex: 3,
                width: me.width()+'px',
                height: (me.options.length*me.workspace.objectHeight)+'px',
                backgroundColor: me.workspace.color5('html'),
                'box-shadow': '0px 2px 4px '+htmlColor,
                borderRadius: top.style('borderRadius')+'px'
            }
        });
        this.expanded = false;
        this.onSelection = params.onSelection || function(s){};
        this.expand = function(){
            me.expanded = true;
            top.text('&#9660;         '+params.label);
            if(me.workspace.children.indexOf(contents) === -1){
                var tp = top.absolutePosition();
                contents.style({
                    top: tp.top + tp.height + 'px',
                    left: tp.left + 'px'
                });
                me.workspace.addChild(contents);
            }
            var ct = 0;
            for(var i = 0; i < me.options.length; i++){
                var opt = new TextButton({
                    workspace: me.workspace,
                    text: me.options[i].display,
                    style: {
                        width: me.width()-(3*me.workspace.objectSpacing)+'px',
                        top: ct+'px',
                        textAlign: 'left',
                        'white-space': 'nowrap'
                    }
                });
                if(typeof params.reverseColored !== "undefined" && params.reverseColored){
                    opt.toggleOn();
                }
                opt.data = me.options[i];
                opt.leftClick = function(){
                    me.onSelection(this.data);
                    me.collapse();
                    top.text('&#9658;         '+this.data.display);
                };
                ct += opt.height();
                contents.addChild(opt);
            }
        };
        this.collapse = function(){
            me.expanded = false;
            top.text('&#9658;         '+params.label);
            while(contents.children.length > 0){
                contents.removeChild(contents.children[0]);
            }
            if(me.workspace.children.indexOf(contents) > -1){
                me.workspace.removeChild(contents);
            }
        };
        this.setWidth = function(w){
            me.width(w);
            top.width(w);
            top.style({
                'padding-left': '6px'
            });
            contents.width(w);
        };
        this.addChild(top);
    }

    function RangeInput(params){
        var me = this;
        params = params || {};
        ComplexElement.call(this, params);
        this.style({
            height: me.workspace.objectHeight+'px'
        });

        this.min = params.min || 1;
        this.max = params.max || 10;
        this.step = params.step || 1;

        var minBox = new TextBox({
            workspace: me.workspace,
            text: me.min,
            style: {
                left: '0px',
                width: me.workspace.objectHeight+'px',
                height: me.workspace.objectHeight+'px',
                backgroundColor: me.workspace.color5('html'),
                color: me.workspace.color2('html')
            }
        });

        var maxBox = new TextBox({
            workspace: me.workspace,
            text: me.max,
            style: {
                right: '0px',
                width: me.workspace.objectHeight+'px',
                height: me.workspace.objectHeight+'px',
                backgroundColor: me.workspace.color5('html'),
                color: me.workspace.color2('html')
            }
        });

        var slider = new CanvasSlider({
            workspace: me.workspace,
            style: {
                left: minBox.width()+me.workspace.objectSpacing+'px',
                width: me.width()-minBox.width()-maxBox.width()-(5*me.workspace.objectSpacing)+'px',
                height: me.workspace.objectHeight-(2 * me.workspace.padding) + 'px'
            },
            min: me.min,
            max: me.max,
            step: me.step,
            handles: 2
        });

        if(params.hasOwnProperty('reverseColor') && params.reverseColor){
            slider.drawStyle.track.color = me.workspace.color2('html');
            slider.drawStyle.handle.fill = me.workspace.color5('html');
            slider.drawStyle.handle.lineColor = me.workspace.color2('html');
            slider.drawStyle.handle.mouseIn = {
                fill: me.workspace.color4('html'),
                lineColor: me.workspace.color1('html')
            };
            slider.drawStyle.handle.mouseDown = {
                fill: me.workspace.color6('html'),
                lineColor: me.workspace.color3('html')
            };
        }

        this.minVal = function(m){
            if(typeof m === "undefined"){
                return slider.values()[0];
            }
            slider.setValue(0, m);
            var min = slider.values()[0];
            var max = slider.values()[1];
            if(min >= max){
                slider.setValue(1, min+me.step);
                max = slider.values()[1];
                maxBox.text(max);
                //me.maxVal = max;
            }
            minBox.text(min);
            slider.draw();
        };

        this.maxVal = function(m){
            if(typeof m === "undefined"){
                return slider.values()[1];
            }
            slider.setValue(1, m);
            var min = slider.values()[0];
            var max = slider.values()[1];
            if(min >= max){
                slider.setValue(0, max-me.step);
                min = slider.values()[0];
                minBox.text(min);
                //me.minVal = min;
            }
            maxBox.text(max);
            slider.draw();
        };

        minBox.keyDown = function(e){
            if(e.which === 13){
                me.minVal(minBox.text());
            }
            else if(e.which === 40){
                me.minVal(Math.round((Number(minBox.text())-me.step) / me.step) * me.step);
            }
            else if(e.which === 38){
                me.minVal(Math.round((Number(minBox.text())+me.step) / me.step) * me.step);
            }
            else{
                return;
            }
            e.preventDefault();
            me.onInput(slider.values());
        };

        maxBox.keyDown = function(e){
            if(e.which === 13){
                me.maxVal(maxBox.text());
            }
            else if(e.which === 40){
                me.maxVal(Number(Math.round((Number(maxBox.text())-me.step) / me.step) * me.step));
            }
            else if(e.which === 38){
                me.maxVal(Number(Math.round((Number(maxBox.text())+me.step) / me.step) * me.step));
            }
            else{
                return;
            }
            e.preventDefault();
            me.onInput(slider.values());
        };

        this.onInput = params.onInput || function(){};

        slider.onInput = function(values){
            me.minVal(values[0]);
            me.maxVal(values[1]);
            me.onInput(values);
        };

        this.setWidth = function(w){
            me.width(w);
            var slideWidth = me.width()-minBox.width()-maxBox.width()-(5*me.workspace.objectSpacing);
            //minSlider.width(slideWidth);
            //maxSlider.width(slideWidth);
            slider.width(slideWidth);
        };
        this.addChild(minBox, slider, maxBox);
        slider.draw();
    }

    function SearchResults(params){
        var me = this;
        params = params || {};
        ComplexElement.call(this, params);
        var icr = 2;
        var bt = 2;
        this.maxHeight = params.maxHeight || me.workspace.height()-me.workspace.toolbarHeight-(2*me.workspace.objectSpacing);
        var rgb = me.workspace.color5('rgb');
        var htmlColor = "rgba("+rgb[0]+','+rgb[1]+','+rgb[2]+',.75)';
        this.style({
            backgroundColor: me.workspace.color5('html'),
            padding: 0+'px',
            borderRadius: icr+'px',
            overflow: 'hidden',
            'box-shadow': '0px 2px 4px '+htmlColor
        });
        var bh = 24;
        var bStyle = {
            width: me.width()-bt+'px',
            height: bh+'px',
            zIndex: 1,
            border: bt+'px solid '+me.workspace.color5('html'),
            fontSize: me.workspace.smallFont,
            borderRadius: icr+'px',
            margin: '0px'
        };
        var upButton = new TextButton({
            workspace: me.workspace,
            text: '&#9650;',
            style: bStyle
        });
        delete bStyle.top;
        bStyle.bottom = 0+'px';
        var downButton = new TextButton({
            workspace: me.workspace,
            text: '&#9660;',
            style: bStyle
        });
        this.addChild(upButton, downButton);
        this.results = [];
        var top = bh;
        this.setContentTop = function(t){
            top = t;
            for(var i = 0; i < me.results.length; i++){
                me.results[i].style({
                    top: top+'px'
                });
                top += me.results[i].height();
            }
        };
        this.index = -1;
        this.scrollResults = function(dist){
            var t = me.results[0].style('top');
            var b = me.results[me.results.length-1].style('top')+me.results[me.results.length-1].style('height');
            var thresh = bh;
            if(upButton.style('visibility') === "hidden"){
                thresh = bt;
            }
            var h = me.height()-thresh;
            if(t + dist <= thresh && b+dist >= h){
                for(var i = 0; i < me.results.length; i++){
                    me.results[i].style({
                        top: me.results[i].style('top')+dist+'px'
                    });
                }
                top = me.results[me.results.length-1].style('top')+me.results[me.results.length-1].style('height');
            }
            else if(t + dist >= thresh){
                me.setContentTop(thresh);
            }
            else{
                me.setContentTop(h-me.contentHeight()-bt);
            }

        };
        this.contentHeight = function(){
            var h = 0;
            for(var i = 0; i < me.results.length; i++){
                h += me.results[i].height();
            }
            return h;
        };
        function ScrollHandler(e){
            var e = window.event || e; // old IE support
	        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * me.workspace.scrollSensitivity;
            me.scrollResults(delta);
            return false;
        }
        this.addResult = function(params){
            params.workspace = me.workspace;
            params.style = {
                top: top+'px',
                backgroundColor: me.workspace.color2('html'),
                borderRadius: icr+'px',
                height: 40+'px',
                width: me.width()-(2*bt)+'px',
                borderLeft: bt+'px solid '+me.workspace.color5('html'),
                borderRight: bt+'px solid '+me.workspace.color5('html')
            };
            params.parent = me;
            var sr = new SearchResult(params);
            me.results.push(sr);
            me.addChild(sr);
            top += sr.height();
            if(top+bh+bt !== me.height()){
                var op = upButton.style('visibility');
                if(top+bh+bt > me.maxHeight){
                    if(op !== 'visible'){
                        upButton.style({
                            visibility: 'visible'
                        });
                        downButton.style({
                            visibility: 'visible'
                        });
                        if(me.results[0].style('top') < bh){
                            me.setContentTop(bh);
                        }
                        me.element.addEventListener('mousewheel', ScrollHandler, false);
                        me.element.addEventListener('DOMMouseScroll', ScrollHandler, false);
                    }
                    me.height(me.maxHeight);
                }
                else{
                    if(op !== 'hidden'){
                        upButton.style({
                            visibility: 'hidden'
                        });
                        downButton.style({
                            visibility: 'hidden'
                        });

                        me.element.removeEventListener('mousewheel', ScrollHandler);
                        me.element.removeEventListener('DOMMouseScroll', ScrollHandler);
                    }
                    me.setContentTop(bt);
                    me.height(top+(2*bt));
                }

            }
        };
        this.clear = function(){
            for(var i = 0; i < me.results.length; i++){
                me.results[i].blur();
                me.removeChild(me.results[i]);
            }
            top = bh;
            me.results.length = 0;
            me.index = -1;
        }
    }

    function SearchResult(params){
        var me = this;
        params = params || {};
        this.categoryIcon = params.categoryIcon;
        this.parent = params.parent;
        this.data = params.data;
        ComplexElement.call(this, params);
        var catIcon = new Picture({
            workspace: me.workspace,
            image: me.workspace.host+'icons/'+params.categoryIcon+'_72X72_'+me.workspace.color5('hex').slice(1)+'.png',
            style: {
                left: '0px',
                width: me.workspace.objectHeight+'px',
                height: me.workspace.objectHeight+'px'
            }
        });
        var label = new Label({
            workspace: me.workspace,
            text: params.label,
            style: {
                left: catIcon.left()+catIcon.width()+'px',
                width: me.width()-(2*me.workspace.objectHeight)+'px',
                height: me.height()+'px',
                top: 6+'px'
            }
        });
        var icon = new Picture({
            workspace: me.workspace,
            image: params.icon,
            style: {
                right: '0px',
                width: me.workspace.objectHeight+'px',
                height: me.workspace.objectHeight+'px'
            }
        });
        this.isVisible = function(){
            var aboveBottom = me.style('top')+me.height() <= me.parent.height()-me.workspace.objectHeight;
            var belowTop = me.style('top') >= 24;
            return belowTop && aboveBottom;
        };
        this.focus = function(){
            me.style({
                backgroundColor: me.workspace.color1('html')
            });
            catIcon.image(me.workspace.host+'icons/'+me.categoryIcon+'_72X72_'+me.workspace.color4('hex').slice(1)+'.png');
            label.style({
                color: me.workspace.color4('html')
            });
            me.parent.index = me.parent.results.indexOf(me);
            me.onFocus();
        };
        this.blur = function(){
            me.style({
                backgroundColor: me.workspace.color2('html')
            });
            catIcon.image(me.workspace.host+'icons/'+me.categoryIcon+'_72X72_'+me.workspace.color5('hex').slice(1)+'.png');
            label.style({
                color: me.workspace.color5('html')
            });
            me.onBlur();
        };
        this.onSelect = params.onSelect || function(){};
        this.onFocus = params.onFocus || function(){};
        this.onBlur = params.onBlur || function(){};

        attachMouseEvents(this, {
            mouseIn: {
                'before': function(){
                    me.focus();
                }
            },
            mouseOut: {
                before: function(){
                    me.blur();
                }
            },
            mouseDown: {
                before: function(){
                    me.style({
                        backgroundColor: me.workspace.color3('html')
                    });
                    catIcon.image(me.workspace.host+'icons/'+me.categoryIcon+'_72X72_'+me.workspace.color6('hex').slice(1)+'.png');
                    label.style({
                        color: me.workspace.color6('html')
                    });
                }
            },
            mouseUp: {
                before: function(){
                    me.focus();
                    me.onSelect();
                }
            }
        });

        this.addChild(catIcon, label, icon);

    }

    function GooeyWindow(params){
        var me = this;
        params = params || {};
        ComplexElement.call(this, params);

        var name = params.name || "Window";

        this.expanded = params.expanded || false;
        this.collapsedHeight = params.collapsedHeight || 40;
        this.expandedHeight = params.expandedHeight || 130;
        this.minWidth = params.minWidth || 225;
        this.undockedWidth = params.undockedWidth || 350;
        this.toolbar = params.toolbar;
        this.docked = params.docked || true;
        this.toolbarIndex = params.toolbarIndex || 0;

        this.grabAnchor = {x: 0, y: 0};
        this.nested = params.nested || false;

        var defaultStyle = {
            backgroundColor: params.style.backgroundColor || me.workspace.color5('html'),
            borderRadius: params.style.borderRadius || me.workspace.borderRadius+'px',
            overflow: 'visible'
        };

        if(me.nested){
            defaultStyle.backgroundColor = me.workspace.color3('html');
        }


        this.style(defaultStyle);
        me.height(me.collapsedHeight);
        me.width(me.minWidth);

        var p = this.style('padding');
        var b = this.style('borderWidth');
        var m = this.style('margin');
        var cr = 4;

        this.contents = new Toolbar({
            workspace: me.workspace,
            orientation: 'vertical',
            window: me,
            style: {
                top: me.collapsedHeight+'px',
                right: me.workspace.objectSpacing+'px',
                width: me.width()-(2*me.workspace.objectSpacing)-(2*p)+'px',
                height: me.expandedHeight-me.collapsedHeight-(2*me.workspace.space())+'px',
                borderRadius: me.style('borderRadius')+'px',
                padding: '0px'
                //backgroundColor: 'none'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });

        var handleButton = new WindowImageButton({
            workspace: me.workspace,
            image_base: 'icon_handle',
            window: me,
            style: {
                top: p+'px',
                left: p+'px',
                cursor: '-webkit-grab'
            }
        });
        //handleButton.leftMouseDown = function(e){
        //    handleButton.style({
        //        'cursor': '-webkit-grabbing'
        //    });
        //    me.grabAnchor = {x: e.offsetX + me.workspace.space(), y: e.offsetY + me.workspace.space()};
        //    me.workspace.held = me;
        //    me.beginMoving();
        //};
        //handleButton.leftMouseUp = function(){
        //    handleButton.style({
        //        'cursor': '-webkit-grab'
        //    });
        //    if(me.workspace.held === me){
        //        me.workspace.held = null;
        //    }
        //    me.endMoving();
        //};
        //handleButton.mouseIn = function(){
        //    handleButton.style({
        //        'cursor': '-webkit-grab'
        //    });
        //};

        var nameButton = new WindowTextButton({
            workspace: me.workspace,
            text: '&#9658; '+name,
            window: me,
            style: {
                width: me.width() - (2*(handleButton.width())) - (4*me.workspace.space()) + 'px',
                left: (2*me.workspace.space()) + handleButton.width()+'px',
                top: m+'px',
                textAlign: 'left'
            }
        });
        nameButton.leftClick = function(){
            if(me.expanded){
                me.collapse();
            }
            else{
                me.expand();
            }
        };

        var iconButton;
        if(typeof params.icon !== 'undefined'){
            iconButton = new WindowImageButton({
                workspace: me.workspace,
                image_base: params.icon,
                window: me,
                style: {
                    top: p+'px',
                    right: p+'px'
                }
            });
            iconButton.leftClick = function(){
                if(!me.docked){
                    var dest = me.toolbar.children[me.toolbarIndex];
                    var pos = dest.absolutePosition();
                    me.animate({
                        top: pos.top+'px',
                        left: pos.left+'px'
                    },me.workspace.tween, function(){
                        me.toolbar.dock(me, me.toolbarIndex);
                    });

                }
            };
        }


        var bVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'horizontal',
            style: {
                margin: 0+'px',
                bottom: -cr+'px',
                left: me.style('left')+cr+'px',
                width: me.style('width')-(2*cr)+'px',
                height: (2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //bVoid.dragIn = function(){
        //    if(me.docked && me.workspace.held && me.workspace.held.constructor.name === "GooeyWindow"){
        //        me.toolbar.scoot(me.workspace.held.height()+me.workspace.padding, me.toolbarIndex+1);
        //        var nh = me.workspace.held.height()+2*me.workspace.space()+2*cr;
        //        bVoid.style({
        //            height: nh+'px',
        //            bottom: -(nh-cr)+'px'
        //        });
        //    }
        //};
        //bVoid.dragOut = function(){
        //    if(me.docked && me.workspace.held && me.workspace.held.constructor.name === "GooeyWindow"){
        //        me.toolbar.scoot(-(me.workspace.held.height()+me.workspace.padding), me.toolbarIndex+1);
        //        bVoid.style({
        //            height: me.workspace.space()+5+'px',
        //            bottom: -cr+'px'
        //        });
        //    }
        //};
        bVoid.leftMouseUp = function(){
            if(me.docked && me.workspace.held && me.workspace.held.constructor.name === "GooeyWindow"){
                me.toolbar.scoot(-(me.workspace.held.height()+me.workspace.padding), me.toolbarIndex+1);
                me.toolbar.dock(me.workspace.held, me.toolbarIndex+1);
                me.workspace.held.endMoving();
                me.workspace.held = null;
                bVoid.style({
                    border: 'none'
                });
            }
            bVoid.style({
                height: me.workspace.space()+5+'px'
            });
            if(me.workspace.held === bVoid){
                me.endResizeFromBottom();
                me.workspace.held = null;
            }
        };
        bVoid.leftMouseDown = function(e){
            bVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
            me.workspace.held = bVoid;
            me.resizeFromBottom();
        };

        var lVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'vertical',
            style: {
                margin: 0+'px',
                top: cr +'px',
                left: -cr+'px',
                width: (2*cr)+'px',
                height: me.style('height')-(2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //lVoid.leftMouseUp = function(){
        //    if(me.workspace.held === lVoid){
        //        me.endResizeFromLeft();
        //        me.workspace.held = null;
        //    }
        //};
        //lVoid.leftMouseDown = function(e){
        //    lVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = lVoid;
        //    me.resizeFromLeft();
        //};

        var rVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'vertical',
            style: {
                margin: 0+'px',
                top: cr+'px',
                right: -cr+'px',
                width: (2*cr)+'px',
                height: me.style('height')-(2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //rVoid.leftMouseUp = function(){
        //    if(me.workspace.held === rVoid){
        //        me.endResizeFromRight();
        //        me.workspace.held = null;
        //    }
        //};
        //rVoid.leftMouseDown = function(e){
        //    rVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = rVoid;
        //    me.resizeFromRight();
        //};

        var tVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'horizontal',
            style: {
                margin: 0+'px',
                top: -cr+'px',
                left: me.style('left')+cr+'px',
                width: me.style('width')-(2*cr)+'px',
                height: cr*2+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //tVoid.leftMouseUp = function(){
        //    if(me.workspace.held === tVoid){
        //        me.endResizeFromTop();
        //        me.workspace.held = null;
        //    }
        //};
        //tVoid.leftMouseDown = function(e){
        //    tVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = tVoid;
        //    me.resizeFromTop();
        //};

        var blVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'swcorner',
            style:{
                margin: 0+'px',
                bottom: -cr+'px',
                left: -cr+'px',
                width: (2*cr)+'px',
                height: (2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //blVoid.leftMouseUp = function(){
        //    if(me.workspace.held === blVoid){
        //        me.endResizeFromBL();
        //        me.workspace.held = null;
        //    }
        //};
        //blVoid.leftMouseDown = function(e){
        //    blVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = blVoid;
        //    me.resizeFromBL();
        //};

        var brVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'secorner',
            style:{
                margin: 0+'px',
                bottom: -cr+'px',
                right: -cr+'px',
                width: (2*cr)+'px',
                height: (2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //brVoid.leftMouseUp = function(){
        //    if(me.workspace.held === brVoid){
        //        me.endResizeFromBR();
        //        me.workspace.held = null;
        //    }
        //};
        //brVoid.leftMouseDown = function(e){
        //    brVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = brVoid;
        //    me.resizeFromBR();
        //};

        var trVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'necorner',
            style:{
                margin: 0+'px',
                top: -cr+'px',
                right: -cr+'px',
                width: (2*cr)+'px',
                height: (2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //trVoid.leftMouseUp = function(){
        //    if(me.workspace.held === trVoid){
        //        me.endResizeFromTR();
        //        me.workspace.held = null;
        //    }
        //};
        //trVoid.leftMouseDown = function(e){
        //    trVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = trVoid;
        //    me.resizeFromTR();
        //};

        var tlVoid = new DockVoid({
            workspace: me.workspace,
            toolbar: me.toolbar,
            toolbarIndex: me.toolbarIndex,
            orientation: 'nwcorner',
            style:{
                margin: 0+'px',
                top: -cr+'px',
                left: -cr+'px',
                width: (2*cr)+'px',
                height: (2*cr)+'px'
                //border: 'thin solid '+me.workspace.color6('html')
            }
        });
        //tlVoid.leftMouseUp = function(){
        //    if(me.workspace.held === tlVoid){
        //        me.endResizeFromTL();
        //        me.workspace.held = null;
        //    }
        //};
        //tlVoid.leftMouseDown = function(e){
        //    tlVoid.grabAnchor = {x: e.offsetX, y: e.offsetY};
        //    me.workspace.held = tlVoid;
        //    me.resizeFromTL();
        //};


        this.addChild(handleButton, nameButton);
        if(typeof iconButton !== "undefined"){
            this.addChild(iconButton);
        }

        this.voids = function(){
            me.removeChild(tVoid, bVoid, lVoid, rVoid, tlVoid, trVoid, blVoid, brVoid);
            for(var i = 0; i < arguments.length; i++){
                if(arguments[i] === "t" || arguments[i] === "top"){
                    me.addChild(tVoid);
                }
                else if(arguments[i] === "b" || arguments[i] === "bottom"){
                    me.addChild(bVoid);
                }
                else if(arguments[i] === "l" || arguments[i] === "left"){
                    me.addChild(lVoid);
                }
                else if(arguments[i] === "r" || arguments[i] === "right"){
                    me.addChild(rVoid);
                }
                else if(arguments[i] === "bl" || arguments[i] === "bottom-left"){
                    me.addChild(blVoid);
                }
                else if(arguments[i] === "br" || arguments[i] === "bottom-right"){
                    me.addChild(brVoid);
                }
                else if(arguments[i] === "tl" || arguments[i] === "top-left"){
                    me.addChild(tlVoid);
                }
                else if(arguments[i] === "tr" || arguments[i] === "top-right"){
                    me.addChild(trVoid);
                }
            }
        };

        this.name = function(n){
            if(typeof n === "undefined"){
                return name;
            }
            name = n;
        };

        this.width = function(w){
            if(typeof w === "undefined"){
                if(this.style('width') === 0){
                    return this.element.clientWidth+(2*m);
                }
                return this.style('width')+(2*m);
            }
            var rw = w-(2*m);
            if(rw < me.minWidth){
                rw = me.minWidth;
            }
            var diff = w - me.width();
            this.style({
                width: rw +'px'
            });
            this.contents.setWidth(me.width()-(2*me.workspace.objectSpacing)-(2*p));
            nameButton.width(me.width() - (2*(handleButton.width())) - (4*me.workspace.space()));
            bVoid.style({
                width: me.style('width')-(2*cr)+'px'
            });
            tVoid.style({
                width: me.style('width')-(2*cr)+'px'
            });
            if(me.docked && typeof me.toolbar !== "undefined" && me.toolbar.orientation === "horizontal"){
                me.toolbar.scoot(diff, me.toolbarIndex+1);
            }
        };

        this.height = function(h, animate){
            if(typeof h === "undefined"){
                if(this.style('height') === 0){
                    return this.element.clientHeight+(2*m);
                }
                return this.style('height')+(2*m);
            }
            if(h < me.collapsedHeight){
                h = me.collapsedHeight;
            }
            var diff = h - me.height();
            var meStyle = {
                height: h-(2*m)+'px'
                };
            var vStyle = {
                height: pxToNum(meStyle['height'])-(2*cr)+'px'
                };
            var cStyle = {
                height: me.expandedHeight-me.collapsedHeight-(2*me.workspace.space())+'px'
            };
            if(animate){
                me.animate(meStyle);
                lVoid.animate(vStyle);
                rVoid.animate(vStyle);
            }
            else{
                this.style(meStyle);
                lVoid.style(vStyle);
                rVoid.style(vStyle);
            }
            me.contents.setHeight(me.expandedHeight-me.collapsedHeight-(2*me.workspace.space()));
            if(me.docked && typeof me.toolbar !== "undefined" && me.toolbar.orientation === "vertical"){
                me.toolbar.scoot(diff, me.toolbarIndex+1);
            }
            if(pxToNum(meStyle['height']) > me.collapsedHeight*1.5){
                me.expanded = true;
                me.expandedHeight = h;
                nameButton.text('&#9660; '+name);
                if(me.children.indexOf(me.contents) === -1){
                    me.addChild(me.contents);
                }
            }
            else{
                me.expanded = false;
                nameButton.text('&#9658; '+name);
                if(me.children.indexOf(me.contents) > -1){
                    me.removeChild(me.contents);
                }
            }

        };

        this.expand = function(){
            me.expanded = true;
            me.height(me.expandedHeight, !me.docked);
            nameButton.text('&#9660; '+name);
            if(me.children.indexOf(me.contents) === -1){
                me.addChild(me.contents);
            }
        };

        this.collapse = function(){
            nameButton.text('&#9658; '+name);
            me.expanded = false;
            me.height(me.collapsedHeight, !me.docked);
            if(me.children.indexOf(me.contents) > -1){
                me.removeChild(me.contents);
            }
        };

        var mmFunc = function(){
            me.style({
                top: me.workspace.pointer.y - me.grabAnchor.y + 'px',
                left: me.workspace.pointer.x - me.grabAnchor.x + 'px'
            });
        };

        this.beginMoving = function(event){
            me.workspace.addMouseMoveFunction(mmFunc);
            mmFunc();
            if(me.docked){
                me.toolbar.undock(me);
                me.voids('t', 'b', 'l', 'r', 'br', 'bl', 'tr', 'tl');
            }
        };

        this.endMoving = function(){
            me.workspace.removeMouseMoveFunction(mmFunc);
        };

        this.unhold = function(){
            if(me.nested){
                handleButton.toggleOff();
                if(typeof iconButton !== "undefined"){
                    iconButton.toggleOff();
                }
            }
            else{
                handleButton.toggleOn();
                if(typeof iconButton !== "undefined"){
                    iconButton.toggleOn();
                }
            }

            handleButton.style({
                'cursor': '-webkit-grab'
            });
            bVoid.style({
                border: 'none'
            });
            //if(me.docked){
            //    me.removeChild(rVoid, tVoid, brVoid, trVoid, tlVoid);
            //}
        };

        var brs = function(){
            var ga = me.workspace.held.grabAnchor;
            var nh = me.workspace.pointer.y-me.absolutePosition().top+ ga.y-cr;
            if(me.docked && me.toolbar.orientation === "horizontal" && me.toolbar.topStuck){
                me.toolbar.setHeight(nh+(2*me.workspace.space()));
            }
            else{
                me.height(nh);
            }
        };

        this.resizeFromBottom = function(){
            me.workspace.addMouseMoveFunction(brs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromBottom();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromBottom = function(){
            me.workspace.removeMouseMoveFunction(brs);
            me.unhold();
        };

        var lrs = function(){
            var ga = me.workspace.held.grabAnchor;
            var nw = me.absolutePosition().left+me.width() - me.workspace.pointer.x + ga.x-cr;
            var diff = nw - me.width();
            if(me.docked && me.toolbar.orientation === "vertical" && me.toolbar.rightStuck){
                me.toolbar.setWidth(nw+(2*me.workspace.space()));
            }
            else{
                var nl = me.style('left') - diff;
                me.width(nw);
                if(me.width() === nw){
                    me.style({
                        left: nl + 'px'
                    });
                }
            }
        };

        this.resizeFromLeft = function(){
            me.workspace.addMouseMoveFunction(lrs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromLeft();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromLeft = function(){
            me.workspace.removeMouseMoveFunction(lrs);
            me.unhold();
        };

        var rrs = function(){
            var ga = me.workspace.held.grabAnchor;
            var nw = me.workspace.pointer.x - me.absolutePosition().left + ga.x - cr;
            if(me.docked && me.toolbar.orientation === "vertical" && me.toolbar.leftStuck){
                me.toolbar.setWidth(nw+(2*me.workspace.space()));
            }
            else{
                me.width(nw);
            }

        };

        this.resizeFromRight = function(){
            me.workspace.addMouseMoveFunction(rrs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromRight();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromRight = function(){
            me.workspace.removeMouseMoveFunction(rrs);
            me.unhold();
        };

        var trs = function(){
            var ga = me.workspace.held.grabAnchor;
            var nh = (me.absolutePosition().top+me.height()) - me.workspace.pointer.y + ga.y - cr;
            var diff = nh - me.height();
            if(me.docked && me.toolbar.orientation === "horizontal" && me.toolbar.bottomStuck){
                me.toolbar.setHeight(nh+(2*me.workspace.space()));
            }
            else{
                me.height(nh);
                me.style({
                    top: me.style('top') - diff + 'px'
                });
            }


        };

        this.resizeFromTop = function(){
            me.workspace.addMouseMoveFunction(trs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromTop();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromTop = function(){
            me.workspace.removeMouseMoveFunction(trs);
            me.unhold();
        };

        this.resizeFromBL = function(){
            me.workspace.addMouseMoveFunction(lrs, brs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromBL();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromBL = function(){
            me.workspace.removeMouseMoveFunction(lrs, brs);
            me.unhold();
        };

        this.resizeFromBR = function(){
            me.workspace.addMouseMoveFunction(rrs, brs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromBR();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromBR = function(){
            me.workspace.removeMouseMoveFunction(rrs, brs);
            me.unhold();
        };

        this.resizeFromTR = function(){
            me.workspace.addMouseMoveFunction(trs, rrs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromTR();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromTR = function(){
            me.workspace.removeMouseMoveFunction(rrs, trs);
            me.unhold();
        };

        this.resizeFromTL = function(){
            me.workspace.addMouseMoveFunction(lrs, trs);
            me.workspace.leftMouseUp = function(){
                me.endResizeFromTL();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endResizeFromTL = function(){
            me.workspace.removeMouseMoveFunction(lrs, trs);
            me.unhold();
        };

        attachMouseEvents(this, {
            leftMouseUp: {
                before: function(){
                    if(me.workspace.held === bVoid){
                        me.endResizeFromBottom();
                    }
                }
            }
        })
    }

    function ScrollBar(params){
        var me = this;
        params = params || {};
        ComplexElement.call(this, params);
        this.orientation = params.orientation || "vertical";
        this.toolbar = params.toolbar;
        var active = false;
        var incr = 5;
        var icr = 2;
        this.active = function(tf){
            if(typeof tf === "undefined"){
                return active;
            }
            active = tf;

        };
        var base_style = {};
        var slide_def;
        if(me.toolbar.window){
            base_style = {
                backgroundColor: me.workspace.color2('html')
            };
            slide_def = {
                backgroundColor: me.workspace.color3('html'),
                color: me.workspace.color4('html')
            };
        }
        else{
            base_style = {
                backgroundColor: me.workspace.color4('html')
            };
            slide_def = {
                backgroundColor: me.workspace.color2('html'),
                color: me.workspace.color3('html')
            };
        }
        base_style.borderRadius = me.workspace.borderRadius+'px';
        this.style(base_style);
        var plusButton, minusButton, slider;
        var availSize = function(){
            if(me.orientation === "vertical"){
                return me.style('height') - plusButton.height() - minusButton.height() - (2*me.workspace.space());
            }
            else if(me.orientation === "horizontal"){
                return me.style('width') - plusButton.width() - minusButton.width() - (2*me.workspace.space());
            }
        };
        if(me.orientation === "horizontal"){
            me.width(me.toolbar.style('width') - (me.style('left') || 0) - (me.style('right') || 0) -me.toolbar.style('padding'));
            me.height(40);
            plusButton = new TextButton({
                workspace: me.workspace,
                text: '&#9658;',
                style: {
                    top: me.style('padding')+'px',
                    right: me.style('padding')+'px',
                    borderRadius: icr+'px'
                },
                leftClick: function(){
                    me.toolbar.scoot(incr);
                    var ratio = incr / me.toolbar.childrenWidth();
                    var slideIncr = ratio * availSize();
                    var left = minusButton.width() + me.workspace.space();
                    if(slider.style('left') - slideIncr < left){
                        slideIncr = slider.style('left') - left;
                    }
                    slider.style({
                        left: slider.style('left') - slideIncr + 'px'
                    });
                }
            });
            minusButton = new TextButton({
                workspace: me.workspace,
                text: '&#9668;',
                style: {
                    top: me.style('padding')+'px',
                    left: me.style('padding')+'px',
                    borderRadius: icr+'px'
                },
                leftClick: function(){
                    me.toolbar.scoot(-incr);
                    var ratio = incr / me.toolbar.childrenWidth();
                    var slideIncr = ratio * availSize();
                    var right = me.style('width') - (plusButton.width() + me.workspace.space());
                    if(slider.style('left') + slider.width() + slideIncr > right){
                        slideIncr = right - (slider.style('left') + slider.width());
                    }
                    slider.style({
                        left: slider.style('left') + slideIncr + 'px'
                    });
                }
            });
            slider = new ImageButton({
                workspace: me.workspace,
                image_base: 'icon_handle',
                centerImage: true,
                style: {
                    width: 120+'px',
                    left: minusButton.style('left')+minusButton.width()+me.workspace.space()+'px',
                    borderRadius: icr+'px',
                    cursor: '-webkit-grab'
                },
                defaultStyle: slide_def,
                leftMouseDown: function(e){
                    slider.grabAnchor = {x: e.offsetX, y: e.offsetY};
                    me.beginSliding();
                }

            });

        }
        else if(me.orientation === "vertical"){
            me.width(40);
            me.height(me.toolbar.style('height') - (me.style('top') || 0) - (me.style('bottom') || 0) - me.toolbar.style('padding'));
            plusButton = new TextButton({
                workspace: me.workspace,
                text: '&#9650;',
                style: {
                    top: me.style('padding')+'px',
                    left: me.style('padding')+'px',
                    borderRadius: icr+'px'
                },
                leftClick: function(){
                    me.toolbar.scoot(incr);
                    var ratio = incr / me.toolbar.childrenHeight();
                    var slideIncr = ratio * availSize();
                    var top = plusButton.height() + me.workspace.space();
                    if(slider.style('top') - slideIncr < top){
                        slideIncr = slider.style('top') - top;
                    }
                    slider.style({
                        top: slider.style('top') - slideIncr + 'px'
                    });
                }
            });
            minusButton = new TextButton({
                workspace: me.workspace,
                text: '&#9660;',
                style: {
                    bottom: me.style('padding')+'px',
                    left: me.style('padding')+'px',
                    borderRadius: icr+'px'
                },
                leftClick: function(){
                    me.toolbar.scoot(-incr);
                    var ratio = incr / me.toolbar.childrenHeight();
                    var slideIncr = ratio * availSize();
                    var bottom = me.style('height') - (plusButton.height() + me.workspace.space());
                    if(slider.style('top') + slider.height() + slideIncr > bottom){
                        slideIncr = bottom - (slider.style('top') + slider.height());
                    }
                    slider.style({
                        top: slider.style('top') + slideIncr + 'px'
                    });
                }
            });
            slider = new ImageButton({
                workspace: me.workspace,
                image_base: 'icon_handle',
                centerImage: true,
                style: {
                    height: 120+'px',
                    top: plusButton.height()+me.workspace.space()+'px',
                    borderRadius: icr+'px',
                    cursor: '-webkit-grab'
                },
                defaultStyle: slide_def,
                leftMouseDown: function(e){
                    slider.grabAnchor = {x: e.offsetX, y: e.offsetY};
                    me.beginSliding();
                }
            });
        }
        if(me.toolbar.window){
            slider.image(slider.image4);
        }
        else{
            slider.image(slider.image3);
        }
        slider.grabAnchor = {x: 0, y: 0};
        this.addChild(plusButton, minusButton, slider);
        attachMouseEvents(plusButton, {
            mouseIn: {
                before: function(e){
                    if(me.toolbar.window){
                        plusButton.style({
                            backgroundColor: me.workspace.color2('html'),
                            color: me.workspace.color4('html')
                        });
                    }
                    else{
                        plusButton.style({
                            backgroundColor: me.workspace.color5('html'),
                            color: me.workspace.color2('html')
                        });
                    }
                }
            },
            mouseOut: {
                before: function(e){
                    plusButton.style(plusButton.defaultStyle());
                }
            },
            leftMouseDown: {
                before: function(e){
                    if(me.toolbar.window){
                        plusButton.style({
                            backgroundColor: me.workspace.color5('html'),
                            color: me.workspace.color3('html')
                        });
                    }
                    else{
                        plusButton.style({
                            backgroundColor: me.workspace.color1('html'),
                            color: me.workspace.color3('html')
                        });
                    }
                }
            },
            leftMouseUp: {
                before: function(e){
                    if(me.toolbar.window){
                        plusButton.style({
                            backgroundColor: me.workspace.color2('html'),
                            color: me.workspace.color4('html')
                        });
                    }
                    else{
                        plusButton.style({
                            backgroundColor: me.workspace.color5('html'),
                            color: me.workspace.color2('html')
                        });
                    }
                }
            }
        });
        attachMouseEvents(minusButton, {
            mouseIn: {
                before: function(e){
                    if(me.toolbar.window){
                        minusButton.style({
                            backgroundColor: me.workspace.color2('html'),
                            color: me.workspace.color4('html')
                        });
                    }
                    else{
                        minusButton.style({
                            backgroundColor: me.workspace.color5('html'),
                            color: me.workspace.color2('html')
                        });
                    }
                }
            },
            mouseOut: {
                before: function(e){
                    minusButton.style(minusButton.defaultStyle());
                }
            },
            leftMouseDown: {
                before: function(e){
                    if(me.toolbar.window){
                        minusButton.style({
                            backgroundColor: me.workspace.color5('html'),
                            color: me.workspace.color3('html')
                        });
                    }
                    else{
                        minusButton.style({
                            backgroundColor: me.workspace.color1('html'),
                            color: me.workspace.color3('html')
                        });
                    }
                }
            },
            leftMouseUp: {
                before: function(e){
                    if(me.toolbar.window){
                        minusButton.style({
                            backgroundColor: me.workspace.color2('html'),
                            color: me.workspace.color4('html')
                        });
                    }
                    else{
                        minusButton.style({
                            backgroundColor: me.workspace.color5('html'),
                            color: me.workspace.color2('html')
                        });
                    }
                }
            }
        });
        attachMouseEvents(slider, {
            mouseOut: {
                before: function(e){
                    slider.style({
                        cursor: '-webkit-grab'
                    });
                }
            },
            leftMouseDown: {
                before: function(e){
                    slider.style({
                        cursor: '-webkit-grabbing'
                    });
                }
            },
            leftMouseUp: {
                before: function(e){
                    slider.style({
                        cursor: '-webkit-grab'
                    });
                }
            }
        });


        this.setSlideSize = function(){
            if(me.orientation === "vertical"){
                var ratio = me.toolbar.style('height') / me.toolbar.childrenHeight();
                var top = me.workspace.space() + minusButton.height();
                var bottom = me.height()-top - me.workspace.space();
                slider.height(ratio * availSize());
                var exposed_bottom = slider.height() + slider.style('top') > bottom;
                var over_content = me.toolbar.childrenHeight() > me.toolbar.style('height');
                if(exposed_bottom && over_content){
                    slider.style({
                        top: bottom - slider.height() + 'px'
                    });
                }
            }
            else if(me.orientation === "horizontal"){
                var ratio = me.toolbar.style('width') / me.toolbar.childrenWidth();
                slider.width(ratio * availSize());
            }
            slider.centerImage();

        };

        var slide_func = function(){
            var slide_ratio;
            var avail_slide;
            if(me.orientation === "vertical"){
                avail_slide = (me.style('height') - plusButton.height() - minusButton.height() - (2*me.workspace.space()));
                var top = me.workspace.space() + minusButton.height();
                var bottom = me.style('height')-top;
                var nt = me.workspace.pointer.y - me.absolutePosition().top - top - slider.grabAnchor.y;
                if(nt < top){
                    nt = top;
                }
                else if(nt+slider.height() > bottom){
                    nt = bottom - slider.height();
                }
                slide_ratio = (nt-top)/avail_slide;
                var slideDist = -(slide_ratio * me.toolbar.childrenHeight())-me.toolbar.children[0].style('top');
                me.toolbar.scoot(slideDist);
                slider.style({
                    top: nt+'px'
                });
            }
            else if(me.orientation === "horizontal"){
                avail_slide = (me.style('width') - plusButton.width() - minusButton.width() - (2*me.workspace.space()));
                var left = me.workspace.space() + minusButton.width();
                var right = me.style('width')-left;
                var nl = me.workspace.pointer.x - left - slider.grabAnchor.x;
                if(nl < left){
                    nl = left;
                }
                else if(nl+slider.width() > right){
                    nl = right - slider.width();
                }
                slide_ratio = (nl-left)/avail_slide;
                var slideDist = -(slide_ratio * me.toolbar.childrenWidth())-me.toolbar.children[0].style('left');
                me.toolbar.scoot(slideDist);
                slider.style({
                    left: nl+'px'
                });
            }

        };

        this.beginSliding = function(){
            me.workspace.addMouseMoveFunction(slide_func);
            me.workspace.leftMouseUp = function(){
                me.endSliding();
                me.workspace.leftMouseUp = null;
            }
        };

        this.endSliding = function(){
            me.workspace.removeMouseMoveFunction(slide_func);
            slider.grabAnchor = {x: 0, y: 0};
        };
    }

    var addScript = function(url, callback){
        var script = document.createElement('script');
        var head = document.head || document.getElementsByTagName('head')[0];
        script.type = 'text/javascript';
        script.onload = function(){
            callback(script);
        };
        script.src = url;
        head.insertBefore(script, document.getElementById('gooey'));
    };

    function AssetPreloader(params){
        var me = this;
        this.workspace = params.workspace;
        this.onComplete = params.onComplete || function(){};
        this.onEachImageLoaded = params.onEachImageLoaded || function(img){};
        this.onEachScriptLoaded = params.onEachScriptLoaded || function(s){};
        params.bases = params.bases || [];
        params.magic = params.magic || [];
        params.objects = params.objects || [];
        params.images = params.images || [];
        var bases = ['icon_handle', 'icon_scrollArrow'].concat(params.bases);
        for(var i = 0; i < bases.length; i++){
            params.magic.push({
                base: bases[i],
                width: gui.buttonWidth,
                height: gui.objectHeight
            });
        }
        var wholeList = [];
        var imgs_loaded = 0;
        for(var i = 0; i < params.objects.length; i++){
            if(params.objects[i].hasOwnProperty('image1')){
                wholeList.push(params.objects[i].image1);
            }
            if(params.objects[i].hasOwnProperty('image2')){
                wholeList.push(params.objects[i].image2);
            }
            if(params.objects[i].hasOwnProperty('image3')){
                wholeList.push(params.objects[i].image3);
            }
            if(params.objects[i].hasOwnProperty('image4')){
                wholeList.push(params.objects[i].image4);
            }
            if(params.objects[i].hasOwnProperty('image5')){
                wholeList.push(params.objects[i].image5);
            }
            if(params.objects[i].hasOwnProperty('image6')){
                wholeList.push(params.objects[i].image6);
            }
        }
        for(var i = 0; i < params.magic.length; i++){
            var image_base = params.magic[i].base + "_"+(2*params.magic[i].width)+"X"+(2*params.magic[i].height)+"_";
            var image1 = this.workspace.host+'icons/'+image_base+this.workspace.color1('hex').slice(1)+".png";
            var image2 = this.workspace.host+'icons/'+image_base+this.workspace.color2('hex').slice(1)+".png";
            var image3 = this.workspace.host+'icons/'+image_base+this.workspace.color3('hex').slice(1)+".png";
            var image4 = this.workspace.host+'icons/'+image_base+this.workspace.color4('hex').slice(1)+".png";
            var image5 = this.workspace.host+'icons/'+image_base+this.workspace.color5('hex').slice(1)+".png";
            var image6 = this.workspace.host+'icons/'+image_base+this.workspace.color6('hex').slice(1)+".png";
            var image7 = this.workspace.host+'icons/'+image_base+this.workspace.color7('hex').slice(1)+".png";
            wholeList.push(image1, image2, image3, image4, image5, image6, image7);
        }
        wholeList.concat(params.images);
        var scripts = [];
        if(params.hasOwnProperty('scripts')){
            for(var i = 0; i < params.scripts.length; i++){
                if(typeof params.scripts[i] === "string"){
                    scripts.push(params.scripts[i]);
                }
                else if(Array.isArray(params.scripts[i])){
                    scripts = scripts.concat(params.scripts[i]);
                }
            }
        }
        var scripts_loaded = 0;

        this.load = function(){
            var imgs = [];
            for(var i = 0; i < wholeList.length; i++){
                var img = new Image();
                img.onload = function(){
                    imgs_loaded++;
                    me.onEachImageLoaded(this);
                    if(imgs_loaded === wholeList.length){
                        if(scripts.length > 0){
                            function consume(){
                                addScript(scripts[scripts_loaded], function(s){
                                    scripts_loaded++;
                                    me.onEachScriptLoaded(s);
                                    if(scripts_loaded === scripts.length){
                                        me.onComplete();
                                    }
                                    else{
                                        consume()
                                    }
                                })
                            }
                            consume();

                        }
                        else{
                            me.onComplete();
                        }
                    }
                };
                img.src = wholeList[i];
                imgs.push(img);
            }
        }
    }

    function Node(params){
        var me = this;
        this.workspace = params.workspace;
        this.netViz = params.netViz;
        GooeyObject.call(this, params);
        this.extends(MouseInteractions(params));
        var _info = params;
        var activeRadius = _info.radius;
        var base, baseHit, cf;
        var just_moved = false;
        var nodeGfx = new PIXI.Container();
        this.selected = false;
        this.heat = 1;

        this.outLinks = [];

        this.inLinks = [];

        this.nodeType = function(){
            return _info.type;
        };

        this.color = function(ctype){
            ctype = ctype || "rgb";
            if(_info.color === "dynamic"){
                return me.workspace.dataColorMedium(me.netViz.nodeType(_info.type).dynColor, ctype);
            }
            else if(_info.color === "static"){
                return false
            }
            else{
                if(ctype === "rgb"){
                    return _info.color;
                }
                else if(ctype === "hex"){
                    return Gooey.rgbToHex(_info.color);
                }
                else if(ctype === "html"){
                    return Gooey.rgbToHTML(_info.color);
                }
                else if(ctype === "number"){
                    return Gooey.rgbToNumber(_info.color);
                }
            }
        };

        this.position = function(){
            return _info.position;
        };

        this.x = function(){
            return _info.position.x;
        };

        this.y = function(){
            return _info.position.y;
        };

        this.id = function(){
            return _info.id;
        };

        this.radius = function(){
            return _info.radius;
        };

        this.label = function(){
            return _info.label;
        };

        this.calcShape = function(){
            if(_info.shape !== 1 && _info.shape !== 0){
                var myPoints = [];
                for(var i = 0; i < _info.shape; i++)
                {
                    var x = activeRadius * Math.cos(2*Math.PI*i/_info.shape-Math.PI/2);
                    var y = activeRadius * Math.sin(2*Math.PI*i/_info.shape-Math.PI/2);
                    myPoints.push(x,y);
                }
                if(typeof base === 'undefined')
                {
                    base = new PIXI.Graphics();
                    nodeGfx.addChild(base);
                }
                else
                {
                    base.clear();
                }
                base.beginFill(me.color('number'), me.heat);
                if(me.selected)
                {
                    base.lineStyle(4, me.workspace.color5('number'), 1);
                }
                base.drawPolygon(myPoints);
                base.endFill();
                baseHit = new PIXI.Polygon(myPoints);
                base.hitArea = baseHit;
                base.position = new PIXI.Point(_info.position.x, _info.position.y);
            }
            else if(me.shape === 0){
                if(typeof base === 'undefined'){
                    base = new PIXI.Graphics();
                    nodeGfx.addChild(base);
                }
                else{
                    base.clear();
                }
                base.beginFill(me.color('number'), me.heat);
                if(me.selected){
                    base.lineStyle(4, me.workspace.color5('number'), 1);
                }
                base.drawCircle(0,0, _info.radius);
                base.endFill();
                baseHit = new PIXI.Circle(0, 0, activeRadius);
                base.position = new PIXI.Point(_info.position.x, _info.position.y);
            }
            else{
                if(typeof base === 'undefined')
                {
                    cf = new PIXI.filters.ColorMatrixFilter();
                    base = new PIXI.Sprite.fromImage(_info.image);
                    nodeGfx.addChild(base);

                }
                else
                {
                    base.texture = new PIXI.Texture.fromImage(_info.image);
                }

                if(me.color())
                {
                    var rgb = me.color('rgb');
                    var r = [rgb.r/255,0,0,0,0];
                    var g = [0,rgb.g/255,0,0,0];
                    var b = [0,0,rgb.b/255,0,0];
                    var a = [0,0,0,1,0];
                    cf.matrix = r.concat(g).concat(b).concat(a);
                    base.filters = [cf];
                }
                else
                {
                    base.filters = null;
                }
                base.width = 2*activeRadius;
                base.height = 2*activeRadius;
                base.anchor = new PIXI.Point(.5,.5);
                base.position = new PIXI.Point(_info.position.x, _info.position.y);
                base.alpha = me.heat;
            }


        };

        nodeGfx.interactive = true;
        nodeGfx.buttonMode = true;

        this.simpleShape = function(){
            if(typeof base === 'undefined'){
                base = new PIXI.Graphics();
                nodeGfx.addChild(base);
            }
            else{
                base.clear();
            }
            base.beginFill(me.color('number'), me.heat);
            base.drawCircle(0,0, activeRadius);
            base.endFill();
            baseHit = new PIXI.Circle(0, 0, activeRadius);
            base.position = new PIXI.Point(_info.position.x, _info.position.y);
        };

        var label_max_width = 350;
        //var label_real_width = label.width;
        var labelStyle = function(){
            return {
                font: me.workspace.mediumFont+" "+me.workspace.style('fontFamily'),
                fill: me.workspace.color5('number'),
                wordWrap: true,
                wordWrapWidth: label_max_width/(me.radius()/activeRadius),
                align: 'left'
            };
        };

        var label = new PIXI.Text(me.label(), labelStyle());
        var labelSplash = new PIXI.Graphics();
        var labelRule = new PIXI.Graphics();
        var labelGrp = new PIXI.Container();
        labelGrp.addChild(labelSplash);
        labelGrp.addChild(labelRule);
        labelGrp.addChild(label);

        this.drawLabel = function(){
            label.text = me.label();
            label.style = labelStyle();
            var rs = me.netViz.nodeLayer().scale.x;
            if(rs > 1){
                label.scale = {x: 1/rs, y: 1/rs};
            }
            label.position = new PIXI.Point(me.x()+activeRadius+5, me.y()-label.height+((activeRadius*(7/8))/2));
            labelSplash.clear();
            labelSplash.beginFill(me.workspace.color1('number'), .6);
            labelSplash.drawRect(0, 0, label.width+9, label.height);
            labelSplash.endFill();
            labelSplash.position = new PIXI.Point(label.position.x-9, label.position.y);
            labelRule.clear();
            labelRule.beginFill(me.workspace.color3('number'), 1);
            labelRule.lineStyle(activeRadius/12, me.workspace.color3('number'), 1);
            labelRule.moveTo(0, labelSplash.height);
            labelRule.lineTo(labelSplash.width, labelSplash.height);
            labelRule.endFill();
            labelRule.position = labelSplash.position;
        };

        this.showLabel = function(){
            me.drawLabel();
            if(nodeGfx.children.indexOf(labelGrp) === -1){
                nodeGfx.addChildAt(labelGrp, 0);
            }
        };

        this.hideLabel = function(){
            if(nodeGfx.children.indexOf(labelGrp) > -1){
                nodeGfx.removeChild(labelGrp);
            }
        };

        //this.drawLabel();

        this.gfx = function(){
            return nodeGfx;
        };

        this.effectiveRadius = function(new_link){
            if(new_link === undefined){
                new_link = false;
            }
            var link_count = me.inLinks.length+me.outLinks.length;
            //for(var i = 0 ; i < ls.length; i++){
            //    if(ls[i].originID() === me.id() || ls[i].terminusID() === me.id())
            //    {
            //        link_count += 1;
            //    }
            //}
            if(new_link){
                link_count += 1;
            }
            var nec_c = 21*(1.3*link_count);
            var nec_r = nec_c / (Math.PI * 2);
            if(nec_r > activeRadius){
                if(nec_r > 1.5 * activeRadius)
                {
                    nec_r = 1.5 * activeRadius;
                }
                return nec_r;
            }
            else{
                return activeRadius;
            }
        };

        this.alpha = function(a){
            if(typeof a === "undefined"){
                return nodeGfx.alpha;
            }
            nodeGfx.alpha = a;
        };

        this.baseAlpha = function(a){
            if(typeof a === "undefined"){
                return base.alpha;
            }
            base.alpha = a;
        };

        this.labelAlpha = function(a){
            if(typeof a === "undefined"){
                return labelGrp.alpha;
            }
            labelGrp.alpha = a;
        };

        this.popOut = function(){
            var nl = me.netViz.nodeLayer().scale.x;
            if(nl < 1){
                var nsx = nl;
                var tempRadius = activeRadius / nsx;
                if(tempRadius > (70/nsx)){
                    tempRadius = (70/nsx);
                    if(tempRadius < activeRadius){
                        tempRadius = activeRadius*1.1;
                    }
                }
                activeRadius = tempRadius;
                me.calcShape();
                label.scale = {x: 1/nl, y: 1/nl};
                me.updateLinks();
            }
        };

        this.fullSize = function(){
            var nsx = me.netViz.nodeLayer().scale.x;
            if(activeRadius !== me.radius() / nsx){
                activeRadius = me.radius() / nsx;
                me.calcShape();
                me.updateLinks();
            }
        };

        /**
         * Scales the node to nodeLayer scale.
         */
        this.popBack = function(){
            activeRadius = me.radius();
            me.calcShape();
            label.scale = {x: 1, y: 1};
            if(!me.selected){
                me.netViz.appropriateDetail(me);
            }
            else{
                me.drawLabel();
            }
            me.updateLinks();
        };

        this.updateLinks = function(){
            var ls = me.outLinks.concat(me.inLinks);
            for(var i = 0; i < ls.length; i++){
                if(!ls[i].selected){
                    me.netViz.appropriateDetail(ls[i]);
                }
            }
        };

        this.calcShape();

        pixiAttachMouseEvents(me);
    }

    function Link(params){
        var me = this;
        this.workspace = params.workspace;
        this.netViz = params.netViz;
        GooeyObject.call(this, params);
        this.extends(MouseInteractions(params));
        var _info = params;

        this.selected = false;

        var arrow = new PIXI.Graphics();
        var linkGfx = new PIXI.Container();



        var x1, x2, y1, y2, width, rot, center, oRad, tRad, length, thickness, offX, offY, offcenter;
        var tile, icon, color, maxValue;
        var myOffset = 0;

        var uniValue = false;

        this.gfx = function(){
            return linkGfx;
        };

        this.id = function(){
            return _info.id;
        };

        this.originID = function(){
            return _info.origin;
        };

        this.terminusID = function(){
            return _info.terminus;
        };

        this.value = function(){
            return _info.value;
        };

        this.directed = function(){
            return 1;
        };

        this.label = function(){
            return _info.label;
        };

        var calculate = function (){
            var is_new = false;
            if(me.netViz.links().indexOf(me) === -1)
            {
                is_new = true;
            }
            var o = me.netViz.node(_info.origin);
            var t = me.netViz.node(_info.terminus);
            x1 = o.x();
            y1 = o.y();
            oRad = o.effectiveRadius(is_new);
            x2 = t.x();
            y2 = t.y();
            tRad = t.effectiveRadius(is_new);
            center = {x: (x1+x2)/2, y: (y1+y2)/2};
            width = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
            rot = Math.atan((y2 - y1) / (x2 - x1));
            if ((y2 >= y1 && x2 < x1) || (y2 <= y1 && x2 < x1)){ // destination node is in quadrant III of origin node
                rot = Math.PI + rot;
            }
            offX = x1-myOffset*Math.cos(rot+Math.PI/2);
            offY = y1-myOffset*Math.sin(rot+Math.PI/2);
            offcenter = {x: center.x-myOffset*Math.cos(rot+Math.PI/2), y: center.y-myOffset*Math.sin(rot+Math.PI/2)};
            if(tile === undefined){
                var lt = me.linkType = me.netViz.linkType(_info.type);
                maxValue = Number(lt.max());
                uniValue = lt.max() === lt.min();
                var hex;
                if(lt.color() === "dynamic"){
                    hex = me.workspace.dataColorMedium(lt.dynColor, 'hex');
                    color = me.workspace.dataColorMedium(lt.dynColor, 'number');
                }
                else{
                    hex = Gooey.rgbToHex(lt.color());
                    color = Gooey.rgbToNumber(lt.color());
                }
                tile = me.workspace.host+'icons/'+lt.icon()+'_42X42_'+hex.slice(1)+".png";
                icon = new PIXI.Sprite.fromImage(tile);
                icon.width = 21;
                icon.height = 21;
            }
            length = width - (oRad+tRad+15);
            var lscale = me.netViz.linkLayer().scale.x;
            thickness = (_info.value/maxValue)*16;
            if(lscale > 1){
                thickness /= lscale;
                icon.width = 21/lscale;
                icon.height = 21/lscale;
            }
        };

        var makeLabel = function(){
            var rtype = me.netViz.linkLabelProps.indexOf("type") > -1;
            var rname = me.netViz.linkLabelProps.indexOf("name") > -1;
            var rval = me.netViz.linkLabelProps.indexOf("value") > -1;
            var rmax = me.netViz.linkLabelProps.indexOf("max") > -1;
            var lblTxt = "";
            if(rtype){
                lblTxt += _info.type;
                if(rval){
                    lblTxt += "";
                }
            }
            if(rval && rmax){
                lblTxt += "("+me.value()+"/"+maxValue+")";
            }
            else if(rval && rmax){
                lblTxt += "("+me.value()+")";
            }
            if(rtype && rname){
                lblTxt += ": ";
            }
            if(rname){
                lblTxt += me.label();
            }

            return lblTxt;
        };

        var labelStyle = function(){
            var fsize = me.workspace.mediumFont;
            //var lscale = me.netViz.linkLayer().scale.x;
            //if(lscale > 1){
            //    fsize = pxToNum(fsize);
            //    fsize /= lscale;
            //    fsize += "px";
            //}
            return {
                font: fsize+" "+me.workspace.style('fontFamily'),
                fill: me.color
            }
        };

        var linkSplash = new PIXI.Graphics();
        var linkLabel = new PIXI.Text(makeLabel(), labelStyle());


        this.drawArrow = function(){
            calculate();
            var points = [];
            if(me.directed() === 1){
                if(!uniValue){
                    points.push(
                        new PIXI.Point(oRad, -thickness/2-myOffset),
                        new PIXI.Point(oRad+length, -thickness/2-myOffset),
                        new PIXI.Point(oRad+length, -10-myOffset),
                        new PIXI.Point(oRad+length+15, -myOffset),
                        new PIXI.Point(oRad+length, 10-myOffset),
                        new PIXI.Point(oRad+length, thickness/2-myOffset),
                        new PIXI.Point(oRad, thickness/2-myOffset)
                        //new PIXI.Point(oRad, 0-thickness/2-myOffset)
                    );
                }
                else{
                    points.push(
                        new PIXI.Point(oRad, -thickness/2-myOffset),
                        new PIXI.Point(oRad+length+15, -myOffset),
                        new PIXI.Point(oRad, thickness/2-myOffset)
                    );
                }
            }
            else if(me.directed() === 0){
                points.push(
                    new PIXI.Point(oRad, -thickness/2-myOffset),
                    new PIXI.Point(oRad+length+15, -thickness/2-myOffset),
                    new PIXI.Point(oRad+length+15, thickness/2-myOffset),
                    new PIXI.Point(oRad, thickness/2-myOffset)
                )
            }
            else if(me.directed() === 2){
                points.push(
                    new PIXI.Point(oRad, -myOffset),
                    new PIXI.Point(oRad+15, -10-myOffset),
                    new PIXI.Point(oRad+15, -thickness/2-myOffset),
                    new PIXI.Point(oRad+length, -thickness/2-myOffset),
                    new PIXI.Point(oRad+length, -10-myOffset),
                    new PIXI.Point(oRad+length+15, -myOffset),
                    new PIXI.Point(oRad+length, 10-myOffset),
                    new PIXI.Point(oRad+length, thickness/2-myOffset),
                    new PIXI.Point(oRad+15, thickness/2-myOffset),
                    new PIXI.Point(oRad+15, 10-myOffset)
                )
            }
            var hitPoints = [
                new PIXI.Point(oRad, -10-myOffset),
                new PIXI.Point(oRad+length+15, -10-myOffset),
                new PIXI.Point(oRad+length, 10-myOffset),
                new PIXI.Point(oRad, 10-myOffset)
            ];

            arrow.clear();
            arrow.beginFill(color, 1);
            arrow.drawPolygon(points);
            arrow.endFill();
            arrow.hitArea = new PIXI.Polygon(hitPoints);
            arrow.position = new PIXI.Point(x1, y1);
            arrow.rotation = rot;
            arrow.interactive = true;
            arrow.alpha = .7;
        };

        this.drawLine = function(){
            calculate();
            arrow.clear();
            arrow.lineStyle(thickness, color, 1);
            arrow.beginFill(color, 1);
            arrow.moveTo(oRad, 0);
            arrow.lineTo(oRad+length+15, 0);
            arrow.endFill();
            var hitPoints = [
                new PIXI.Point(oRad, -10-myOffset),
                new PIXI.Point(oRad+length+15, -10-myOffset),
                new PIXI.Point(oRad+length, 10-myOffset),
                new PIXI.Point(oRad, 10-myOffset)
            ];
            arrow.hitArea = new PIXI.Polygon(hitPoints);
            arrow.position = new PIXI.Point(x1, y1);
            arrow.rotation = rot;
            arrow.interactive = true;
            arrow.alpha = .7;
        };

        this.drawLabel = function(){
            linkLabel.text = makeLabel();
            linkLabel.style = labelStyle();
            var fsize = me.workspace.mediumFont;
            var lscale = me.netViz.linkLayer().scale.x;
            if(lscale > 1){
                linkLabel.scale = {x: 1/lscale, y: 1/lscale};
            }
            var xOff = -24;
            if(x2 < x1){
                xOff = 0;
            }
            var points = [];
            if(me.directed() === 1){
                points.push(
                    new PIXI.Point(-14+xOff-linkLabel.width/2, -linkLabel.height/2-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+xOff+10, -linkLabel.height/2-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+linkLabel.height/1.5+xOff+10, 0-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+xOff+10, linkLabel.height/2-myOffset),
                    new PIXI.Point(-14+xOff-linkLabel.width/2, linkLabel.height/2-myOffset),
                    new PIXI.Point(-4+xOff-linkLabel.width/2, 0-myOffset)
                )
            }
            else if(me.directed() === 0){
                points.push(
                    new PIXI.Point(-14+xOff-linkLabel.width/2, -linkLabel.height/2-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+xOff+10, -linkLabel.height/2-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+xOff+10, linkLabel.height/2-myOffset),
                    new PIXI.Point(-14+xOff-linkLabel.width/2, linkLabel.height/2-myOffset)
                )
            }
            else if(me.directed() === 2){
                points.push(
                    new PIXI.Point(-14+xOff-linkLabel.width/2, -myOffset),
                    new PIXI.Point(-4+xOff-linkLabel.width/2, -linkLabel.height/2-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+xOff+10, -linkLabel.height/2-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+linkLabel.height/1.5+xOff+10, 0-myOffset),
                    new PIXI.Point(linkLabel.width/2+14+xOff+10, linkLabel.height/2-myOffset),
                    new PIXI.Point(-4+xOff-linkLabel.width/2, linkLabel.height/2-myOffset)
                )

            }
            linkSplash.clear();
            linkSplash.beginFill(me.workspace.color1('number'),.8);
            linkSplash.lineStyle(1, me.color, 1);
            linkSplash.drawPolygon(points);
            linkSplash.endFill();
            linkSplash.alpha = .8;
            linkSplash.position = new PIXI.Point(center.x, center.y);
            linkSplash.hitArea = new PIXI.Polygon(points);
            linkSplash.rotation = rot;
            linkSplash.interactive = true;
            icon.position = new PIXI.Point(offcenter.x, offcenter.y);
            icon.rotation = rot;
            linkLabel.anchor = new PIXI.Point(.5,.5);
            if(x2 > x1){
                linkLabel.rotation = rot;
                linkLabel.position = new PIXI.Point(offcenter.x, offcenter.y);
                icon.anchor = new PIXI.Point(((linkLabel.width/2)/icon.width)+1,.5);
            }
            else{
                linkLabel.rotation = rot - Math.PI;
                linkLabel.position = new PIXI.Point(offcenter.x, offcenter.y);
                icon.anchor = new PIXI.Point(-1*((linkLabel.width/2)/icon.width),.5);
            }
        };
        //calculate();

        this.showLabel = function(){
            me.drawLabel();
            if(linkGfx.children.indexOf(linkLabel) === -1){
                linkGfx.addChild(linkSplash);
                linkGfx.addChild(icon);
                linkGfx.addChild(linkLabel);
            }
        };

        this.hideLabel = function(){
            if(linkGfx.children.indexOf(linkLabel) > -1){
                linkGfx.removeChild(linkSplash);
                linkGfx.removeChild(icon);
                linkGfx.removeChild(linkLabel);
            }
        };

        linkGfx.interactive = true;
        linkGfx.buttonMode = true;

        linkGfx.addChild(arrow);

        this.alpha = function(a){
            if(typeof a === "undefined"){
                return linkGfx.alpha;
            }
            linkGfx.alpha = a;
        };

        this.arrowAlpha = function(a){
            if(typeof a === "undefined"){
                return arrow.alpha;
            }
            arrow.alpha = a;
        };

        this.textAlpha = function(a){
            if(typeof a === "undefined"){
                return linkLabel.alpha;
            }
            linkLabel.alpha = a;
        };

        this.splashAlpha = function(a){
            if(typeof a === "undefined"){
                return linkSplash.alpha;
            }
            linkSplash.alpha = a;
        };

        this.iconAlpha = function(a){
            if(typeof a === "undefined"){
                return icon.alpha;
            }
            icon.alpha = a;
        };

        this.labelAlpha = function(a){
            if(typeof a === "undefined"){
                return icon.alpha;
            }
            icon.alpha = a;
            linkSplash.alpha = a;
            linkLabel.alpha = a;
        };

        this.offset = function(offset){
            myOffset = offset;
            if(me.selected){
                me.drawArrow();
                me.showLabel();
            }
            else{
                me.netViz.appropriateDetail(me);
            }
        };

        this.normalizedValue = function(){
            return me.value() / maxValue;
        };

        /**
         * Reports the number of links of this type which currently exist in the map.
         * @returns {number}
         */
        this.typePrevalence = function(){
            return me.linkType.count;
        };

        var linkSpreadSorter = function(b, a){
            if(a.normalizedValue() === b.normalizedValue())
            {
                return a.typePrevalence() - b.typePrevalence();
            }
            return a.normalizedValue() - b.normalizedValue();
        };


        /**
         * Sets the {@link Link#offset} for all parallel links to this one.
         */
        this.spread = function(){
            var ins = [];
            var outs = [];
            var outsRaw = me.netViz.node(me.originID()).outLinks;
            var insRaw = me.netViz.node(me.terminusID()).outLinks;
            var linksGlobal = outsRaw.concat(insRaw);
            for(var i = 0; i < linksGlobal.length; i++){
                if(linksGlobal[i].originID() === me.originID() && linksGlobal[i].terminusID() === me.terminusID())
                {
                    outs.push(linksGlobal[i]);
                }
                else if(linksGlobal[i].originID() === me.terminusID() && linksGlobal[i].terminusID() === me.originID())
                {
                    ins.push(linksGlobal[i]);
                }
            }
            ins.sort(linkSpreadSorter);
            outs.sort(linkSpreadSorter);
            var totalLanes = ins.length + outs.length;
            var laneSpacing = 26;
            var totalWidth = totalLanes * laneSpacing;
            for(var i = 0; i < outs.length; i++){
                var l_offset = (totalWidth/2) - ((outs.length - i)*laneSpacing)+laneSpacing/2;
                outs[i].offset(l_offset);
            }
            for(var i = 0; i < ins.length; i++){
                var l_offset = (totalWidth/2) - ((ins.length - i)*laneSpacing)+laneSpacing/2;
                ins[i].offset(l_offset)
            }
        };

        /**
         * Reports the center of the displayed link.
         * @returns {{x: number, y: number}}
         */
        this.center = function(){
            return {x: offcenter.x, y: offcenter.y};
        };

        pixiAttachMouseEvents(me);

    }

    function ZoomWidget(params){
        var me = this;
        params = params || {};
        var width = 60;
        var height = 228;
        var slideWidth = 24;
        var percentWidth = 20;
        var minZoom = params.min || 1;
        var maxZoom = params.max || 200;
        this.step = params.step || 5;
        ComplexElement.call(this, params);
        this.style({
            'position': 'absolute',
            'top': params.style.top,
            'left': params.style.left,
            'z-index': params.style.z,
            'width': width+'px',
            'height': height+'px',
            'background': me.workspace.color1('html'),
            'opacity':.8,
            'border': 'thin solid '+me.workspace.color3('html'),
            'border-radius': 3+'px'
        });
        var slideCol = width/2-me.workspace.objectHeight/2;
        var slideHeight = height - (3*(me.workspace.objectHeight+me.workspace.objectSpacing));
        me.parent = params.parent;

        this.zoom = params.zoom;



        var slider = new Slider({
            workspace: me.workspace,
            orientation: "vertical",
            min: minZoom,
            max: maxZoom,
            step: 1,
            defaultValue: me.zoom
        });

        var text = new TextBox({
            workspace: me.workspace,
            keyPress: function(e){
                if(e.which === 13 || e.keyCode === 13){
                    me.zoom = Number(text.text());
                    if(me.zoom > maxZoom){
                        me.zoom = maxZoom;
                    }
                    else if(me.zoom < minZoom){
                        me.zoom = minZoom;
                    }
                    zoomIt();
                }
            }
        });
        text.text(slider.value());

        var label = new Label({
            workspace: me.workspace,
            text: "%"
        });

        var plus = new TextButton({
            workspace: me.workspace,
            text: '+',
            leftClick: function(){
                me.zoom += me.step;
                if(me.zoom > maxZoom){
                    me.zoom = maxZoom;
                }
                zoomIt();
                plus.blur();
                me.blur();
            }
        });

        var minus = new TextButton({
            workspace: me.workspace,
            text: '-',
            leftClick: function(){
                me.zoom -= me.step;
                if(me.zoom < minZoom){
                    me.zoom = minZoom;
                }
                zoomIt();
                minus.blur();
                me.blur();
            }
        });

        var h = 2;
        text.style({
            'position': 'absolute',
            'left': me.workspace.objectSpacing+'px',
            'top': h+'px',
            'width': width-percentWidth-(3*me.workspace.objectSpacing)+'px',
            'padding': 0+'px',
            'margin': 0+'px',
            'text-align': 'right',
            'border': 'none'
        });
        label.style({
            'margin': 0+'px',
            'position': 'absolute',
            'right': 2+'px',
            'top': h+6+'px'
        });
        h += text.height()+me.workspace.objectSpacing;
        plus.style({
            'position': 'absolute',
            'top': h+'px',
            'left': slideCol+'px',
            'width': slideWidth,
            'height': slideWidth
        });
        h += plus.height();
        slider.style({
            'position': 'absolute',
            'color': me.workspace.color5('html'),
            'background': me.workspace.color1('html'),
            'left': slideCol+5+'px',
            'top': h+'px',
            'width': slideWidth+'px',
            'height': slideHeight+'px'

        });
        h += slider.height();
        minus.style({
            'position': 'absolute',
            'top': h+'px',
            'left': slideCol+'px',
            'width': slideWidth,
            'height': slideWidth
        });

        this.addChild(plus, slider, minus, label, text);

        var zoomIt = function(){
            slider.value(me.zoom);
            text.text(me.zoom);
            var p = {x: me.parent.width()/2, y: me.parent.height()/2};
            var p2 = me.parent.nodeLayer().position;
            var zd = me.parent.nodeLayer().scale.x - (me.zoom/100);
            var minY = p2.y+((p.y - p2.y)/me.parent.nodeLayer().scale.y)*zd;
            var minX = p2.x+((p.x - p2.x)/me.parent.nodeLayer().scale.x)*zd;
            me.parent.setView(minX, minY, me.zoom/100, me.zoom/100);
        };

        slider.element.oninput = function(){
            me.zoom = Number(slider.value());
            zoomIt();
            me.blur();
        };

        this.showZoom = function(zoom){
            me.zoom = Math.round(Number(zoom*100));
            slider.value(me.zoom);
            text.text(me.zoom);
        }
    }

    function NetworkVisualizer(params){
        var me = this;
        params = params || {};
        params.style.position = 'absolute';
        params.style.zIndex = 0;
        params.style.backgroundColor = params.workspace.color1('html');
        ComplexElement.call(this, params);
        var canvas = new GooeyElement({
            workspace: me.workspace,
            element: document.createElement('canvas'),
            style: {
                padding: 0+'px',
                margin: 0+'px'
            }
        });
        var stage = new PIXI.Container();
        var renderer = PIXI.autoDetectRenderer(me.width(), me.height(), {
            autoResize: true,
            resolution: params.resolution || 1.00,
            view: canvas.element,
            antialias: true
        });
        renderer.backgroundColor = me.workspace.workspaceColor(0, 'number');
        this.addChild(canvas);
        var nodeLayer = new PIXI.Container();
        var linkLayer = new PIXI.Container();
        var shadowLayer = new PIXI.Container();
        var bg = new PIXI.Graphics();
        var drawBackground = function(x, y, w, h){
            bg.clear();
            bg.beginFill(me.workspace.color1('number'), 1);
            bg.drawRect(x, y, w, h);
            bg.endFill();
        };
        drawBackground(0, 0, me.width(), me.height());
        bg.position = new PIXI.Point(0,0);
        bg.interactive = true;
        stage.addChild(bg);
        stage.addChild(shadowLayer);
        stage.addChild(linkLayer);
        stage.addChild(nodeLayer);
        stage.interactive = true;

        var allNodes = [];
        var nodesByID = {};
        var allLinks = [];
        var linksByID = {};
        var allLinkTypes = [];
        var linkTypesByName = {};
        var allNodeTypes = [];
        var nodeTypesByName = {};
        this.anim_functions = [];
        this.selectedNodes = [];
        this.selectedLinks = [];
        this.neighbors = {nodes: [], links: []};
        this.path = {nodes: [], links: []};
        this.filteredOut = {nodes: [], links: []};

        this.nodeColor = params.nodeColor || me.workspace.nextDataColor();

        this.showNeighbors = params.showNeighbors || false;
        this.showPaths = params.showPaths || false;

        var currentDetailLevel = 0;
        var snapPoints = [0.08, 0.50, 1.0, 3.0];
        var detailLevel = [
            {
                min: 0.0,
                max: snapPoints[0],
                apply: function(obj){
                    obj.currentDetailLevel = 0;
                },
                showAll: {
                    scale: -1,
                    x: 0,
                    y: 0
                }
            },
            {
                min: snapPoints[0],
                max: snapPoints[1],
                apply: function (obj) {
                    var nFunc = function (o) {
                        o.hideLabel();
                        o.currentDetailLevel = 1;
                    };
                    var lFunc = function (o) {
                        o.drawArrow();
                        o.hideLabel();
                        o.currentDetailLevel = 1;
                    };
                    if (typeof obj === "undefined") {
                        for (var i = 0; i < allNodes.length; i++) {
                            if (!allNodes[i].selected) {
                                nFunc(allNodes[i]);
                            }
                        }
                        for (var i = 0; i < allLinks.length; i++) {
                            if(!allLinks[i].selected){
                                lFunc(allLinks[i])
                            }
                        }
                    }
                    else if (obj.constructor.name === "Node") {
                        nFunc(obj);
                    }
                    else if (obj.constructor.name === "Link") {
                        lFunc(obj);
                    }
                }
            },
            {
                min: snapPoints[1],
                max: snapPoints[2],
                apply: function(obj){
                    var nFunc = function (o) {
                        o.showLabel();
                        o.currentDetailLevel = 2;
                    };
                    var lFunc = function (o) {
                        o.drawArrow();
                        o.hideLabel();
                        o.currentDetailLevel = 2;
                    };
                    if (typeof obj === "undefined") {
                        for (var i = 0; i < allNodes.length; i++) {
                            if (!allNodes[i].selected) {
                                nFunc(allNodes[i]);
                            }
                        }
                        for (var i = 0; i < allLinks.length; i++) {
                            if(!allLinks[i].selected){
                                lFunc(allLinks[i])
                            }
                        }
                    }
                    else if (obj.constructor.name === "Node") {
                        nFunc(obj);
                    }
                    else if (obj.constructor.name === "Link") {
                        lFunc(obj);
                    }
                }

            },
            {
                min: snapPoints[2],
                max: snapPoints[3],
                apply: function (obj) {
                    var nFunc = function (o) {
                        o.showLabel();
                        o.fullSize();
                        o.currentDetailLevel = 3;
                    };
                    var lFunc = function (o) {
                        o.drawArrow();
                        o.showLabel();
                        o.currentDetailLevel = 3;
                    };
                    if (typeof obj === "undefined") {
                        for (var i = 0; i < allNodes.length; i++) {
                            if (!allNodes[i].selected) {
                                nFunc(allNodes[i]);
                            }
                        }
                        for (var i = 0; i < allLinks.length; i++) {
                            if (!allLinks[i].selected) {
                                lFunc(allLinks[i])
                            }
                        }
                    }
                    else if (obj.constructor.name === "Node") {
                        nFunc(obj);
                    }
                    else if (obj.constructor.name === "Link") {
                        lFunc(obj);
                    }
                }
            }

        ];

        this.detailLevels = function(){
            return detailLevel;
        };

        this.currentDetailLevel = function(){
            return currentDetailLevel;
        };

        var nodeBehaviors = {};

        var linkBehaviors = {};

        this.nodeBehaviors = function(nb){
            if(typeof nb === 'undefined'){
                return nodeBehaviors;
            }
            for(var k in nb){
                if(nb.hasOwnProperty(k)){
                    nodeBehaviors[k] = nb[k];
                }
            }
            for(var i = 0; i < allNodes.length; i++){
                allNodes[i].extends(nodeBehaviors);
            }
        };

        this.linkBehaviors = function(lb){
            if(typeof lb === 'undefined'){
                return linkBehaviors;
            }
            for(var k in lb){
                if(lb.hasOwnProperty(k)){
                    linkBehaviors[k] = lb[k];
                }
            }
            for(var i = 0; i < allLinks.length; i++){
                allLinks[i].extends(linkBehaviors);
            }
        };

        if(params.hasOwnProperty('nodeBehaviors')){
            me.nodeBehaviors(params['nodeBehaviors']);
        }

        if(params.hasOwnProperty('linkBehaviors')){
            me.linkBehaviors(params['linkBehaviors']);
        }

        var zoomer = new ZoomWidget({
            workspace: me.workspace,
            parent: me,
            style: {
                top: '2px',
                left: '0px'
            },
            zoom: 100,
            step: 10,
            max: detailLevel[detailLevel.length-1].max*100
        });
        this.addChild(zoomer);

        this.zoomWidget = function(){
            return zoomer;
        };

        requestAnimationFrame(animate);
        function animate(){
            requestAnimationFrame(animate);
            for(var i = 0; i < me.anim_functions.length; i++){
                me.anim_functions[i].function.apply(this, me.anim_functions[i].args);
            }
            //if(currentDetailLevel > 2){
            //    renderer.resolution = 2*nodeLayer.scale.x;
            //}
            //else{
            //    renderer.resolution = 1;
            //}
            renderer.render(stage);

        }

        this.addNode = function(params){
            if(params.constructor.name === "Node"){
                params = params.parsable();
            }
            params.workspace = me.workspace;
            params.netViz = me;
            var n = new Node(params);
            //n.calcShape();
            n.extends(nodeBehaviors);
            me.nodeType(params.type).count++;
            detailLevel[1].apply(n);
            nodeLayer.addChild(n.gfx());

            allNodes.push(n);
            nodesByID[n.id()] = n;
        };

        this.addLink = function(params){
            if(params.constructor.name === "Link"){
                params = params.parsable();
            }
            params.workspace = me.workspace;
            params.netViz = me;
            var l = new Link(params);
            l.extends(linkBehaviors);
            me.linkType(params.type).count++;
            nodesByID[l.originID()].outLinks.push(l);
            nodesByID[l.terminusID()].inLinks.push(l);
            detailLevel[1].apply(l);
            linkLayer.addChild(l.gfx());
            allLinks.push(l);
            linksByID[l.id()] = l;
        };

        this.addLinkType = function(ltype){
            ltype.netViz = me;
            ltype.workspace = me.workspace;
            ltype.count = 0;
            allLinkTypes.push(ltype);
            linkTypesByName[ltype.name()] = ltype;
        };

        this.addNodeType = function(ntype){
            ntype.netViz = me;
            ntype.workspace = me.workspace;
            ntype.count = 0;
            allNodeTypes.push(ntype);
            nodeTypesByName[ntype.name()] = ntype;
        };

        var mapImage;

        this.centerOn = function(x, y, width, height){
            var buffer = 100;
            var scaleX = (me.width()-buffer) / width;
            var scaleY = (me.height()-buffer) / height;

            var maxScale = detailLevel[detailLevel.length-1].max;
            var minScale = .001;
            if(scaleX > maxScale || scaleY > maxScale){
                scaleX = scaleY = maxScale;
            }
            if(height*scaleY > me.height()-buffer){
                scaleY = scaleX = ((me.height()-buffer) / height);
            }
            if(width*scaleX > me.width()-buffer){
                scaleX = scaleY = ((me.width()-buffer) / width);
            }
            if(scaleX < minScale || scaleY < minScale){
                scaleX = scaleY = minScale;
            }
            var scale;
            if(scaleY < scaleX){
                scale = scaleY;
            }
            else{
                scale = scaleX;
            }
            me.setView(
                -1*((x) * scale)+((me.width()-(width*scale))/2),
                -1*((y) * scale)+((me.height()-(height*scale))/2),
                scale,
                scale
            );
        };

        this.showAll = function(){
            var x1;
            var x2;
            var y1;
            var y2;
            var anl = allNodes.length;
            for(var i = 0; i < anl; i++){
                var p = allNodes[i].position();
                if(x1 === undefined){
                    x1 = p.x;
                    x2 = p.x;
                    y1 = p.y;
                    y2 = p.y;
                }
                if(p.x < x1){
                    x1 = p.x;
                }
                if(p.x > x2){
                    x2 = p.x;
                }
                if(p.y < y1){
                    y1 = p.y;
                }
                if(p.y > y2){
                    y2 = p.y;
                }
            }

            var width = x2-x1;
            var height = y2-y1;

            this.centerOn(x1, y1, width, height);

            var ox = nodeLayer.position.x;
            var oy = nodeLayer.position.y;
            detailLevel[0].showAll = {
                scale: nodeLayer.scale.x,
                x: ox,
                y: oy
            };
            nodeLayer.position = {x: 0, y: 0};
            linkLayer.position = {x: 0, y: 0};
            drawBackground(0, 0, nodeLayer.width, nodeLayer.height);
            mapImage = new PIXI.Sprite(stage.generateTexture(renderer, 2, 0));
            nodeLayer.position = {x: ox, y: oy};
            linkLayer.position = {x: ox, y: oy};
            mapImage.position = {x: ox, y: oy};
            drawBackground(0, 0, me.width(), me.height());
            useMapImage(currentDetailLevel === 0);
        };

        var populate = {
            nodes: function(node){
                if(node.currentDetailLevel !== currentDetailLevel || nodeLayer.scale.x >= 1.0){
                    detailLevel[currentDetailLevel].apply(node);
                }
                if(nodeLayer.children.indexOf(node.gfx()) < 0){
                    nodeLayer.addChild(node.gfx());
                }
            },
            links: function(link){
                if(link.currentDetailLevel !== currentDetailLevel || linkLayer.scale.x >= 1.0){
                    detailLevel[currentDetailLevel].apply(link);
                }
                if(linkLayer.children.indexOf(link.gfx()) < 0){
                    linkLayer.addChild(link.gfx());
                }
            },
            excludedNodes: function(node){
                if(nodeLayer.children.indexOf(node.gfx()) > -1){
                    nodeLayer.removeChild(node.gfx());
                }
            },
            excludedLinks: function(link){
                if(linkLayer.children.indexOf(link.gfx()) > -1){
                    linkLayer.removeChild(link.gfx());
                }
            },
            perimeterLinks: function(link){
                populate.links(link);
            }
        };

        this.setView = function(x, y, scaleX, scaleY){
            if(detailLevel[0].showAll.scale > 0 && scaleX < detailLevel[0].max){
                scaleX = scaleY = detailLevel[0].showAll.scale;
            }
            var xScale = nodeLayer.scale.x;
            var yScale = nodeLayer.scale.y;

            if(typeof mapImage !== "undefined" && scaleX < detailLevel[0].max){
                if(x + mapImage.width > me.width()){
                    x = me.width()-mapImage.width;
                }
                else if(x < 0){
                    x = 0;
                }
                if(y + mapImage.height > me.height()){
                    y = me.height() - mapImage.height;
                }
                else if(y < 0){
                    y = 0;
                }
            }
            nodeLayer.scale = {x: scaleX, y: scaleY};
            linkLayer.scale = {x: scaleX, y: scaleY};
            nodeLayer.position = {x: x, y: y};
            linkLayer.position = {x: x, y: y};

            if(scaleX !== xScale || scaleY !== yScale){
                for(var i = 0; i < detailLevel.length; i++){
                    if(detailLevel[i].min <= scaleX && scaleX < detailLevel[i].max){
                        currentDetailLevel = i;
                    }
                }
            }

            if(currentDetailLevel > 0){
                useMapImage(false);
                me.objectsInArea(0,0, me.width(), me.height(), populate);
            }
            else if(typeof mapImage !== "undefined"){
                mapImage.position = {x: x, y: y};
                useMapImage(true);
            }
            zoomer.showZoom(scaleX);
        };

        function useMapImage(tf){
            if(tf && stage.children.indexOf(mapImage) === -1){
                stage.removeChild(nodeLayer);
                stage.removeChild(linkLayer);
                stage.addChild(mapImage);
            }
            else if(!tf && stage.children.indexOf(mapImage) > -1){
                stage.removeChild(mapImage);
                stage.addChild(linkLayer);
                stage.addChild(nodeLayer);
            }
        }

        this.node = function(nodeID){
            return nodesByID[nodeID];
        };

        this.link = function(linkID){
            return linksByID[linkID];
        };

        this.linkType = function(name){
            return linkTypesByName[name];
        };

        this.nodeType = function(name){
            return nodeTypesByName[name];
        };

        this.nodes = function(){
            return allNodes;
        };

        this.links = function(){
            return allLinks;
        };

        this.linkTypes = function(){
            return allLinkTypes;
        };

        this.nodeTypes = function(){
            return allNodeTypes;
        };

        this.nodeLayer = function(){
            return nodeLayer;
        };

        this.linkLayer = function(){
            return linkLayer;
        };

        this.grabAnchor = {x: 0, y: 0};

        this.mousePos = {x: 0, y: 0};

        this.neighborsOf = function(){
            var nds = Array.prototype.slice.call(arguments);
            if(nds.length === 1 && Array.isArray(nds[0])){
                nds = nds[0]
            }
            var originNodes = [];
            for(var i = 0; i < nds.length; i++){
                originNodes.push(nodesByID[nds[i]]);
            }
            var nodes = [];
            var links = [];
            for(var i = 0; i < originNodes.length; i++){
                var tls = originNodes[i].inLinks.concat(originNodes[i].outLinks);
                for(var j = 0; j < tls.length; j++){
                    var oNode = nodesByID[tls[j].originID()];
                    var tNode = nodesByID[tls[j].terminusID()];
                    if(nodes.indexOf(oNode) < 0){
                        nodes.push(oNode);
                    }
                    if(nodes.indexOf(tNode) < 0){
                        nodes.push(tNode);
                    }
                    if(links.indexOf(tls[j]) < 0){
                        links.push(tls[j]);
                    }
                }
            }
            return {nodes: nodes, links: links};
        };

        stage.on('mousedown', function(d){
            var p = d.data.getLocalPosition(stage);
            var np = nodeLayer.position;
            me.grabAnchor = {x: p.x - np.x, y: p.y - np.y};
        });

        stage.on('mousemove', function(d){
            me.mousePos = d.data.getLocalPosition(stage);
        });

        var mmFunc = function(){
            if(!zoomer.containsPoint(me.workspace.pointer)){
                var nx = me.mousePos.x - me.grabAnchor.x;
                var ny = me.mousePos.y - me.grabAnchor.y;
                var xDiff = nodeLayer.position.x - nx;
                var yDiff = nodeLayer.position.y - ny;
                selectBox.position.x -= xDiff;
                selectBox.position.y -= yDiff;
                var scale = nodeLayer.scale.x;
                me.setView(nx, ny, scale, scale);
            }
        };

        function objectInteractivity(tf){
            var anl = allNodes.length;
            for(var i = 0; i < anl; i++){
                allNodes[i].interactive = tf;
                allNodes[i].buttonMode = tf;
            }
            var a_l_l = allLinks.length;
            for(var i = 0; i < a_l_l; i++){
                allLinks[i].interactive = tf;
                allLinks[i].buttonMode = tf;
            }
        }

        this.beginMoving = function(){
            objectInteractivity(false);
            me.workspace.addMouseMoveFunction(mmFunc);
            mmFunc();
        };

        this.endMoving = function(){
            objectInteractivity(true);
            me.workspace.removeMouseMoveFunction(mmFunc);
        };

        this.linkLabelProps = params.linkLabelProps || ["type","name","value", "max"];

        this.showSelection = function(select){
            select = select || {nodes: [], links: []};
            var count = allNodes.length;
            for(var i = 0; i < count; i++){
                if(!allNodes[i].selected){
                    allNodes[i].alpha(.3);
                }
            }
            count = select.nodes.length;
            for(var i = 0; i < count; i++){
                select.nodes[i].alpha(1);
            }
            count = me.selectionContents.nodes.length;
            for(var i = 0; i < count; i++){
                me.selectionContents.nodes[i].alpha(1);
            }
            count = allLinks.length;
            for(var i = 0; i < count; i++){
                if(!allLinks[i].selected){
                    allLinks[i].alpha(.3);
                }
            }
            count = select.links.length;
            for(var i = 0; i < count; i++){
                select.links[i].alpha(1);
            }
            count = me.selectionContents.links.length;
            for(var i = 0; i < count; i++){
                me.selectionContents.links[i].alpha(1);
            }
        };

        var exceptFiltered = function(obj){
            var nodes = obj.nodes || [];
            var links = obj.links || [];
            var ns = [];
            var ls = [];
            var count = nodes.length;
            for(var i = 0; i < count; i++){
                if(me.filteredOut.nodes.indexOf(nodes[i]) === -1){
                    ns.push(nodes[i]);
                }
            }
            count = links.length;
            for(var i = 0; i < count; i++){
                if(me.filteredOut.links.indexOf(links[i]) === -1){
                    ls.push(links[i]);
                }
            }
            return {nodes: ns, links: ls}
        };

        this.allVisible = function(){
            var sNodes = me.selectedNodes.concat(me.selectionContents.nodes);
            var sLinks = me.selectedLinks.concat(me.selectionContents.links);
            if(sNodes.length === 0 && sLinks.length === 0){
                var count = allNodes.length;
                for(var i = 0; i < count; i++){
                    if(me.filteredOut.nodes.indexOf(allNodes[i]) === -1){
                        allNodes[i].alpha(1);
                    }
                    else{
                        allNodes[i].alpha(.3);
                    }
                }
                count = allLinks.length;
                for(var i = 0; i < count; i++){
                    if(me.filteredOut.links.indexOf(allLinks[i]) === -1){
                        allLinks[i].alpha(1);
                    }
                    else{
                        allLinks[i].alpha(.3);
                    }
                }
            }
            else if(me.showNeighbors && !me.showPaths){
                me.showSelection(exceptFiltered(me.neighbors));
            }
            else if(me.showPaths && !me.showNeighbors){
                me.showSelection(exceptFiltered(me.path));
            }
            else if(me.showPaths && me.showNeighbors){
                var ns = me.neighbors.nodes.concat(me.path.nodes);
                var ls = me.neighbors.links.concat(me.path.links);
                me.showSelection(exceptFiltered({nodes: ns, links: ls}));
            }
            else{
                me.showSelection(exceptFiltered({nodes: sNodes, links: sLinks}));
            }

        };

        this.appropriateDetail = function(obj){
            if(currentDetailLevel > 0){
                detailLevel[currentDetailLevel].apply(obj);
            }
        };

        var selectBox = new PIXI.Graphics();

        this.selecting = false;

        this.zoomToPoint = function(point, percent){
            percent /= -100;
            var ns = nodeLayer.scale;
            var newX = ns.x-percent;
            var newY = ns.y-percent;
            var lowerThresh = 0.001;
            var upperThresh = detailLevel[detailLevel.length-1].max;
            if(newX < lowerThresh || newY < lowerThresh)
            {
                newX = lowerThresh;
                newY = lowerThresh;
            }
            else if(newX > upperThresh || newY > upperThresh)
            {
                newX = upperThresh;
                newY = upperThresh;
            }
            if(ns.x !== newX && ns.y !== newY)
            {
                var p2 = nodeLayer.position;
                var minY = p2.y+((point.y - p2.y)/ns.y)*percent;
                var minX = p2.x+((point.x - p2.x)/ns.x)*percent;
                me.setView(minX, minY, newX, newY);
            }
        };

        this.objectsInArea = function(x, y, width, height, functions) {
            functions = functions || {};
            functions.nodes = functions.nodes || function(){};
            functions.links = functions.links || function(){};
            functions.perimeterLinks = functions.perimeterLinks || function(){};
            functions.excludedLinks = functions.excludedLinks || function(){};
            functions.excludedNodes = functions.excludedNodes || function(){};
            var np = nodeLayer.position;
            var nsc = nodeLayer.scale.x;
            var x1 = (x - np.x)/nsc;
            var y1 = (y - np.y)/nsc;
            var x2 = (x + width - np.x)/nsc;
            var y2 = (y + height - np.y)/nsc;
            var nodes = [];
            var nids = [];
            var links = [];
            var links_plus = [];
            var x_nodes = [];
            var x_links = [];
            var anl = allNodes.length;
            for (var i = 0; i < anl; i++) {
                var nx = allNodes[i].x();
                var ny = allNodes[i].y();
                if ((x1 <= nx && nx <= x2) && (y1 <= ny && ny <= y2)) {
                    nodes.push(allNodes[i]);
                    functions.nodes(allNodes[i]);
                    nids.push(allNodes[i].id());
                }
                else {
                    x_nodes.push(allNodes[i]);
                    functions.excludedNodes(allNodes[i]);
                }
            }
            var a_l_l = allLinks.length;
            for (var i = 0; i < a_l_l; i++) {
                var o = nids.indexOf(allLinks[i].originID()) > -1;
                var t = nids.indexOf(allLinks[i].terminusID()) > -1;
                if (o && t) {
                    links.push(allLinks[i]);
                    functions.links(allLinks[i]);
                }
                else if (o || t) {
                    links_plus.push(allLinks[i]);
                    functions.perimeterLinks(allLinks[i]);
                }
                else {
                    x_links.push(allLinks[i]);
                    functions.excludedLinks(allLinks[i]);
                }
            }
            return {
                nodes: nodes,
                links: links,
                perimeterLinks: links_plus,
                excludedNodes: x_nodes,
                excludedLinks: x_links
            };
        };

        this.selectionContents = {nodes: [], links: [], perimeterLinks: [], excludedNodes: [], excludedLinks: []};

        var sbFunc = function(){
            selectBox.position = {x: 0, y: 0};
            selectBox.scale = {x: 1, y: 1};
            selectBox.clear();
            selectBox.beginFill(me.workspace.color1('number'), 0);
            selectBox.lineStyle(1, me.workspace.color4('number'), 1);
            var x = me.grabAnchor.x;
            var y = me.grabAnchor.y;
            var w = me.mousePos.x-me.grabAnchor.x;
            var h = me.mousePos.y-me.grabAnchor.y;
            selectBox.drawRect(x, y, w, h);
            selectBox.endFill();
            if(w < 0){
                x = x+w;
                w *= -1;
            }
            if(h < 0){
                y = y+h;
                h *= -1;
            }
            me.selectionContents = me.objectsInArea(x, y, w, h);
            me.showSelection();
        };

        this.startSelection = function(){
            if(stage.children.indexOf(selectBox) === -1){
                stage.addChild(selectBox)
            }
            me.selecting = true;
            me.grabAnchor = JSON.parse(JSON.stringify(me.mousePos));
            if(!me.workspace.hasMouseMoveFunction(sbFunc)){
                me.workspace.addMouseMoveFunction(sbFunc);
            }
        };

        this.endSelection = function(){
            if(me.workspace.hasMouseMoveFunction(sbFunc)){
                me.workspace.removeMouseMoveFunction(sbFunc);
            }
        };

        this.clearSelection = function(){
            me.endSelection();
            selectBox.clear();
            me.selecting = false;
            if(stage.children.indexOf(selectBox) > -1){
                stage.removeChild(selectBox)
            }
            for(var k in me.selectionContents){
                if(me.selectionContents.hasOwnProperty(k)){
                    me.selectionContents[k].length = 0;
                }
            }

        };

        attachMouseEvents(this);

        bg.click = params.bgClick || function(){
                while(me.selectedNodes.length > 0){
                    var n = me.selectedNodes.pop();
                    n.selected = false;
                    detailLevel[currentDetailLevel].apply(n);
                }
                while(me.selectedLinks.length > 0){
                    var l = me.selectedLinks.pop();
                    l.selected = false;
                    detailLevel[currentDetailLevel].apply(l);
                }
                me.allVisible();
            };
        bg.mousedown = params.bgMouseDown || function(){
                if(me.selecting){
                    me.clearSelection();
                    me.allVisible();
                }
            };
        bg.mouseup = params.bgMouseUp || function(){
                if(me.selectionContents.nodes.length === 0 || me.selectedNodes.length > 0 || me.selectedLinks.length > 0){
                    bg.click();
                }
            }


    }

    return {
        UID: function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16)
            });
        },
        makeOption: function(text, value){
            var opt1 = document.createElement("option");
            opt1.text = text;
            opt1.value = value;
            return opt1;
        },
        GET: function(url, callback, errorHandler){
            callback = callback || function(data){};
            errorHandler = errorHandler || function(request){};
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    callback(data)
                }
                else {
                    console.log(request);
                }
            };
            request.onerror = errorHandler(request);
            request.send();
        },
        Workspace: function(params){
            return new Workspace(params);
        },
        TextBox: function(params){
            return new TextBox(params);
        },
        Button: function(params){
            return new Button(params);
        },
        TextButton: function(params){
            return new TextButton(params);
        },
        Picture: function(params){
            return new Picture(params);
        },
        ImageButton: function(params){
            return new ImageButton(params);
        },
        WindowImageButton: function(params){
            return new WindowImageButton(params);
        },
        Toolbar: function(params){
            return new Toolbar(params);
        },
        SearchResults: function(params){
            return new SearchResults(params);
        },
        SearchResult: function(params){
            return new SearchResult(params);
        },
        Label: function(params){
            return new Label(params);
        },
        rgbToHex: function(rgb){
            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
            function rgbToHex(r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            }
            return rgbToHex(rgb[0], rgb[1], rgb[2]);
        },
        rgbToHTML: function(rgb){
            return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
        },
        rgbToNumber: function(rgb){
            return Number('0x'+Gooey.rgbToHex(rgb).substring(1));
        },
        Window: function(params){
            return new GooeyWindow(params);
        },
        AssetPreloader: function(params){
            return new AssetPreloader(params);
        },
        animate: function(object, target, duration, onComplete){
            duration = (duration || object.workspace.tween) * 1000;
            var delay = 30;
            var numSteps = Math.round(duration / delay);
            var steps = {};
            for(var style in target){
                if(target.hasOwnProperty(style)){
                    var fin =  target[style];
                    if(fin.indexOf('px') > -1){
                        fin = pxToNum(fin);
                    }
                    var start = object.style(style);
                    steps[style] = (fin-start) / (numSteps);
                }
            }
            var stepsTaken = 0;
            function frame(){
                stepsTaken++;
                var ns = {};
                for(var style in steps){
                    if(steps.hasOwnProperty(style)){
                        ns[style] = object.style(style) + steps[style]+'px'
                    }
                }
                object.style(ns);
                if(stepsTaken < numSteps){
                    setTimeout(frame, delay);
                }
                else{
                    onComplete();
                }
            }
            setTimeout(frame, delay);
        },
        NetworkVisualizer: function(params){
            return new NetworkVisualizer(params);
        },
        DropDownMenu: function(params){
            return new DropDownMenu(params);
        },
        RangeInput: function(params){
            return new RangeInput(params);
        },
        ComplexElement: ComplexElement,
        WebGL: 'js/pixi.js',
        Search: ['js/jquery-2.1.4.min.js', 'js/bloodhound.js']
    }
}();