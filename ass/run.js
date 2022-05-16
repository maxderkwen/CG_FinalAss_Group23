setScene();


addShapes();

animate();
animateAllDoor();
animateAudioBarAverageFrequency();
animateAudioBarAllFrequency();
buildGui();


renderer.render(scene, camera);
window.addEventListener('resize', resizeScene);