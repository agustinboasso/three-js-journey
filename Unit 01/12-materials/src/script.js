import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

THREE.ColorManagement.enabled = false


/**
 * DEBUG
 */

const gui = new dat.GUI()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg  ')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/2/px.jpg',
    '/textures/environmentMaps/2/nx.jpg',
    '/textures/environmentMaps/2/py.jpg',
    '/textures/environmentMaps/2/ny.jpg',
    '/textures/environmentMaps/2/pz.jpg',
    '/textures/environmentMaps/2/nz.jpg',
])


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//Objects

//const material = new THREE.MeshBasicMaterial()
 //material.map = doorColorTexture
// material.color.set('yellow')
//material.color = new THREE.Color('red')
//material.wireframe = true 
//opacidad y transparencia van juntas
// material.opacity = 0.5
//  material.transparent = true 

// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

//mesh normal material

// const material = new THREE.MeshNormalMaterial()
// //material.wireframe = true
// material.flatShading = true //se pueden ver las caras que cobnforman la geometria

//MESH MATCAP MATERIAL

// const material = new THREE.MeshMatcapMaterial( )
// material.matcap = matcapTexture


//MESH DEPTH MATERIAL

//const material = new THREE.MeshDepthMaterial()

//MESH LAMBERT MATERIAL 

//const material = new THREE.MeshLambertMaterial()


//MESH PHONG MATERIAL

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular = new THREE.Color(0xff0000) //el color del reflejo

//MESH TOON MATERIAL

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

//MESH STANDARD MATERIAL

// const material = new THREE.MeshStandardMaterial()
// // material.metalness = 0.45
// // material.roughness = 0.65
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture



//Environment MAP


const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture
 


//GUI CONTROLS MESH STANDARD MATERIAL

gui.add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.0001)
gui.add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.0001)
gui.add(material, 'aoMapIntensity')    
    .min(0)
    .max(10)
    .step(0.0001)
gui.add(material, 'displacementScale')
    .min(0)
    .max(1)
    .step(0.0001)
// gui.add(material, 'normalScale')
//     .min(0)
//     .max(1)
//     .step(0.0001)    

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material
)

const torus = new THREE.Mesh (
    new THREE.TorusGeometry(0.3,0.2,64,120),
    material
)
torus.position.x = 1.5 
scene.add(sphere, plane, torus )

//luces

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 1
)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update objects

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x= 0.15 * elapsedTime;
    torus.rotation.x= 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()