cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        panda:{
            default:null,
            type:cc.Node
        },
        bg:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode,event){
                let cp = self.panda.getComponent('panda');
                if(keyCode == 37){
                    cp.changeDirection(0);
                    self.bg.getComponent('slate').moveBackward();
                }
                // else if(keyCode == 38){
                //     cp.changeDirection(1);
                // }
                else if (keyCode == 39){
                    cp.changeDirection(2);
                    self.bg.getComponent('slate').moveForward();
                }
                // else if (keyCode == 40){
                //     cp.changeDirection(3);
                // }
                else if(keyCode == 32)
                    cp.changeDirection(4);
                else if (keyCode == 16){
                    cp.changeDirection(5);
                    self.bg.getComponent('slate').move();
                }
                else if (keyCode == 9)
                    cp.changeDirection(6);
            },
            onKeyReleased: function (keyCode, event) {
                let pd = self.panda.getComponent('panda');
                let bg = self.bg.getComponent('slate');
                bg.stop();
                pd.stop();
            }
        },this.panda);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
