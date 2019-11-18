const sizeX=1024
const sizeY=768
const frameRate=30

const rendererEle=document.getElementById('renderer')
const scrubberEle=document.getElementById('scrubber')
const playbtnEle=document.getElementById('playbtn')
const renderer=new THREE.WebGLRenderer({
	antialias: true,
	canvas: rendererEle,
	alpha: true,
	preserveDrawingBuffer: true,
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
let record=false
const animate=()=>{
	if(playbtn.checked){
		clock+=1/frameRate
		if(clock>=duration){
			playbtn.checked=false
			clock=scrubberEle.value=0
		}else{
			scrubberEle.value=clock*frameRate
			if(!record) requestAnimationFrame(animate)
		}
	}

	animation()
	renderer.render(scene,camera)

	if(playbtn.checked && record){
		getCanvasBlob(rendererEle).then(blob=>{
			zip.file(scrubberEle.value+'.png',blob)
			requestAnimationFrame(animate)
		})
	}
}
window.onload=()=>{
	window.onresize()
	animate()
}
scrubberEle.oninput=()=>{
	clock=scrubberEle.value/frameRate
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

const zip=new JSZip()
const downloadZip=()=>zip.generateAsync({type:'blob'}).then(content=>saveAs(content,'frames.zip'))
const skippedFrames=()=>{
	const a=[]
	for(i=0;i<frameCount;++i) if(!zip.files[i+'.png']) a.push(i)
	return a
}
