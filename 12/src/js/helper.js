const piBy180=Math.PI/180
const twoPi=2*Math.PI
const piBy2=Math.PI/2
const piBy4=Math.PI/4
const piBy8=Math.PI/8

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

// Synchronous HTTP Request to get contents
const httpGetText=url=>{
	const request=new XMLHttpRequest()
	request.open('GET',url,false)
	request.send()
	return request.responseText
}

const clamp=(n,min,max)=>Math.min(Math.max(n,min),max)
const lerp=(initial,final,p)=>(1-p)*initial+p*final

// Normalize angle to range [0,2π) or [0,360)
const normalizeAngle={}
{
	const normalizeAngleHOF=constant=>theta=>(theta<0?theta+=Math.ceil(-theta/constant)*constant:theta)%constant
	normalizeAngle.radian=normalizeAngleHOF(twoPi)
	normalizeAngle.degree=normalizeAngleHOF(360)
}

// Angular displacement between 2 angles
// Special case: -180=180
const angularDisplacement={}
{
	const angularDisplacementHOF=(constant,scale)=>(a,b)=>{
		a=normalizeAngle[scale](a)
		b=normalizeAngle[scale](b)
		a-=b
		if(a>constant/2) a-=constant
		else if(a<constant/-2) a+=constant
		return a
	}
	angularDisplacement.radian=angularDisplacementHOF(twoPi,'radian')
	angularDisplacement.degree=angularDisplacementHOF(360,'degree')
}

const getCanvasBlob=canvas=>new Promise(resolve=>canvas.toBlob(blob=>resolve(blob)))
