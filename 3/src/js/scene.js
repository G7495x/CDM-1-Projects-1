const sphereRadius=sizeY/4
const arcHeight=sphereRadius/10

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

const directionalLight=new THREE.DirectionalLight(0xffffff)
directionalLight.position.set(0,1,-1)
scene.add(directionalLight)

// let ambientLight=new THREE.AmbientLight(0xfffbf0)
const ambientLight=new THREE.AmbientLight(0xefefef)
scene.add(ambientLight)

const addArc=(src,dst)=>{
	src=geoData[src].xyz
	dst=geoData[dst].xyz

	const arcSegCount=Math.floor(src.angleTo(dst)/piBy180)
	const arcPoints=new Array(arcSegCount+1)
	for(let i=0;i<=arcSegCount;++i)
		arcPoints[i]=src.clone().lerp(dst,i/arcSegCount).normalize().multiplyScalar(sphereRadius+Math.sin(Math.PI*i/arcSegCount)*arcHeight)

	const cross=src.clone().cross(dst).normalize()
	for(let i=0;i<arcSegCount;++i){
		let geometry=new THREE.Geometry()
		geometry.vertices.push(
			arcPoints[i].clone().add(cross.clone().multiplyScalar(5)),
			arcPoints[i+1].clone(),
			arcPoints[i].clone().add(cross.clone().multiplyScalar(-5)),
		)
		geometry.faces.push(new THREE.Face3(0,1,2))

		let material=new THREE.MeshBasicMaterial({
			color: 0xff0000,
			side: THREE.DoubleSide,
		})
		material.wireframe=true
		let mesh=new THREE.Mesh(geometry,material)
		group.add(mesh)
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
