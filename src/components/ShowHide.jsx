/**
 * Wraps children in a div that can be toggled visible or hidden and puts a button 
 * next to the title to toggle the visibility.
 * @param {Object} props - The props object.
 * @param {boolean} props.visible - Whether the children should be visible.
 * @param {string} props.className - The class name to apply to the wrapper div.
 * @param {string} props.children - The children to wrap.
 * @returns {JSX.Element} The wrapped children.
 */
import React, { useState } from 'react';
import classes from './ShowHide.module.scss';

function ShowHide({ visible = false, title, children, ...props }) {
  const [show, setShow] = useState(visible);

  return (
    <div {...props}>
      <h2>{title}
        <button 
          onClick={() => setShow(!show)}
          className={classes.show_hide_button}> {show ? '-' : '+'} </button>
      </h2>
      {show && children}
    </div>
  );
}

export default ShowHide;
