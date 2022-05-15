setScene();


addShapes();

animate();
//animateAllDoor();
buildGui();


renderer.render(scene, camera);
window.addEventListener('resize', resizeScene);