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

const time = windowContext.time

function moveBubbles(sourceScene, targetScene, shouldMoveBubble, addBubbleToTargetScene) {
    const bubblesToMove = sourceScene.bubbles.filter(shouldMoveBubble);
    bubblesToMove.forEach(bubble => {
        sourceScene.removeBubble(bubble);
        addBubbleToTargetScene(bubble);
    });
}

const update = () => {
    moveBubbles(scene2d, scene3d,
        b => b.y >= scene2d.height + b.radius + 1,
        b => scene3d.addBubble(b.x - scene2d.width/2, scene3d.height/2 + 4*b.radius - 2)
    );

    moveBubbles(scene2d2, scene3d,
        b => b.y <= 0 - 9,
        b => scene3d.addBubble(b.x - scene2d2.width/2, -scene3d.height/2 + 2)
    );

    moveBubbles(scene3d, scene2d2,
        b => b.position.y <= -scene3d.height/2 - 25,
        b => scene2d2.addBubble(b.position.x + scene3d.width/2, 0-10)
    );

    moveBubbles(scene3d, scene2d,
        b => b.position.y >= scene3d.height/2 + 25,
        b => scene2d.addBubble(b.position.x + scene3d.width/2, scene2d.height + 9)
    );
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

