    const customVertexShader= /*glsl*/`
    attribute float alpha; 
    attribute float offset; 
    varying float vAlpha; 

    vec3 random3( vec3 p )  
    {
        p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                dot(p,vec3(269.5,183.3,246.1)),
                dot(p,vec3(113.5,271.9,124.6)));

        return -1.0 + 2.0*fract(sin(p)*43758.5453123);
    }
    float noise3d( in vec3 p )
    {
        vec3 i = floor( p );
        vec3 f = fract( p );

        vec3 u = f*f*(3.0-2.0*f);

        return mix( mix( mix( dot( random3( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                            dot( random3( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                        mix( dot( random3( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                            dot( random3( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                    mix( mix( dot( random3( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                            dot( random3( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                        mix( dot( random3( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                            dot( random3( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
    }

    void main() { 
        vAlpha = alpha; 
        float noise= noise3d(normal*random3(position))*offset;
        vec4 mvPosition = modelViewMatrix * vec4( position + vec3(0.0,0.0,noise*10.0), 0.5 ); 
        gl_PointSize = 2.0; 
        gl_Position = projectionMatrix * mvPosition ; 
    }
`;



const customStarVertexShader= /*glsl*/`
attribute float alpha; 
attribute float offset; 
varying float vAlpha; 

vec3 random3( vec3 p )  
{
    p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
            dot(p,vec3(269.5,183.3,246.1)),
            dot(p,vec3(113.5,271.9,124.6)));

    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}
float noise3d( in vec3 p )
{
    vec3 i = floor( p );
    vec3 f = fract( p );

    vec3 u = f*f*(3.0-2.0*f);

    return mix( mix( mix( dot( random3( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                        dot( random3( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                    mix( dot( random3( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                        dot( random3( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                mix( mix( dot( random3( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                        dot( random3( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                    mix( dot( random3( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                        dot( random3( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
}

void main() { 
    
    float noise= noise3d(random3(position))*offset;
    vAlpha = alpha*noise; 
    vec4 mvPosition = modelViewMatrix * vec4( position+ vec3(noise,noise*30.0,noise*10.0), 1 ); 
    gl_PointSize = 4.0; 
    gl_Position = projectionMatrix * mvPosition; 
}
`;

