attribute vec3 aOffset;
attribute vec2 aUv;

uniform sampler2D uMap;
uniform float uSphereRadius;

varying vec4 vOpacity;

void main(){
	vOpacity=texture2D(uMap,aUv.yx);
	// float opacity=1.-texture2D(uMap,aUv.yx).x;
	gl_Position=projectionMatrix*(viewMatrix*(modelMatrix*vec4(uSphereRadius*aOffset,1)+vec4(position,1)));
}
