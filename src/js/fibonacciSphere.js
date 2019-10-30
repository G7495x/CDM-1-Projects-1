// Return points on surface of sphere through Fibonacci Algorithm
// Translated from Python from https://stackoverflow.com/a/26127012
const fibonacciSpherePoints=(samples=1,radius=1,randomize=false)=>{
	const random=randomize?Math.random()*samples:1
	const sphericalCoordinates=new Float32Array(samples*2)
	const cartesianCoordinates=new Float32Array(samples*3)
	const offset=2/samples
	const increment=Math.PI*(3-Math.sqrt(5))
	for(let i=0,j=0,k=0;i<samples;i++){
		const y=((i*offset)-1)+(offset/2)
		const theta=((i+random)%samples)*increment

		sphericalCoordinates[j++]=Math.asin(y)
		sphericalCoordinates[j++]=theta

		const radiusAtY=Math.sqrt(1-Math.pow(y,2))
		const x=Math.cos(theta)*radiusAtY
		const z=Math.sin(theta)*radiusAtY
		cartesianCoordinates[k++]=x*radius
		cartesianCoordinates[k++]=y*radius
		cartesianCoordinates[k++]=z*radius
	}
	return {sphericalCoordinates,cartesianCoordinates}
}
