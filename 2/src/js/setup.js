const sizeX=1024
const sizeY=768
const frameRate=60

let time=0
const rendererEle=document.getElementById('renderer')
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
const animate=()=>{
	requestAnimationFrame(animate)

	group.rotation.y=time/250

	renderer.render(scene,camera)
	++time
}
window.onload=()=>{
	window.onresize()
	animate()
}

const latLongToSpherical=latLong=>new Float32Array([latLong[0]*piBy180,latLong[1]*piBy180])
const sphericalToCartesian=phiTheta=>{
	const cartesian=new Float32Array(3)

	const y=Math.sin(phiTheta[0])
	const radiusAtY=Math.cos(phiTheta[0])
	cartesian[0]=Math.cos(phiTheta[1])*radiusAtY
	cartesian[1]=y
	cartesian[2]=Math.sin(phiTheta[1])*radiusAtY
	return cartesian
}

for(var country in geoData){
	const data=geoData[country]
	data.phiTheta=latLongToSpherical(data.latLong)
	data.xyz=sphericalToCartesian(data.phiTheta)
}
