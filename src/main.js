import * as THREE from "three"
import WindowContext from "./js/WindowContext"
import SceneBouncingBubbles from "./js/scenarios/BouncingBubbles/SceneBouncingBubbles"
import { askMotionAccess } from "./js/utils/device/DeviceAccess"
import SceneScenario3D from "./js/scenarios/Scenario3D/SceneScenario3D"

/** device access */
const btn = document.getElementById("btn-access")
btn.addEventListener("click", askMotionAccess, false)

/** scenarios */
const scene2d = new SceneBouncingBubbles(20, "canvas-scene", true, false)
const scene2d2 = new SceneBouncingBubbles(10, "canvas-scene-2", false, true)
const scene3d = new SceneScenario3D("canvas-scene-3d")

const windowContext = new WindowContext()
console.log(windowContext.scenes)

const time = windowContext.time

const update = () => {
    const bubblesToRemove = scene2d.bubbles.filter(b => b.y >= scene2d.height + b.radius + 1)
    bubblesToRemove.forEach(b => scene2d.bubbles.splice(scene2d.bubbles.indexOf(b), 1))
    bubblesToRemove.forEach(b => scene3d.addBubble(b.x - scene2d.width/2, scene3d.height/2 + 4*b.radius - 2))

    const bubblesToRemove2 = scene2d2.bubbles.filter(b => b.y <= 0 - 9)
    bubblesToRemove2.forEach(b => scene2d2.bubbles.splice(scene2d2.bubbles.indexOf(b), 1))
    bubblesToRemove2.forEach(b => scene3d.addBubble(b.x - scene2d2.width/2, -scene3d.height/2 + 2))

    const bubblesToRemove3 = scene3d.bubbles.filter(b => b.position.y <= -scene3d.height/2 - 20)
    bubblesToRemove3.forEach(b => scene3d.removeBubble(b))
    bubblesToRemove3.forEach(b => scene2d2.addBubble(b.position.x + scene3d.width/2, 0-10))

    const bubblesToRemove4 = scene3d.bubbles.filter(b => b.position.y >= scene3d.height/2 + 20)
    bubblesToRemove4.forEach(b => scene3d.removeBubble(b))
    bubblesToRemove4.forEach(b => scene2d.addBubble(b.position.x + scene3d.width/2, scene2d.height + 9))
}

time.on("update", update)

/** scene 3d */

// const scene = new THREE.Scene()
// const canvas = document.getElementById("canvas-scene-3d")
// const dimensions = canvas.getBoundingClientRect()
// const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 200 )
// camera.position.z = 100
// scene.add(camera)

// const geometry = new THREE.BoxGeometry(20, 20, 20)
// const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('blue')})
// const box = new THREE.Mesh(geometry, material)
// scene.add(box)

// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.setSize(dimensions.width, dimensions.height)
// renderer.setClearColor(new THREE.Color('red'))
// renderer.render(scene, camera)

