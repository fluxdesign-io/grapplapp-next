// This script runs before anything else loads
(function() {
  // Force white background immediately
  document.documentElement.style.backgroundColor = 'white';
  
  // Create a full-screen white overlay that will be visible until the app loads
  var overlay = document.createElement('div');
  overlay.id = 'white-loading-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'white';
  overlay.style.zIndex = '9999';
  
  // Add it to body as soon as body is available
  document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(overlay);
    
    // Remove the overlay when the app is fully loaded
    window.addEventListener('load', function() {
      // Give a small delay to ensure app is visible
      setTimeout(function() {
        overlay.style.transition = 'opacity 0.3s';
        overlay.style.opacity = '0';
        setTimeout(function() {
          overlay.parentNode.removeChild(overlay);
        }, 300);
      }, 200);
    });
  });
})();
