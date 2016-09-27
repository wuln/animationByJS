/*获取样式*/
function getStyle(obj,attr) {
 	if (obj.currentStyle) {
 		return obj.currentStyle[attr];
 	} else {
 		return getComputedStyle(obj,false)[attr];
 	}
 } 
/*obj:要运动的DOM对象
json:动画效果eg：{width:200,height:200,opacity:100}
fn:回调函数
*/
function startMove(obj,json,fn) {	
	clearInterval(obj.timer);
	obj.timer=setInterval(function() {
		var flag=true;
		for (var attr in json) {
			var icur;
			if (attr=='opacity') {
				icur=Math.round(parseFloat(getStyle(obj,attr))*100);
			} else {
				icur=parseInt(getStyle(obj,attr));
			}			
			var speed=(json[attr]-icur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if (icur!=json[attr]) {
				flag=false;				
			} 
			if (attr=='opacity') {
				obj.style.filter='alpha(opacity:'+(icur+speed)+')';
				obj.opacity=(icur+speed)/100;
			} else {
				obj.style[attr]=icur+speed+'px';
			}						
		}	
		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}	
	},30);	
}

