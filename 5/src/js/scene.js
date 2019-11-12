const sphereRadius=sizeY/4
const arcHeight=sphereRadius/8

camera.position.set(0,0,-500)
camera.lookAt(0,0,0)

const group=new THREE.Group()

const sphereGeometry=new THREE.SphereGeometry(sphereRadius,90,90)
const sphereMaterial=new THREE.MeshStandardMaterial({
	color: 0xffffff,
	roughness: 1,
	metalness: 0,
	map: new THREE.TextureLoader().load('imgs/map.png'),
})
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
group.add(sphere)

const directionalLight=new THREE.DirectionalLight(0x272727)
directionalLight.position.set(0,1,-1)
scene.add(directionalLight)

// let ambientLight=new THREE.AmbientLight(0xfffbf0)
// const ambientLight=new THREE.AmbientLight(0xefefef)
const ambientLight=new THREE.AmbientLight(0xeeeeee)
scene.add(ambientLight)

const addArc=(s,d)=>{
	const arcSegCount=Math.floor(geoData[s].xyz.angleTo(geoData[d].xyz)/piBy180)
	const src=geoData[s].phiTheta
	const dst=geoData[d].phiTheta

	if(Math.abs(src.y-dst.y)>Math.PI) dst.y-=Math.PI*2

	const arcPoints=new Array(arcSegCount+1)
	for(let i=0;i<=arcSegCount;++i)
		arcPoints[i]=sphericalToCartesian(src.clone().lerp(dst,i/arcSegCount)).multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegCount)*arcHeight)
		// arcPoints[i]=src.clone().lerp(dst,i/arcSegCount).normalize().multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegCount)*arcHeight)

	// const cross=src.clone().cross(dst).normalize()
	for(let i=0;i<arcSegCount;++i){
		const geometry=new THREE.SphereBufferGeometry(2,9,9)
		const material=new THREE.MeshBasicMaterial({ color: 0xc90b1c })
		const dot=new THREE.Mesh(geometry,material)
		dot.position.set(...arcPoints[i].toArray())
		group.add(dot)
	}
}

addArc('china','indonesia')
addArc('china','thailand')
addArc('china','malaysia')
addArc('china','usa')
addArc('china','singapore')
addArc('china','canada')
addArc('china','philippines')
addArc('china','myanmar')
addArc('china','vietnam')
addArc('china','peru')

scene.add(group)
