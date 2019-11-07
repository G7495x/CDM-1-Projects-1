const piBy180=Math.PI/180
const twoPi=2*Math.PI

let isInFullscreen=false
const openFullscreen=(ele=document.body)=>{
	isInFullscreen=true
	if(ele.requestFullscreen)ele.requestFullscreen()
	else if(ele.mozRequestFullScreen)ele.mozRequestFullScreen()
	else if(ele.webkitRequestFullscreen)ele.webkitRequestFullscreen()
	else if(ele.msRequestFullscreen)ele.msRequestFullscreen()
}
const closeFullscreen=()=>{
	isInFullscreen=false
	if(document.exitFullscreen)document.exitFullscreen()
	else if(document.mozCancelFullScreen)document.mozCancelFullScreen()
	else if(document.webkitExitFullscreen)document.webkitExitFullscreen()
	else if(document.msExitFullscreen)document.msExitFullscreen()
}

// Return points on surface of sphere through Fibonacci Algorithm
const fibonacciSpherePoints=(samples=1,radius=1,randomize=false)=>{
	// Translated from Python from https://stackoverflow.com/a/26127012
	const random=randomize?Math.random()*samples:1
	const phiTheta=new Float32Array(samples*2)
	const points=new Float32Array(samples*3)
	const offset=2/samples
	const increment=Math.PI*(3-Math.sqrt(5))
	for(let i=0,j=0,k=0;i<samples;i++){
		const y=((i*offset)-1)+(offset/2)
		const theta=((i+random)%samples)*increment

		phiTheta[j++]=Math.asin(y)
		phiTheta[j++]=theta

		const distance=Math.sqrt(1-Math.pow(y,2))
		const x=Math.cos(theta)*distance
		const z=Math.sin(theta)*distance
		points[k++]=x*radius
		points[k++]=y*radius
		points[k++]=z*radius
	}
	return [phiTheta,points]
}

// Synchronous HTTP Request to get contents
const httpGetText=(url)=>{
	const request=new XMLHttpRequest()
	request.open('GET',url,false)
	request.send()
	return request.responseText
}
