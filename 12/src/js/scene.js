const sphereRadius=sizeY/4
const arcHeight=sphereRadius/8

camera.position.set(768,0,0)
camera.lookAt(0,0,0)

const groupContainer2=new THREE.Object3D()
scene.add(groupContainer2)

const groupContainer=new THREE.Object3D()
groupContainer2.add(groupContainer)

const group=new THREE.Group()

const sphereGeometry=new THREE.SphereBufferGeometry(sphereRadius,90,90)
const sphereMaterial=new THREE.MeshStandardMaterial({
	color: 0xffffff,
	roughness: 1,
	metalness: 0,
	map: new THREE.TextureLoader().load('imgs/map3.png'),
})
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
group.add(sphere)

const directionalLight=new THREE.DirectionalLight(new THREE.Color('hsl(0,0%,25%)'))
directionalLight.position.set(1,1,.001)
scene.add(directionalLight)

const ambientLight=new THREE.AmbientLight(new THREE.Color('hsl(0,0%,95%)'))
scene.add(ambientLight)

const arcs={}
const dotGeometry=new THREE.SphereBufferGeometry(1.25,9,9)
// const dotMaterial=new THREE.MeshBasicMaterial({ color: 0xDC8130 })
// const dotMaterial=new THREE.MeshLambertMaterial({ color: 0xFFCF00 })
// const dotMaterial=new THREE.MeshLambertMaterial({ color: 0xCCA600 })
// const dotMaterial=new THREE.MeshLambertMaterial({ color: 0x007C99 })
// const dotMaterial=new THREE.MeshLambertMaterial({ color: new THREE.Color('hsl(207,45%,40%)') })
const dotMaterial=new THREE.MeshLambertMaterial({ color: new THREE.Color('hsl(0,0%,25%)') })
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

const addArc=(src,dst)=>{
  const arc=[]
  arcs[src]=arc
  src=geoData[src].xyz
	dst=geoData[dst].xyz

	const arcSegCount=Math.floor(src.angleTo(dst)/piBy180)*4
	const arcPoints=new Array(arcSegCount+1)
	for(let i=0;i<=arcSegCount;++i)
		arcPoints[i]=src.clone().lerp(dst,i/arcSegCount).normalize().multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegCount)*arcHeight)

	// const cross=src.clone().cross(dst).normalize()
  for(let i=0;i<arcSegCount;++i){
		arc[i]=new THREE.Mesh(dotGeometry,dotMaterial)
		arc[i].position.set(...arcPoints[i].toArray())
		// const scale=i/arcSegCount+1
		// const scale=2
		// arc[i].scale.set(scale,scale,scale)
		group.add(arc[i])
	}
}

for(let c of countries)
  addArc(c,'Vancouver')

const pins={}
for(let c of cities){
  const spriteMap=new THREE.TextureLoader().load('imgs/pin.png')
  const spriteMaterial=new THREE.SpriteMaterial({
    map: spriteMap
  })
  const sprite=new THREE.Sprite(spriteMaterial)
  sprite.position.copy(geoData[c].xyz.clone().multiply(new THREE.Vector3(200,180,200)))
  sprite.scale.set(0.0001,0.0001,1)
  group.add(sprite)
  pins[c]=sprite
}

for(let c in geoData)
	geoData[c].phiTheta=latLongToSpherical(geoData[c].latLong)
console.log(geoData)

groupContainer.add(group)
