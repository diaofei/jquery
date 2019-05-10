
//获取非行内样式
function getStyle(obj,attr){
	return window.getComputedStyle ? getComputedStyle(obj,1)[attr] : obj.currentStyle[attr];
}
//准完美运动框架
//{width : 400,height : 400,opacity : 30}
function sport_09(obj,json,fn){
	//1. 清除上一次的计时器
	clearInterval(obj.timer);
	//2. 开启新的计时器
	obj.timer = setInterval(()=>{
		//1. 设置开关
		let stop = true; //假设对象中所有的属性都已到达目标值
		//2.遍历对象
		for(let attr in json){
			//1. 获取当前值     '0.34567'  0.34567    34.567   34
			let cur = attr === 'opacity' ? parseInt(parseFloat(getStyle(obj,attr)) * 100) : parseInt(getStyle(obj,attr));
			//2. 计算速度
			let speed = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//3. 检测是否全部到达目标
			if(cur !== json[attr]){
				stop = false;
			}
			//4. 设置运动
			if(attr === 'opacity'){
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
			}else{
				obj.style[attr] = cur + speed + 'px';
			}
			
		}
		//3. 停止计时器
		if(stop){
			clearInterval(obj.timer);
			if(typeof fn === 'function'){
				fn();
			}
		}
	},30)
}