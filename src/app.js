const dependencies = require('./dependencies')
const StageController = require('./stage')
const VideoController = require('./video')
const SceneController = require('./scene')
const DataController = require('./data')
const $ = dependencies.jquery

StageController.registerComponent()
VideoController.registerComponent()

const playing = false;
document.currentScene = SceneController;

$(() => {
    SceneController.initScene()

    document.querySelector('a-scene').addEventListener('enter-vr', function () {
        $('#exitBtn').hide();
    });

    document.querySelector('a-scene').addEventListener('enter-vr', function () {
        $('#exitBtn').show();
    });
})
