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
const dotGeometry=new THREE.SphereBufferGeometry(.5,9,9)
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
	src=geoData[src].xyz
	dst=geoData[dst].xyz

	const arcSegCount=Math.floor(src.angleTo(dst)/piBy180)*4
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

// // addArc('North Vancouver'       ,'Vancouver')
// addArc('Oakland'               ,'Vancouver')
// // addArc('Oliver'                ,'Vancouver')
// // addArc('Calgary'               ,'Vancouver')
// // addArc('Edmonton'              ,'Vancouver')
// addArc('León'                  ,'Vancouver')
// addArc('Toronto'               ,'Vancouver')
// addArc('Bogotá'                ,'Vancouver')
// addArc('São Paulo'             ,'Vancouver')
// addArc('Polinyà de Xúquer'     ,'Vancouver')
// addArc('London'                ,'Vancouver')
// addArc('Beersheba'             ,'Vancouver')
// addArc("Modi'in-Maccabim-Re'ut",'Vancouver')
// addArc('Manama'                ,'Vancouver')
// addArc('Tehran'                ,'Vancouver')
// addArc('Shiraz'                ,'Vancouver')
// addArc('Mumbai'                ,'Vancouver')
// addArc('Delhi'                 ,'Vancouver')
// addArc('Bangalore'             ,'Vancouver')
// addArc('Dhaka'                 ,'Vancouver')
// addArc('Bangkok'               ,'Vancouver')
// addArc('Chengdu'               ,'Vancouver')
// addArc('Loudi'                 ,'Vancouver')
// addArc('Taiyuan'               ,'Vancouver')
// addArc('Guangzhou'             ,'Vancouver')
// addArc('Zhuhai'                ,'Vancouver')
// addArc('Hong Kong'             ,'Vancouver')
// addArc('Beijing'               ,'Vancouver')
// addArc('Hefei'                 ,'Vancouver')
// // addArc('Tianjin'               ,'Vancouver') // Close to Beijing
// addArc('Nanjing'               ,'Vancouver')
// addArc('Wuxi'                  ,'Vancouver')
// addArc('Qingdao'               ,'Vancouver')
// addArc('Nantong'               ,'Vancouver')
// // addArc('Hsinchu'               ,'Vancouver')
// addArc('Manila'                ,'Vancouver')
// addArc('Shanghai'              ,'Vancouver')
// addArc('Taipei'                ,'Vancouver')
// addArc('Seoul'                 ,'Vancouver')
// addArc('Mudanjiang'            ,'Vancouver')
// addArc('Jixi'                  ,'Vancouver')

// addArc('Canada'					,'Vancouver')
addArc('Mexico'					,'Vancouver')
addArc('USA'						,'Vancouver')
addArc('Colombia'				,'Vancouver')
addArc('Brazil'					,'Vancouver')
addArc('Spain'					,'Vancouver')
addArc('United Kingdom'	,'Vancouver')
addArc('Israel'					,'Vancouver')
addArc('Bahrain'				,'Vancouver')
addArc('Iran'						,'Vancouver')
addArc('India'					,'Vancouver')
addArc('Bangladesh'			,'Vancouver')
addArc('Thailand'				,'Vancouver')
addArc('China'					,'Vancouver')
addArc('Taiwan'					,'Vancouver')
addArc('Philippines'		,'Vancouver')
addArc('South Korea'		,'Vancouver')

for(let c in geoData)
	geoData[c].phiTheta=latLongToSpherical(geoData[c].latLong)
console.log(geoData)

groupContainer.add(group)
