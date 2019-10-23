attribute vec3 aOffset;
attribute vec2 aUv;

uniform sampler2D uMap;

void main(){
	float opacity=1.-texture2D(uMap,aUv.yx).x;
	// float opacity=1.-texture2D(uMap,aUv).x;
	gl_Position=projectionMatrix*(viewMatrix*(modelMatrix*vec4(aOffset,1)+vec4(position*opacity,1)));
}
