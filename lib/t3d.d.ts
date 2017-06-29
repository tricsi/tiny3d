/**
 * Tiny 3D library
 */
declare namespace T3D {
    /**
     * Radiant scale
     */
    const RAD_SCALE: number;
    /**
     * Vector 3 math
     */
    class Vec3 {
        x: number;
        y: number;
        z: number;
        constructor(x?: number, y?: number, z?: number);
        set(x?: number, y?: number, z?: number): Vec3;
        add(vec: Vec3): Vec3;
        sub(vec: Vec3): Vec3;
        dot(vec: Vec3): number;
        cross(vec: Vec3): Vec3;
        length(): number;
        scale(scale: any): Vec3;
        normalize(): this;
        clone(): Vec3;
        invert(): Vec3;
        toArray(): Array<number>;
    }
    /**
     * 3x3 matrix math
     */
    class Mat3 {
        data: Array<number>;
        constructor(data?: Array<number>);
        transpose(): Mat3;
    }
    /**
     * 4x4 matrix math
     */
    class Mat4 {
        data: Array<number>;
        constructor(data?: Array<number>);
        clone(): Mat4;
        multiply(b: Array<number>): Mat4;
        scale(vec: Vec3): Mat4;
        translate(vec: Vec3): Mat4;
        rotateX(angle: number): Mat4;
        rotateY(angle: number): Mat4;
        rotateZ(angle: number): Mat4;
        rotate(vec: Vec3): Mat4;
        perspective(fov: number, aspect: number, near: number, far: number): Mat4;
        invert(): Mat3;
    }
    /**
     * Transform class
     */
    class Transform {
        scale: Vec3;
        rotate: Vec3;
        translate: Vec3;
        parent: Transform;
        constructor(data?: Array<number>);
        matrix(matrix?: Mat4): Mat4;
    }
    /**
     * 3D Camera settings
     */
    class Camera {
        fov: number;
        aspect: number;
        near: number;
        far: number;
        rotate: Vec3;
        position: Vec3;
        constructor(aspect?: number, fov?: number, near?: number, far?: number);
        transform(transform: Transform): Mat4;
        perspective(): Mat4;
    }
    /**
     * Generated mesh
     */
    class Mesh {
        verts: Array<number>;
        normals: Array<number>;
        constructor(divide: number, path?: Array<number>, smooth?: number, angle?: number);
        private sphere(divide);
        private createVerts(divide, path, start, end);
        private createFaces(verts, divide, length);
    }
    /**
     * Simple game item
     */
    class Item {
        mesh: Mesh;
        color: Array<number>;
        transform: Transform;
        childs: Array<Item>;
        constructor(mesh?: Mesh, color?: Array<number>, transform?: Array<number>);
        add(child: any): this;
    }
    /**
     * Shader utility
     */
    class Shader {
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        indices: WebGLBuffer;
        attribs: object;
        location: object;
        constructor(gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string);
        private create(type, source);
        attrib(name: string, values: Array<number>, size: number): Shader;
        uniform(name: string, value: number): Shader;
        uniform(name: string, value: Array<number>): Shader;
    }
}
