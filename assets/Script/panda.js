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
        upSpeed: 0,
        downSpeed: 0,
        leftSpeed: 0,
        rightSpeed: 0,
        currDir:"LEFT",
        AniName:''
    },
    stop(){
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.upSpeed = 0;
        this.downSpeed = 0;
        let anim = this.getComponent(cc.Animation);
        anim.stop(this.AniName + 0);
        anim.stop(this.AniName + 1);
        anim.stop(this.AniName + 2);
        anim.stop(this.AniName + 3);
    },
    changeDirection(dir){
        if(dir != 1)
            this.getComponent(cc.Animation).play(this.AniName + (dir>6?6:dir));
        switch(dir){
            case 0:
                this.currDir = "LEFT";
                this.leftSpeed += 50;
                break;
            case 1:
                this.upSpeed += 50;
                if(this.currDir == "RIGHT"){
                    this.rightSpeed += 50;
                    this.getComponent(cc.Animation).play(this.AniName + 1);
                }
                else if(this.currDir == "LEFT"){
                    this.leftSpeed += 50;
                    this.getComponent(cc.Animation).play(this.AniName + 3);
                }
                break;
            case 2:
                this.currDir = "RIGHT";
                this.rightSpeed += 50;
                break;
            case 3:
                this.currDir = "DOWN";
                this.downSpeed += 50;
                break;
            case 5:
                if(this.currDir == "RIGHT")
                    this.rightSpeed += 200;
                else if(this.currDir == "LEFT")
                    this.leftSpeed += 200;
            default:
                break;
        }
    },
    onCollisionEnter:function(other,self){
        console.log("Collide!");
        console.log(other);
        let world = self.world;
    },
    onCollisionStay: function (other, self) {
        this.stop();
    },
    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        console.log(this.currDir);
        switch(this.currDir){
            case "LEFT":
                this.node.x -= this.leftSpeed * dt;
                break;
            case "UP":
                this.node.y += this.upSpeed * dt;
                break;
            case "RIGHT":
                this.node.x += this.rightSpeed * dt;
                break;
            case "DOWN":
                this.node.y -= this.downSpeed * dt;
                break;
            default:
                break;
        }
    }
});
