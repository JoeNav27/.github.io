
    document.addEventListener('DOMContentLoaded', () => {
        const music = document.getElementById('backgroundMusic');
        const muteButton = document.getElementById('muteButton');
        const muteIcon = document.getElementById('muteIcon');
        const volumeSlider = document.getElementById('volumeSlider');
        const playButton = document.getElementById('playButton'); // Play button element
        
    
        music.volume = 0.5; // Set default volume
    
        // Ensure mute icon is correct on page load
        function updateMuteIcon() {
            muteIcon.src = music.muted ? "https://static.wixstatic.com/shapes/2c4d6a_4daca08c3b0c40658db2a6ce7f1c733f.svg" : "https://static.wixstatic.com/shapes/2c4d6a_23d8cb7247bd41749eabe2e4e25ca78a.svg";
        }
            // Play button event listener
        playButton.addEventListener('click', () => {
        music.muted = false;
        music.play();
        playButton.style.display = "none"; // Hide play button after clicking
                // Show mute button
                muteButton.style.opacity = "1";
                muteButton.style.pointerEvents = "auto";
        });
    
        // Listen for when the audio is ready
        music.addEventListener('canplaythrough', updateMuteIcon);
    
        // User must interact before playing audio
        muteButton.addEventListener('click', () => {
            if (music.paused) {
                music.play();
            }
            music.muted = !music.muted;
            updateMuteIcon();
        });
    
        volumeSlider.addEventListener('input', () => {
            music.volume = volumeSlider.value;
            music.muted = music.volume === 0; // Mute if volume is set to 0
            updateMuteIcon();
        });
    });
    

    const pngContainer = document.getElementById('pngZoom');
    const linksContainer = document.getElementById('linksContainer');
    const links = linksContainer.querySelectorAll('a');

    // Configuration for zoom and rotation
    const maxScroll = 1000; // Total scroll distance for full zoom
    const maxScale = 50;    // Maximum zoom level
    const maxRotation = 90; // Maximum rotation in degrees

    // Use the window's scroll event
    window.addEventListener('scroll', () => {
      // Get the current scroll position
      const scrollY = window.scrollY;

      // Calculate the scale based on scroll position
      let scale = 1 + (scrollY / maxScroll) * (maxScale - 1);

      // Cap the scale to the maximum level
      if (scale > maxScale) scale = maxScale;

      // Calculate the rotation angle based on scroll position
      let rotation = (scrollY / maxScroll) * maxRotation;

      // Cap the rotation to the maximum level
      if (rotation > maxRotation) rotation = maxRotation;

      // Apply both scale and rotation
      pngContainer.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

      // Reveal links when reaching the bottom
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight) {
        linksContainer.style.opacity = 1; // Make the container visible
        linksContainer.style.pointerEvents = 'auto';

        // Add a delay to reveal each link one by one
        links.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add('visible');
          }, index * 500); // 500ms delay between each link
        });
      }
    });

