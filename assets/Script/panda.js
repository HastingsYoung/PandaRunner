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
        AniName:'',
        jumpAudio:{
            default: null,
            url:cc.AudioClip
        },
        growAudio:{
            default: null,
            url: cc.AudioClip
        }
    },
    stop(){
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.upSpeed = 0;
        let anim = this.getComponent(cc.Animation);
        anim.stop(this.AniName + 0);
        anim.stop(this.AniName + 1);
        anim.stop(this.AniName + 2);
        anim.stop(this.AniName + 3);
        anim.stop(this.AniName + 5);
    },
    changeDirection(dir){
        if(dir != 1)
            this.getComponent(cc.Animation).play(this.AniName + (dir>6?6:dir));
        switch(dir){
            case 0:
                this.currDir = "LEFT";
                this.leftSpeed += 100;
                break;
            case 1:
                this.upSpeed += 500;
                if(this.currDir == "RIGHT"){
                    this.rightSpeed += 200;
                    this.getComponent(cc.Animation).play(this.AniName + 1);
                }
                else if(this.currDir == "LEFT"){
                    this.leftSpeed += 200;
                    this.getComponent(cc.Animation).play(this.AniName + 3);
                }
                break;
            case 2:
                this.currDir = "RIGHT";
                this.rightSpeed += 100;
                break;
            case 3:
                this.currDir = "DOWN";
                this.downSpeed += 100;
                break;
            case 4:
                cc.audioEngine.play(this.growAudio,false,1);
                break;
            case 5:
                if(this.currDir == "RIGHT")
                    this.rightSpeed += 250;
                else if(this.currDir == "LEFT")
                    this.leftSpeed += 250;
                break;
            case 6:
                cc.audioEngine.play(this.jumpAudio,false,1);
                if(this.upSpeed < 700) 
                    this.upSpeed = 700;
                break;
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
        this.downSpeed = 0;
    },
    onCollisionExit:function (other, self){
        console.log("EXIT COLLIDE");
        this.downSpeed += 400;
    },
    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= this.downSpeed * dt;
        switch(this.currDir){
            case "LEFT":
                if(this.node.x>-417)
                    this.node.x -= this.leftSpeed * dt;
                break;
            case "UP":
                this.node.y += this.upSpeed * dt;
                break;
            case "RIGHT":
                if(this.node.x<310)
                    this.node.x += this.rightSpeed * dt;
                break;
            default:
                break;
        }
    }
});
