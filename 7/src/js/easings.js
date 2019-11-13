// Src: http://www.gizma.com/eaMath.sing/#cub2

// t=Time
// b=Start Value
// c=Change in Value
// d=Duration

linearTween=(t,b=0,c=1,d=1)=>c*t/d+b

easeInQuad=(t,b=0,c=1,d=1)=>{
	t/=d
	return c*t*t+b
}

easeOutQuad=(t,b=0,c=1,d=1)=>{
	t/=d
	return -c*t*(t-2)+b
}

easeInOutQuad=(t,b=0,c=1,d=1)=>{
	t/=d/2
	if(t<1) return c/2*t*t+b
	t--
	return -c/2*(t*(t-2)-1)+b
}

easeInCubic=(t,b=0,c=1,d=1)=>{
	t/=d
	return c*t*t*t+b
}

easeOutCubic=(t,b=0,c=1,d=1)=>{
	t/=d
	t--
	return c*(t*t*t+1)+b
}

easeInOutCubic=(t,b=0,c=1,d=1)=>{
	t/=d/2
	if(t<1) return c/2*t*t*t+b
	t-=2
	return c/2*(t*t*t+2)+b
}

easeInQuart=(t,b=0,c=1,d=1)=>{
	t/=d
	return c*t*t*t*t+b
}

easeOutQuart=(t,b=0,c=1,d=1)=>{
	t/=d
	t--
	return -c*(t*t*t*t-1)+b
}

easeInOutQuart=(t,b=0,c=1,d=1)=>{
	t/=d/2
	if(t<1) return c/2*t*t*t*t+b
	t-=2
	return -c/2*(t*t*t*t-2)+b
}
easeInQuint=(t,b=0,c=1,d=1)=>{
	t/=d
	return c*t*t*t*t*t+b
}

easeOutQuint=(t,b=0,c=1,d=1)=>{
	t/=d
	t--
	return c*(t*t*t*t*t+1)+b
}

easeInOutQuint=(t,b=0,c=1,d=1)=>{
	t/=d/2
	if(t<1) return c/2*t*t*t*t*t+b
	t-=2
	return c/2*(t*t*t*t*t+2)+b
}

easeInSine=(t,b=0,c=1,d=1)=>-c*Math.cos(t/d*(Math.PI/2))+c+b

easeOutSine=(t,b=0,c=1,d=1)=>c*Math.sin(t/d*(Math.PI/2))+b

easeInOutSine=(t,b=0,c=1,d=1)=>-c/2*(Math.cos(Math.PI*t/d)-1)+b

easeInExpo=(t,b=0,c=1,d=1)=>c*Math.pow(2,10*(t/d-1))+b

easeOutExpo=(t,b=0,c=1,d=1)=>c*(-Math.pow(2,-10*t/d)+1)+b

easeInOutExpo=(t,b=0,c=1,d=1)=>{
	t/=d/2
	if(t<1) return c/2*Math.pow(2,10*(t-1))+b
	t--
	return c/2*(-Math.pow(2,-10*t)+2)+b
}

easeInCirc=(t,b=0,c=1,d=1)=>{
	t/=d
	return -c*(sqrt(1-t*t)-1)+b
}

easeOutCirc=(t,b=0,c=1,d=1)=>{
	t/=d
	t--
	return c*sqrt(1-t*t)+b
}

easeInOutCirc=(t,b=0,c=1,d=1)=>{
	t/=d/2
	if(t<1) return -c/2*(sqrt(1-t*t)-1)+b
	t-=2
	return c/2*(sqrt(1-t*t)+1)+b
}
