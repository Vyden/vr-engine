const dependencies = require('./dependencies')
const StageController = require('./stage')
const VideoController = require('./video')
const SceneController = require('./scene')
const $ = dependencies.jquery

StageController.registerComponent()
VideoController.registerComponent()

const playing = false;
document.currentScene = SceneController;

$(() => {
    SceneController.initScene()
})
