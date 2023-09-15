import * as THREE from 'three'
import gsap from 'gsap'


//console.log((gsap))
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


//time
// let time = Date.now()

//Clock

// const clock = new THREE.Clock()


//GSAP

gsap.to(mesh.position, {duration: 1,delay:1, x:2 })
gsap.to(mesh.position, {duration: 1,delay:2, x:0 })

//Animations

const tick = () => {
    //console.log('tick')
    
    //time para que el objeto se mueva a la velocidad real

    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    //console.log(deltaTime)
    
    //clock

    // const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)


    // Update objects

    // mesh.position.y = Math.sin(elapsedTime) //* Math.PI * 2 //* deltaTime
    // mesh.position.x = Math.cos(elapsedTime)



    // camera.position.y = Math.sin(elapsedTime) //* Math.PI * 2 //* deltaTime
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)

    //render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()