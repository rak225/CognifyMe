// Load face-api.js for face detection
chrome.storage.sync.get(["textStyle", "studyDuration"], ({ textStyle, studyDuration }) => {
    // Apply the selected text style
    if (textStyle === "largeText") applyLargeText();
    else if (textStyle === "smallText") applySmallText();
    else if (textStyle === "bionicText") applyBionicText();
  
    // Start Pomodoro timer and open focus tracking window
    startPomodoro(studyDuration);
  });
  
  // Function to apply Large Text style
  function applyLargeText() {
    const style = document.createElement("style");
    style.innerHTML = `
      p, h1, h2, h3, h4, h5, h6, li {
        font-size: 24px !important;
        line-height: 1.8 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Function to apply Small Text style
  function applySmallText() {
    const style = document.createElement("style");
    style.innerHTML = `
      p, h1, h2, h3, h4, h5, h6, li {
        font-size: 12px !important;
        line-height: 1.4 !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Function to apply Bionic Text style
  function applyBionicText() {
    document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li").forEach(element => {
      element.innerHTML = element.textContent.split(" ").map(word => {
        const splitPoint = Math.ceil(word.length / 2); // Split word in half
        const bionicWord = `<strong>${word.slice(0, splitPoint)}</strong>${word.slice(splitPoint)}`;
        return bionicWord;
      }).join(" ");
    });
  }
  
  // Start Pomodoro timer and open focus.html for retina tracking
  function startPomodoro(durationMinutes) {
    let remainingTime = durationMinutes * 60;
  
    // Set a timer that counts down and logs time left
    const timerInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        alert("Time's up! Great job studying.");
        return;
      }
  
      remainingTime--;
  
      // Display timer in the console for debugging
      console.log(`Time left: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`);
    }, 1000);
  
    // Open focus.html for retina tracking in a new window
    window.open(chrome.runtime.getURL("focus.html"), "Focus Tracking", "width=400,height=300");
  }