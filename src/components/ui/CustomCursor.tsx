"use client";
import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef<number | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Fallback for touch devices: only run cursor logic if the user uses a mouse
    let isTouch = false;
    window.addEventListener('touchstart', () => isTouch = true, { once: true });

    const moveCursor = (e: MouseEvent) => {
      if (isTouch) return;
      mouse.current = { x: e.clientX, y: e.clientY };
      
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      // Smooth interpolation for the trailing circle
      circle.current.x += (mouse.current.x - circle.current.x) * 0.15;
      circle.current.y += (mouse.current.y - circle.current.y) * 0.15;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${circle.current.x}px`;
        cursorRef.current.style.top = `${circle.current.y}px`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'svg' ||
        target.closest('svg')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-sky-500 rounded-full pointer-events-none z-[99999] transition-[background-color,border-color,transform] duration-300 ease-out origin-center -ml-4 -mt-4 ${isHovering ? 'scale-[2] bg-sky-500/10 border-sky-400' : 'scale-100'}`}
      />
      <div 
        ref={dotRef} 
        className={`fixed top-0 left-0 w-2 h-2 bg-sky-500 rounded-full pointer-events-none z-[99999] transition-colors duration-300 -ml-1 -mt-1 ${isHovering ? 'bg-transparent' : ''}`}
      />
    </>
  );
};