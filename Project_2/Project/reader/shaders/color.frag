#ifdef GL_ES
precision highp float;
#endif
 
uniform float redFactor;
uniform float greenFactor;
uniform float blueFactor;
uniform float timeFactor;

uniform float saturationTimeFactor;


void main() {
		gl_FragColor =  vec4(redFactor,greenFactor,blueFactor, saturationTimeFactor);
}