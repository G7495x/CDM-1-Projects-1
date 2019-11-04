const arcSegCount=90
const sphereRadius=sizeY/4

// Uniforms: Common variables between scripts & shaders (CPU & GPU)
const u={
	uMap:           { value: THREE.ImageUtils.loadTexture('imgs/map.png') },
	uParticleCount: { value: 20000 },
	uParticleSize:  { value: 10 },
	uSphereRadius:  { value: sphereRadius*2 },
}

camera.position.set(0,0,-500)
camera.lookAt(0,0,0)

const group=new THREE.Group()

const particleCoordinates=fibonacciSpherePoints(u.uParticleCount.value)
const particleUvs=new Float32Array(u.uParticleCount.value*2)
for(let i=0,j=0;i<u.uParticleCount.value;++i){
	particleUvs[j]=particleCoordinates.sphericalCoordinates[j]/Math.PI+.5
	++j
	particleUvs[j]=1-particleCoordinates.sphericalCoordinates[j]%twoPi/twoPi
	++j
}

const triangleVertices=new Float32Array([
	u.uParticleSize.value*Math.sin(  0*piBy180),u.uParticleSize.value*Math.cos(  0*piBy180),0,
	u.uParticleSize.value*Math.sin(120*piBy180),u.uParticleSize.value*Math.cos(120*piBy180),0,
	u.uParticleSize.value*Math.sin(240*piBy180),u.uParticleSize.value*Math.cos(240*piBy180),0,
])
const triangleFaces=[0,1,2]
const particlesGeometry=new THREE.InstancedBufferGeometry()
particlesGeometry.setAttribute('position',new THREE.Float32BufferAttribute(triangleVertices,3))
particlesGeometry.setIndex(triangleFaces)
particlesGeometry.maxInstancedCount=u.uParticleCount.value
particlesGeometry.setAttribute('aPhiTheta',new THREE.InstancedBufferAttribute(particleCoordinates.sphericalCoordinates,2))
particlesGeometry.setAttribute('aOffset',new THREE.InstancedBufferAttribute(particleCoordinates.cartesianCoordinates,3))
particlesGeometry.setAttribute('aUv',new THREE.InstancedBufferAttribute(particleUvs,2))

const particlesMaterial=new THREE.ShaderMaterial({
	vertexShader: httpGetText(document.getElementById('vertexShader').src),
	fragmentShader: httpGetText(document.getElementById('fragmentShader').src),
	// blending: THREE.AdditiveBlending,
	// transparent: true,
	// depthTest: false,
	// depthWrite: false,
	uniforms: u,
})
const particleSphere=new THREE.Mesh(particlesGeometry,particlesMaterial)
// group.add(particleSphere)

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

	src=new THREE.Vector3(src[0],src[1],src[2])
	dst=new THREE.Vector3(dst[0],dst[1],dst[2])

	const cross=src.clone().cross(dst).normalize()
	const arcPoints=new Array(arcSegCount+1)
	for(let i=0;i<=arcSegCount;++i)
		arcPoints[i]=src.clone().lerp(dst,i/arcSegCount).normalize().multiplyScalar(sphereRadius)
	// console.log(arcPoints)

	for(let i=0;i<arcSegCount;++i){
		let geometry=new THREE.Geometry()
		geometry.vertices.push(
			arcPoints[i].clone(),
			arcPoints[i+1].clone(),
			arcPoints[i].clone(),
		)
		geometry.faces.push(new THREE.Face3(0,1,2))
		// console.log(geometry.vertices)

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
