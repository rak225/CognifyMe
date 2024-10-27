// Wait until face-api.js has loaded
window.onload = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  
    const video = document.getElementById('video');
  
    // Start video stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam: ", error);
      alert("Webcam access is required for focus tracking.");
    }
  
    // Run retina tracking every 2 seconds
    setInterval(async () => {
      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
  
      if (!detections) {
        alert("Focus lost! Please get back to your work.");
      } else {
        const leftEye = detections.landmarks.getLeftEye();
        const rightEye = detections.landmarks.getRightEye();
  
        // Calculate average eye openness
        const eyeOpenness = (leftEye[1].y - leftEye[5].y + rightEye[1].y - rightEye[5].y) / 2;
  
        if (eyeOpenness < 2) { // Threshold for closed eyes
          alert("Focus lost! Please get back to your work.");
        }
      }
    }, 2000); // Check every 2 seconds
  };