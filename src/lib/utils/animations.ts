import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Creates a parallax effect on an element based on scroll position
 * @param element - The DOM element to apply the effect to
 * @param strength - The strength of the parallax effect (1 is normal, higher values increase effect)
 * @param direction - The direction of the parallax effect (1 for normal, -1 for reverse)
 */
export const createParallaxEffect = (
  element: HTMLElement | null,
  strength: number = 0.3,
  direction: number = 1
): gsap.core.Timeline | null => {
  if (!element) return null;

  return gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  }).to(element, {
    y: () => direction * element.offsetHeight * strength,
    ease: 'none',
  });
};

/**
 * Creates a fade-in animation when an element enters the viewport
 * @param element - The DOM element to animate
 * @param delay - Delay before animation starts (in seconds)
 * @param duration - Duration of the animation (in seconds)
 */
export const fadeInOnScroll = (
  element: HTMLElement | null,
  delay: number = 0.2,
  duration: number = 0.8
): gsap.core.Timeline | null => {
  if (!element) return null;

  return gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100px',
      toggleActions: 'play none none none',
      once: true,
    },
  }).fromTo(
    element,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    }
  );
};

/**
 * Creates a "typing" animation effect for text
 * @param element - The DOM element containing the text
 * @param duration - Duration of the animation (in seconds)
 */
export const typewriterEffect = (
  element: HTMLElement | null,
  duration: number = 1.5
): gsap.core.Timeline | null => {
  if (!element) return null;
  
  const text = element.textContent || '';
  const characters = text.split('');
  
  // Clear the element
  element.textContent = '';
  
  // Wrap each character in a span
  characters.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
  
  // Animate each character
  return gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top center+=100px',
      once: true,
    },
  }).to(element.children, {
    opacity: 1,
    stagger: duration / characters.length,
    ease: 'none',
  });
};

/**
 * Creates a 3D tilt effect for an element based on mouse position
 * @param element - The DOM element to apply the effect to
 * @param intensity - The intensity of the tilt effect
 */
export const create3DTiltEffect = (
  element: HTMLElement | null,
  intensity: number = 15
): (() => void) | null => {
  if (!element) return null;
  
  const update = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to element center
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    // Calculate rotation angles (proportional to distance from center)
    const rotateY = (mouseX / rect.width) * intensity;
    const rotateX = -((mouseY / rect.height) * intensity);
    
    // Apply the transform
    gsap.to(element, {
      rotationY: rotateY,
      rotationX: rotateX,
      ease: 'power1.out',
      duration: 0.5,
    });
  };
  
  const resetRotation = () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.7,
    });
  };
  
  element.addEventListener('mousemove', update);
  element.addEventListener('mouseleave', resetRotation);
  
  return () => {
    element.removeEventListener('mousemove', update);
    element.removeEventListener('mouseleave', resetRotation);
  };
};
