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

// Synchronous HTTP Request to get contents
const httpGetText=(url)=>{
	const request=new XMLHttpRequest()
	request.open('GET',url,false)
	request.send()
	return request.responseText
}
