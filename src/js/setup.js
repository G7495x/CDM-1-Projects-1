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

	particleSphere.rotation.y=time/250

	renderer.render(scene,camera)
	++time
}
window.onload=()=>{
	window.onresize()
	animate()
}
