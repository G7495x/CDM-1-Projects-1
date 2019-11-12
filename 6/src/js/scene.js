const sphereRadius=sizeY/4
const arcHeight=sphereRadius/8

camera.position.set(0,0,-500)
camera.lookAt(0,0,0)

const group=new THREE.Group()

const sphereGeometry=new THREE.SphereBufferGeometry(sphereRadius,90,90)
const sphereMaterial=new THREE.MeshStandardMaterial({
	color: 0xffffff,
	roughness: 1,
	metalness: 0,
	map: new THREE.TextureLoader().load('imgs/map.png'),
})
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
group.add(sphere)

for(let country in geoData){
	const sphereMaterial=new THREE.MeshStandardMaterial({
		roughness: 1,
		metalness: 0,
		transparent: true,
		map: new THREE.TextureLoader().load('imgs/'+country+'.png'),
		opacity: 0,
	})
	const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
	group.add(sphere)
	geoData[country].material=sphereMaterial
	geoData[country].sphere=sphere
}

const directionalLight=new THREE.DirectionalLight(0x272727)
directionalLight.position.set(0,1,-1)
scene.add(directionalLight)

const ambientLight=new THREE.AmbientLight(0xeeeeee)
scene.add(ambientLight)

const arc={}
const addArc=(s,d)=>{
	const arcSegCount=Math.floor(geoData[s].xyz.angleTo(geoData[d].xyz)/piBy180)
	const src=geoData[s].phiTheta
	const dst=geoData[d].phiTheta

	if(Math.abs(src.y-dst.y)>Math.PI) dst.y-=Math.PI*2

	const arcPoints=new Array(arcSegCount+1)
	arc[d]={}
	arc[d].points=arcPoints
	for(let i=0;i<=arcSegCount;++i)
		arcPoints[i]=sphericalToCartesian(src.clone().lerp(dst,i/arcSegCount)).multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegCount)*arcHeight)

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
