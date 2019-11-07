const viewportSize=200
const frameRate=60

let time=0
const viewportSemiSize=viewportSize/2
const rendererEle=document.getElementById('renderer')
const renderer=new THREE.WebGLRenderer({
	antialias: true,
	canvas: rendererEle,
	alpha: true,
})
const scene=new THREE.Scene()
const camera=new THREE.OrthographicCamera()
const setupRenderer=()=>{
	let viewportWidth=rendererEle.offsetWidth
	let viewportHeight=rendererEle.offsetHeight

	renderer.setSize(viewportWidth,viewportHeight)
	renderer.setPixelRatio(window.devicePixelRatio)

	viewportWidth=viewportWidth/viewportHeight*viewportSemiSize
	viewportHeight=viewportSemiSize
	camera.top=viewportHeight
	camera.right=viewportWidth
	camera.bottom=-viewportHeight
	camera.left=-viewportWidth
	camera.updateProjectionMatrix()
}
window.onresize=()=>setupRenderer()
const animate=()=>{
	requestAnimationFrame(animate)

	particles.rotation.y=time/250

	renderer.render(scene,camera)
	++time
}
window.onload=()=>{
	window.onresize()
	animate()
}
