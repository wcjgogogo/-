// 自调用函数-游戏对象
(function(){
    var that=null
    // 封装游戏的构造函数
    function Game(map){
        this.food=new Food()//食物对象
        this.snack=new Snack()//小蛇对象
        this.map=map//地图
        that=this
    }
    Game.prototype.init=function(){
        // 初始化游戏
        // 食物初始化
        this.food.init(this.map)
        // 小蛇初始化
        this.snack.init(this.map)
        // setInterval(()=>{
        //     that.snack.move(that.food,that.map)
        //     that.snack.init(that.map)
        // },150)
        // 调用自动移动小蛇的方法
        this.runSnack(this.food,this.map)
        // 调用按键方法
        this.bindKey()
    }
    // 添加原型方法-让小蛇自动跑起来
    Game.prototype.runSnack=function(food,map){
        // 自动去移动
        var timeId=setInterval(function(){
            // 移动小蛇
            this.snack.move(food,map)
            // 初始化小蛇
            this.snack.init(map)
            // 设置横坐标最大值
            var maxX=map.offsetWidth/this.snack.width//40
            // 设置纵坐标最大值
            var maxY=map.offsetHeight/this.snack.height
            // 设置小蛇的头坐标
            var headX=this.snack.body[0].x
            var headY=this.snack.body[0].y
            // 横坐标
            if(headX<0||headX>=maxX){
                clearInterval(timeId)
                alert('游戏结束')
            }
            // 纵坐标
            if(headY<0||headY>=maxY){
                clearInterval(timeId)
                alert('游戏结束')
            }
        }.bind(that),150)
    }
    // 为原型添加方法，改变小蛇移动方向
    Game.prototype.bindKey=function(){
        // 获取用户按键，改变小蛇的方向
        document.addEventListener('keydown',function(e){
            switch(e.keyCode){
                case 37:this.snack.direction='left';break;
                case 38:this.snack.direction='top';break;
                case 39:this.snack.direction='right';break;
                case 40:this.snack.direction='bottom';break;
            }
        }.bind(that),false)
    }
    window.Game=Game
}())
// 初始化游戏对象
var gm=new Game(document.querySelector('.map'))
// 初始化游戏
gm.init()
// 创建食物
// var fs=new Food()
// fs.init(document.querySelector('.map'))
// // 创建小蛇
// var snack=new Snack()
// snack.init(document.querySelector('.map'))
// setInterval(function(){
//     snack.move(fs,document.querySelector('.map'))
//     snack.init(document.querySelector('.map'))
// },1000)
// console.log(fs.x+'--'+fs.y)