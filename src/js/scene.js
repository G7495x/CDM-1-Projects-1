// Uniforms: Common variables between scripts & shaders (CPU & GPU)
const u={
	uMap:           { value: THREE.ImageUtils.loadTexture('imgs/map.png') },
	uParticleCount: { value: 20000 },
	uParticleSize:  { value: 1.5 },
	uSphereRadius:  { value: 75 },
}

camera.position.set(0,0,-500)
camera.lookAt(0,0,0)

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
scene.add(particleSphere)
