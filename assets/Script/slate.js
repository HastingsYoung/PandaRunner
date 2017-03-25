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
        Anim_forward:'',
        Anim_backward:''
    },
    onCollisionEnter: function (other, self) {
        console.log("COLLISION AT SLATE");
    },
    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
    },
    moveForward(){
        this.getComponent(cc.Animation).play(this.Anim_forward);
    },
    moveBackward(){
        this.getComponent(cc.Animation).play(this.Anim_backward);
    },
    stop(){
        this.getComponent(cc.Animation).stop();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});