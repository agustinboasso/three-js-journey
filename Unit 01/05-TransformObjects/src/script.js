import './style.css'
import * as THREE from 'three'



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2 
group.rotation.y = 0.5

scene.add(group)

const cubeOne = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)
cubeOne.position.x = 1
group.add(cubeOne)
const cubeTwo = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
cubeTwo.position.x = - 3
group.add(cubeTwo)
const cubeThree = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
cubeTwo.position.x = 2
group.add(cubeThree)




// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 2

// mesh.position.set(0.7,-0.6,1)

// scene.add(mesh)






//Scale

// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5

//mesh.scale.set(2,0.5,0.5)

//rotation
//mesh.rotation.reorder('YXZ')
//reorder reordena los ejes como queramos verlos

//mesh.rotation.x = Math.PI * 0.5
//mesh.rotation.y = Math.PI * 0.25


//Axes helper

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)





/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(150, sizes.width / sizes.height)
// camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1

camera.position.set(0.1,0.1,1)

scene.add(camera)

//permite cambiar desde donde vemos la camara
//camera.lookAt(mesh.position)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)