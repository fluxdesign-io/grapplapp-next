import { useEffect, useRef, useState, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

/**
 * Custom hook that tracks intersection of an element with viewport
 * @param options - IntersectionObserver options
 * @returns Tuple containing [ref to attach to element, boolean for visibility]
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { 
    root = null, 
    rootMargin = '0px', 
    threshold = 0.1, 
    once = false 
  } = options;
  
  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);

        if (once && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [root, rootMargin, threshold, once]);

  return [elementRef, isIntersecting];
}

/**
 * Custom hook that applies a class when element is in viewport
 * @param options - IntersectionObserver options
 * @param visibleClass - The class to apply when visible
 * @returns Ref to attach to element
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverOptions = {},
  visibleClass: string = 'is-visible'
): RefObject<T> {
  const [ref, isIntersecting] = useIntersectionObserver<T>(options);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    if (isIntersecting) {
      element.classList.add(visibleClass);
    } else if (!options.once) {
      element.classList.remove(visibleClass);
    }
  }, [isIntersecting, options.once, ref, visibleClass]);
  
  return ref;
}
