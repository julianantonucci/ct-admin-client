import classes from './Editable.module.scss'
// import { ENDPOINTS } from '../constants'
import { useEffect, useRef, useState } from 'react'

const Editable = ({ childRef, text, type = 'input', placeholder, children, ...props }) => {
  // could be set from outside the component via props
  const [isEditing, setEditing] = useState(null)
  const previousValue = useRef(text)

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true){
      childRef.current.focus()
    }
  }, [childRef, isEditing])

  const handleKeyDown = (event, type) => {
    const { key } = event
    const keys = ["Escape", "Tab"]
    const enterKey = "Enter"
    const allKeys = [...keys, enterKey]

    // for textarea only escape and tab set isEditing false.
    // for others eall three keys set to false
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1) 
    ) {
      setEditing(false)
    }
  }


  return (
    <div {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)} >
          <span className={classes.editable}>{text}</span>
        </div>
      )}
    </div>
  )
}

export default Editable
