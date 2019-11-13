const sphereRadius=sizeY/4
const arcHeight=sphereRadius/8

camera.position.set(500,0,0)
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
directionalLight.position.set(1,1,0)
scene.add(directionalLight)

const ambientLight=new THREE.AmbientLight(0xeeeeee)
scene.add(ambientLight)

const arcs={}
const dotGeometry=new THREE.SphereBufferGeometry(2,9,9)
const dotMaterial=new THREE.MeshBasicMaterial({ color: 0xc90b1c })
const addArc=(s,d)=>{
	const arcSegmentCount=Math.floor(geoData[s].xyz.angleTo(geoData[d].xyz)/piBy180)
	const src=geoData[s].phiTheta
	const dst=geoData[d].phiTheta

	// For arc direction correction with source as china
	if(Math.abs(src.y-dst.y)>Math.PI) dst.y-=Math.PI*2

	const arcPoints=new Array(arcSegmentCount+1)
	const arcDots=new Array(arcSegmentCount+1)
	arcs[d]={}
	arcs[d].points=arcPoints
	arcs[d].dots=arcDots
	for(let i=0;i<=arcSegmentCount;++i){
		arcPoints[i]=sphericalToCartesian(src.clone().lerp(dst,i/arcSegmentCount)).multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegmentCount)*arcHeight)
		arcDots[i]=new THREE.Mesh(dotGeometry,dotMaterial)
		arcDots[i].position.set(...arcPoints[i].toArray())
		arcDots[i].scale.set(0,0,0)
		group.add(arcDots[i])
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
