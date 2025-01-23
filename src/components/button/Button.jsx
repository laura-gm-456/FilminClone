import React, { useEffect, useRef } from 'react';
import './Button.css';



const ScrollToTopButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const end = document.querySelector('.end');

    const handleScroll = () => {
      const endTop = end.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      
      if (window.scrollY > 200) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }

    
      if (endTop < windowHeight + 10) {
        button.classList.add('hidden');
      }
    };

    const handleClick = () => {
      
      button.classList.toggle('active');

     window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);
    button.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <><div className="end"></div><div ref={buttonRef} className="floatingButton hidden" id="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
      </svg>
    </div></>
  );
};


export default ScrollToTopButton;

