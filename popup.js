document.getElementById("startSession").addEventListener("click", () => {
    const textStyle = document.getElementById("textStyleSelect").value;
    const studyDuration = parseInt(document.getElementById("studyDuration").value);
  
    chrome.storage.sync.set({ textStyle, studyDuration }, () => {
      alert(`Session started with ${textStyle} and ${studyDuration}-minute timer.`);
    });
  });