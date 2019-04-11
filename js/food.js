// 自调用函数-食物的
(function(){
    var elements=[];//用来保存每个小方块食物的
    //食物的特征
    function Food(width,height,color,x,y){
        this.width=width||20;//宽
        this.height=height||20;//高
        this.color=color||'green';//颜色
        this.x=x||0;//横坐标
        this.y=y||0//纵坐标
    };

    // 为原型添加初始化方法（为了在地图显示小方块）
    Food.prototype.init=function(map){
        // 初始化前，先删除一次食物
        remove()
        // 创建小方块
        var div=document.createElement('div');
        // 把小方块放到地图里
        map.appendChild(div)
        // 设置样式
        div.style.width=this.width+'px';
        div.style.height=this.height+'px';
        div.style.backgroundColor=this.color;
        // 脱离文档流
        div.style.position='absolute'
        // 随机横坐标
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width
        // 随机纵坐标
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height
        div.style.left=this.x+'px';
        div.style.top=this.y+'px';
        // 把小方块加入到element数组中
        elements.push(div)
    };

    // 私有函数 删除食物
    function remove(){
        // elements中有这个食物
        for (var i=0;i<elements.length;i++){
            var ele=elements[i];
            // 找到这个元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele)
            // 再把elements中的元素也要删除
            elements.splice(i,1)
        }
    }

    // 把Food暴露给外部，外部可以使用
    window.Food=Food;
}());