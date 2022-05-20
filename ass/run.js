setScene();
addShapes();
animate();
animateAudioBarAverageFrequency();
animateAudioBarAllFrequency();
animateAllDoor();
buildGui();


renderer.render(scene, camera);
window.addEventListener('resize', resizeScene);