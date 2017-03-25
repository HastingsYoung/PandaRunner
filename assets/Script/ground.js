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
        nodes:{
            default:[],
            type:[cc.Node]
        },
        AniName: ''
    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        setInterval(function(){
            self.moveSlate(Math.floor(Math.random()*9));
        },1000);
    },

    moveSlate:function(index){
        index = (index>8?8:index);
        this.nodes[index].getComponent(cc.Animation).play(this.AniName + index);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
