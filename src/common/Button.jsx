import React, { useEffect, useRef } from 'react';
import './Button.css'; // Asegúrate de que la ruta al archivo CSS es correcta

const Button = ({ children, alternative, simple }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const div = document.createElement('div');
    const letters = children.trim().split('');

    letters.forEach((letter, index, array) => {
      const element = document.createElement('span');
      const part = (index >= array.length / 2) ? -1 : 1;
      const position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index;
      const move = position / (array.length / 2);
      const rotate = 1 - move;

      element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
      element.style.setProperty('--move', move);
      element.style.setProperty('--rotate', rotate);
      element.style.setProperty('--part', part);

      div.appendChild(element);
    });

    button.innerHTML = div.outerHTML;

    button.addEventListener('mouseenter', e => {
      if(!button.classList.contains('out')) {
        button.classList.add('in');
      }
    });

    button.addEventListener('mouseleave', e => {
      if(button.classList.contains('in')) {
        button.classList.add('out');
        setTimeout(() => button.classList.remove('in', 'out'), 950);
      }
    });
  }, [children]);

  let buttonClass = "button";
  if (alternative) {
    buttonClass += " button--alternative";
  }
  if (simple) {
    buttonClass += " button--simple";
  }

  return (
    <button ref={buttonRef} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;