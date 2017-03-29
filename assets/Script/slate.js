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
        leftSpeed: 0,
        rightSpeed: 0,
        Anim_forward:'',
        Anim_backward:'',
        dir:"RIGHT"
    },
    onCollisionEnter: function (other, self) {
        console.log("COLLISION AT SLATE");
    },
    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
    },
    moveForward(){
        this.dir = "RIGHT";
        // this.getComponent(cc.Animation).play(this.Anim_forward);
        this.rightSpeed += 100;
    },
    moveBackward(){
        this.dir = "LEFT";
        // this.getComponent(cc.Animation).play(this.Anim_backward);
        this.leftSpeed += 100;
    },
    move(){
        let self = this;
        switch(this.dir){
            case "RIGHT":
                // self.getComponent(cc.Animation).play(self.Anim_forward);
                this.rightSpeed += 250;
                break;
            case "LEFT":
                // self.getComponent(cc.Animation).play(self.Anim_backward);
                this.leftSpeed += 250;
                break;
            default:
            break;
        }
    },
    stop(){
        this.getComponent(cc.Animation).stop();
        this.rightSpeed = 0;
        this.leftSpeed = 0;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.dir == "RIGHT")
            this.node.x -= this.rightSpeed * dt;
        else if(this.dir == "LEFT" && this.node.x < 2450)
            this.node.x += this.leftSpeed * dt;
    },
});
