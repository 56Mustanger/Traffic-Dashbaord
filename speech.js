// Speech Control using Web Speech API
// Depends on script.js global variables

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const voiceBtn = document.getElementById('voice-toggle');
    const statusEl = document.getElementById('voice-status');

    if (!voiceBtn) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      voiceBtn.disabled = true;
      if (statusEl) statusEl.textContent = 'Speech recognition not supported.';
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;

    let isListening = false;

    voiceBtn.addEventListener('click', () => {
      if (!isListening) {
        recognition.start();
        isListening = true;
        voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Voice Control';
        if (statusEl) statusEl.textContent = 'Listening...';
      } else {
        recognition.stop();
        isListening = false;
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Voice Control';
        if (statusEl) statusEl.textContent = 'Not listening';
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    function handleVoiceCommand(text) {
      // Toggle traffic layer
      const trafficRegex = /(?:toggle|turn)?\s*traffic\s*(on|off)|\b(on|off)\s+traffic\s+layer/;
      const trafficMatch = trafficRegex.exec(text);
      if (trafficMatch) {
        const state = trafficMatch[1] || trafficMatch[2];
        const trafficCheckbox = document.getElementById('traffic-layer');
        if (trafficCheckbox) trafficCheckbox.checked = state === 'on';
        if (typeof trafficLayer !== 'undefined') trafficLayer.setMap(state === 'on' ? map : null);
        if (statusEl) statusEl.textContent = `Voice: traffic ${state}`;
        return;
      }

      // Map zoom
      const zoomRegex = /(zoom|please zoom|can you zoom)\s*(in|out)/;
      const zoomMatch = zoomRegex.exec(text);
      if (zoomMatch) {
        const dir = zoomMatch[2];
        map.setZoom(map.getZoom() + (dir === 'in' ? 1 : -1));
        if (statusEl) statusEl.textContent = `Voice: zoom ${dir}`;
        return;
      }

      // Use my location
      const locationRegex = /(set (?:the )?location to my location|use (?:my )?location|go to my location|show my current location|center (?:the )?map on me|center on my position)/;
      if (locationRegex.test(text)) {
        const myBtn = document.getElementById('my-location');
        if (myBtn) myBtn.click();
        if (statusEl) statusEl.textContent = 'Voice: using current location';
        return;
      }

      if (statusEl) statusEl.textContent = `Voice (unrecognized): ${text}`;
    }
  });
})();
