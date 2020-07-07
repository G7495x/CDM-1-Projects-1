const sphereRadius=sizeY/4
const arcHeight=sphereRadius/8

camera.position.set(768,0,0)
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

const directionalLight=new THREE.DirectionalLight(0xFFFFFF)
directionalLight.position.set(1,1,.0001)
scene.add(directionalLight)

const ambientLight=new THREE.AmbientLight(0xEFEFEF)
scene.add(ambientLight)

const arcs=[{},{}]
const dotGeometry=new THREE.SphereBufferGeometry(2,9,9)
// const dotMaterial=new THREE.MeshBasicMaterial({ color: 0xDC8130 })
// const dotMaterial=new THREE.MeshLambertMaterial({ color: 0xFFCF00 })
// const dotMaterial=new THREE.MeshLambertMaterial({ color: 0xCCA600 })
const dotMaterial=new THREE.MeshLambertMaterial({ color: 0x997C00 })
// const dotMaterial=new THREE.MeshBasicMaterial({ color: 0x000000 })

// const addArc=(arcs,s,d)=>{
// 	const arcSegmentCount=Math.floor(geoData[s].xyz.angleTo(geoData[d].xyz)/piBy180)*5
// 	const src=geoData[s].phiTheta
// 	const dst=geoData[d].phiTheta

// 	// For arc direction correction with source as china
// 	if(Math.abs(src.y-dst.y)>Math.PI) dst.y-=Math.PI*2

// 	const arcPoints=new Array(arcSegmentCount+1)
// 	const arcDots=new Array(arcSegmentCount+1)
// 	arcs[d]={}
// 	arcs[d].points=arcPoints
// 	arcs[d].dots=arcDots
// 	for(let i=0;i<=arcSegmentCount;++i){
// 		arcPoints[i]=sphericalToCartesian(src.clone().lerp(dst,i/arcSegmentCount)).multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegmentCount)*arcHeight)
// 		arcDots[i]=new THREE.Mesh(dotGeometry,dotMaterial)
// 		arcDots[i].position.set(...arcPoints[i].toArray())
// 		arcDots[i].scale.set(2,2,2)
// 		group.add(arcDots[i])
// 	}
// }

const addArc=(arcs,src,dst)=>{
	src=geoData[src].xyz
	dst=geoData[dst].xyz

	const arcSegCount=Math.floor(src.angleTo(dst)/piBy180)*5
	const arcPoints=new Array(arcSegCount+1)
	for(let i=0;i<=arcSegCount;++i)
		arcPoints[i]=src.clone().lerp(dst,i/arcSegCount).normalize().multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegCount)*arcHeight)

	const cross=src.clone().cross(dst).normalize()
	for(let i=0;i<arcSegCount;++i){
		const dot=new THREE.Mesh(dotGeometry,dotMaterial)
		dot.position.set(...arcPoints[i].toArray())
		// const scale=i/arcSegCount+1
		const scale=2
		dot.scale.set(scale,scale,scale)
		group.add(dot)
	}
}

// addArc(arcs[0],'guangdong','indonesia')
// addArc(arcs[0],'guangdong','thailand')
// addArc(arcs[0],'guangdong','malaysia')
// addArc(arcs[0],'guangdong','usa')
// addArc(arcs[0],'guangdong','singapore')
// addArc(arcs[0],'guangdong','canada')
// addArc(arcs[0],'guangdong','philippines')
// addArc(arcs[0],'guangdong','myanmar')
// addArc(arcs[0],'guangdong','vietnam')
// addArc(arcs[0],'guangdong','peru')
// addArc(arcs[0],'guangdong','australia')
// addArc(arcs[0],'guangdong','japan')
// addArc(arcs[0],'guangdong','russia')
// addArc(arcs[0],'guangdong','france')
// addArc(arcs[0],'guangdong','uk')

for(let country in geoData) geoData[country].phiTheta=latLongToSpherical(geoData[country].latLong)

// addArc(arcs[1],'china','indonesia')
// addArc(arcs[1],'china','thailand')
// addArc(arcs[1],'china','malaysia')
// addArc(arcs[1],'china','usa')
// addArc(arcs[1],'china','singapore')
// addArc(arcs[1],'china','canada')
// addArc(arcs[1],'china','philippines')
// addArc(arcs[1],'china','myanmar')
// addArc(arcs[1],'china','vietnam')
addArc(arcs[1],'china','peru')
// addArc(arcs[1],'china','australia')
// addArc(arcs[1],'china','japan')
// addArc(arcs[1],'china','russia')
// addArc(arcs[1],'china','france')
// addArc(arcs[1],'china','uk')
// addArc(arcs[1],'china','southAfrica')

for(let country in geoData) geoData[country].phiTheta=latLongToSpherical(geoData[country].latLong)

scene.add(group)
