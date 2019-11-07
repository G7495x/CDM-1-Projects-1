const particleSize=1.5
const particleCount=20000
const sphereRadius=75

camera.position.set(0,0,-500)
camera.lookAt(0,0,0)

let temp=fibonacciSpherePoints(particleCount,sphereRadius)
const sphericalCoordinates=temp[0]
const particleCoordinates=temp[1]
const uvCoordinates=new Float32Array(particleCount*2)
for(let i=0,j=0;i<particleCount;++i){
	uvCoordinates[j]=sphericalCoordinates[j]/Math.PI+.5
	++j
	// sphericalCoordinates[j]=(sphericalCoordinates[j]>0)?
	// 	sphericalCoordinates[j]%=Math.PI:
	// 	Math.PI-(-sphericalCoordinates[j]%Math.PI)
	uvCoordinates[j]=1-sphericalCoordinates[j]%twoPi/twoPi
	++j
}

const triangleVertices=new Float32Array([
	particleSize*Math.sin(  0*piBy180),particleSize*Math.cos(  0*piBy180),0,
	particleSize*Math.sin(120*piBy180),particleSize*Math.cos(120*piBy180),0,
	particleSize*Math.sin(240*piBy180),particleSize*Math.cos(240*piBy180),0,
])
const faces=[0,1,2]
const geometry=new THREE.InstancedBufferGeometry()
geometry.setAttribute('position',new THREE.Float32BufferAttribute(triangleVertices,3))
geometry.setIndex(faces)
geometry.maxInstancedCount=particleCount
// geometry.setAttribute('aPhiTheta',new THREE.InstancedBufferAttribute(sphericalCoordinates,2))
geometry.setAttribute('aOffset',new THREE.InstancedBufferAttribute(particleCoordinates,3))
geometry.setAttribute('aUv',new THREE.InstancedBufferAttribute(uvCoordinates,2))

const uniforms={
	uMap: { value: THREE.ImageUtils.loadTexture('imgs/map.png') },
}
const material=new THREE.ShaderMaterial({
	vertexShader: httpGetText(document.getElementById('vertexShader').src),
	fragmentShader: httpGetText(document.getElementById('fragmentShader').src),
	blending: THREE.AdditiveBlending,
	transparent: true,
	depthTest: false,
	depthWrite: false,
	uniforms,
})
const particles=new THREE.Mesh(geometry,material)
scene.add(particles)
