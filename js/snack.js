// 自调用函数-小蛇
(function(){
    var elements=[]//存放小蛇
    // 小蛇的构造函数
    function Snack(width,height,direction){
        // 小蛇的宽高
        this.width=width||20;
        this.height=height||20;
        // 小蛇的身体
        this.body=[
            {x:3,y:2,color:'red'},//头
            {x:2,y:2,color:'orange'},//身体
            {x:1,y:2,color:'orange'}//尾巴
        ]
        // 方向
        this.direction=direction||'right'
    }

    // 为原型添加方法-小蛇初始化的方法
    Snack.prototype.init=function(map){
        // 先删除之前的小蛇
        remove()
        // 循环遍历创建div
        for(var i=0;i<this.body.length;i++){
            // 数组中每个元素都是一个对象
            var obj=this.body[i];
            // 创建div
            var div=document.createElement('div');
            // 把div放到map中
            map.appendChild(div)
            // 设置div样式
            div.style.position='absolute'
            div.style.width=this.width+'px'
            div.style.height=this.height+'px'
            div.style.left=obj.x*this.width+'px'
            div.style.top=obj.y*this.height+'px'
            div.style.backgroundColor=obj.color
            // 把div放入数组中，目的是删除
            elements.push(div)
        }
    }

    // 为原型添加方法-让小蛇动起来
    Snack.prototype.move=function(food,map){
        // 改变小蛇身体的坐标位置
        var i=this.body.length-1//2
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x//尾巴的x坐标跑到身体的x坐标
            this.body[i].y=this.body[i-1].y//尾巴的y坐标跑到身体的y坐标
        }
        // 判断方向-改变小蛇的头坐标位置
        switch(this.direction){
            case 'right':
                this.body[0].x+=1;
                break;
            case 'left':
                this.body[0].x-=1;
                break;
            case 'top':
                this.body[0].y-=1;
                break;
            case 'bottom':
                this.body[0].y+=1;
                break;
        }
        // 判断有没有吃到食物
        // 小蛇的头的坐标和食物的坐标一致
        var headX=this.body[0].x*this.width
        var headY=this.body[0].y*this.height
        if(headX==food.x&&headY==food.y){
            // 获取小蛇最后的尾巴
            var last=this.body[this.body.length-1]
            // 把最后的蛇尾重新复制一下，加入到蛇的body中
            this.body.push({x:last.x,y:last.y,color:last.color})
            // 把食物删除，重新初始化食物
            food.init(map)
        }
    }
    // 私有函数-删除小蛇
    function remove(){
        var i=elements.length-1//获取小蛇在数组的下标
        for(;i>=0;i--){
            // 先从当前子元素找到该子元素的父元素，再从父元素找到子元素
            var ele=elements[i]
            ele.parentNode.removeChild(ele)
            // 删除数组中的小蛇
            elements.splice(i,1)
        }
    }
    window.Snack=Snack
}());