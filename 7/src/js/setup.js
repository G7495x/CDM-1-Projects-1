const sizeX=1024
const sizeY=768

const rendererEle=document.getElementById('renderer')
const scrubberEle=document.getElementById('scrubber')
const playbtnEle=document.getElementById('playbtn')
const renderer=new THREE.WebGLRenderer({
	antialias: true,
	canvas: rendererEle,
	alpha: true,
})
const scene=new THREE.Scene()
const camera=new THREE.OrthographicCamera()
const setupRenderer=()=>{
	renderer.setSize(sizeX,sizeY)
	renderer.setPixelRatio(window.devicePixelRatio)

	camera.top=sizeY/2
	camera.right=sizeX/2
	camera.bottom=sizeY/-2
	camera.left=sizeX/-2
	camera.updateProjectionMatrix()
}
window.onresize=()=>setupRenderer()
playbtn.oninput=()=>playbtn.checked?animate():null
const animate=()=>{
	if(playbtn.checked){
		requestAnimationFrame(animate)
		clock+=1/60
		clock%=duration
		scrubberEle.value=clock/duration
	}

	animation()
	renderer.render(scene,camera)
}
window.onload=()=>{
	window.onresize()
	animate()
}
scrubberEle.oninput=()=>{
	clock=scrubberEle.value*duration
	animate()
}

const latLongToSpherical=latLong=>latLong.clone().multiplyScalar(piBy180)
const sphericalToCartesian=phiTheta=>{
	const y=Math.sin(phiTheta.x)
	const radiusAtY=Math.cos(phiTheta.x)
	return new THREE.Vector3(
		Math.cos(phiTheta.y)*radiusAtY,
		y,
		Math.sin(phiTheta.y)*radiusAtY,
	)
}

for(let country in geoData){
	const data=geoData[country]
	data.phiTheta=latLongToSpherical(data.latLong)
	data.xyz=sphericalToCartesian(data.phiTheta)
}
