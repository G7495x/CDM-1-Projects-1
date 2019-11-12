const sizeX=1024
const sizeY=768

const rendererEle=document.getElementById('renderer')
const scrubberEle=document.getElementById('scrubber')
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
	// requestAnimationFrame(animate)
	animation()
	renderer.render(scene,camera)
}
window.onload=()=>{
	window.onresize()
	animate()
}

const latLongToSpherical=latLong=>new THREE.Vector2(latLong.x*piBy180,latLong.y*piBy180)
const sphericalToCartesian=phiTheta=>{
	const cartesian=new THREE.Vector3()

	const y=Math.sin(phiTheta.x)
	const radiusAtY=Math.cos(phiTheta.x)
	cartesian.x=Math.cos(phiTheta.y)*radiusAtY
	cartesian.y=y
	cartesian.z=Math.sin(phiTheta.y)*radiusAtY
	return cartesian
}

for(let country in geoData){
	const data=geoData[country]
	data.phiTheta=latLongToSpherical(data.latLong)
	data.xyz=sphericalToCartesian(data.phiTheta)
}
