import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'


THREE.ColorManagement.enabled = false



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//axis helper

const axesHelper = new THREE. AxesHelper()
scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const matcapTextureTorus = textureLoader.load('/textures/matcaps/3.png')

//LOAD FUENTE

const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=> {
        const textGeometry = new TextGeometry(
            'Agustin Boasso', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
            
        )
        // textGeometry.computeBoundingBox()
        
        // textGeometry.translate(
        //     (- textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     (- textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     (- textGeometry.boundingBox.max.z - 0.3) * 0.5
        // )    
        // console.log(textGeometry.boundingBox)    

        textGeometry.center()


        const textMaterial = new THREE.MeshMatcapMaterial()
        textMaterial.matcap = matcapTexture
        //textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry,textMaterial)
        scene.add(text)
        console.log(text)
        console.time('donuts')
        
        const torusGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
        const torusMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTextureTorus})

        for (let i = 0; i < 300; i++){
            
            const torus = new THREE.Mesh(torusGeometry, torusMaterial)

            torus.position.x = (Math.random () - 0.5) * 10 
            torus.position.y = (Math.random () - 0.5) * 10 
            torus.position.z = (Math.random () - 0.5) * 10 

            torus.rotation.x = Math.random() * Math.PI 
            torus.rotation.y = Math.random() * Math.PI 
            
            const scale = Math.random()
            torus.scale.set (scale, scale, scale)
            
            
            // ESTA FORMA MODIFICA LA ESTRUCTURA DE LA GEOMETRIA
            // torus.scale.x = Math.random()
            // torus.scale.y = Math.random()
            // torus.scale.z = Math.random()

            scene.add(torus)
        }
        console.timeEnd('donuts')
    }
)



/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

//scene.add(cube)

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()