//虚拟数据json
    var data = [{
        "src": "1.png",
        "title": "第一怪 竹筒当烟袋"
    }, {
        "src": "2.png",
        "title": "第二怪 草帽当锅盖"
    }, {
        "src": "3.png",
        "title": "第三怪 这边下雨那边晒"
    }, {
        "src": "4.png",
        "title": "第四怪 四季服装同穿戴"
    }, {
        "src": "5.png",
        "title": "第五怪 火车没有汽车快"
    }, {
        "src": "6.png",
        "title": "第六怪 火车不通国内通国外"
    }, {
        "src": "7.png",
        "title": "第七怪 老奶爬山比猴快"
    }, {
        "src": "8.png",
        "title": "第八怪 鞋子后面多一块"
    }, {
        "src": "9.png",
        "title": "第九怪 脚趾四季露在外"
    }, {
        "src": "10.png",
        "title": "第十怪 鸡蛋拴着卖"
    }, {
        "src": "11.png",
        "title": "第十一怪 粑粑叫饵块"
    }, {
        "src": "12.png",
        "title": "第十二怪 花生蚕豆数着卖"
    }, {
        "src": "13.png",
        "title": "第十三怪 三个蚊子一盘菜"
    }, {
        "src": "14.png",
        "title": "第十四怪 四个老鼠一麻袋"
    }, {
        "src": "15.png",
        "title": "第十五怪 树上松毛扭着卖"
    }, {
        "src": "16.png",
        "title": "第十六怪 姑娘叫老太"
    }, {
        "src": "17.png",
        "title": "第十七怪 小和尚可以谈恋爱"
    }, {
        "src": "18.png",
        "title": "第十八怪 背着娃娃谈恋爱"
    }];

function waterfall(wrap,boxes){
	//获取到屏幕的宽度
	var windowWidth=$(window).width();
	//boxWidth中的width()方法只能获取盒子内容的宽度，所以后面要加上内外边距的宽度
	var boxWidth= boxes.eq(0).width()+40;
	var colsMath=Math.floor( windowWidth/boxWidth);


	//设置盒子的宽度
	 wrap.width(boxWidth*colsMath);
	/* console.log(wrapWidth);*/
	//定义一个数组，获取每一列的高度
	var everyHeight=new Array();
	//将盒子的高度进行遍历，将他们所在列的高度存到everyHeight数组中
	for(var i=0;i<boxes.length;i++){
		//获取第一行的，每个盒子的高度
		if(i<colsMath){
             everyHeight[i]=boxes.eq(i).height()+40;
		}else{
			//获取到最小列的高度
			var minHeight=Math.min.apply(null,everyHeight);
			//获取最小列高度的索引
			var minIndex=getIndex(minHeight,everyHeight);
			//获取到盒子距离左边的宽度，找到最小列盒子的位置；
			var leftVal=boxes.eq(minIndex).position().left;
			//将下一个盒子追加在最低盒子的下面
			setStyle(boxes.eq(i),minHeight,leftVal,i);
		/*	boxes.eq(i).css({
				'position':'absolute',
				'left':leftVal,
				'top':minHeight,				
			})*/
		    //更新列的高度
		    everyHeight[minIndex]+=boxes.eq(i).height()+40;
			
		}
	}

}
//数据请求检验
function getCheck(wrap){
	//获取到文档的高度
	var documentHeight=$(window).height();
	//获取到文档向上滚动的高度
	var documentScrollTop=$(window).scrollTop();
	//获取到最后一个盒子的高度
	var boxes=wrap.children('div');
	var lastBoxTop=boxes.eq(boxes.length-1).offset().top;
	var lastHeight=boxes.eq(boxes.length-1).height()+20;
	var lastColHeight=lastBoxTop+lastHeight;
	return lastColHeight<=documentHeight+documentScrollTop? true : false;
	

}

//设置追加盒子样式函数
var getStartNum=0;
function setStyle(box,top,left,index){

	if(getStartNum>=index){
		return false;
	}
	box.css({
       'position':'absolute',
	   'left':left,
		'top':top,
		'opacity':0
	}).stop().animate({
        'opacity':1
	},1000)
  getStartNum=index;

}

//获取最小列高度的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){

		if(everyHeight[index] == minHeight ){
			return index;
		}

	}
}
// 追加盒子函数
  function appendBox(wrap){
     	if(getCheck(wrap)){
		//对json数组进行遍历
    for (i in data){
    	//当文档滚动，在盒子的后面追加盒子
    var innerString='<div><img src="img/'+data[i].src+'"><a href="http://www.imooc.com" target="_blank">'+data[i].title+'</a></div>';
    wrap.append(innerString);
    }
	}else{
		return false;
	};
    
      waterfall(wrap,wrap.children('div'));
  }


$(function(){
	//通过$()查找到容器和盒子
var wrap=$('.wrap');
var boxes=$('.wrap').children();

  waterfall(wrap,boxes)
  $(this).scroll(function(){
      appendBox(wrap)
  })


})