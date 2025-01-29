'use client'

import { easings, useSpring, animated } from '@react-spring/web'
import './DarkWrapper.scss'

function DarkWrapper ({ duration = 600, open, handleClick, children }) {
  const animationPopUpWrapper = useSpring({
    to: {
      opacity: open ? '1' : '0',
      pointerEvents: open ? 'all' : 'none'
    },
    config: {
      duration,
      easing: easings.easeOutQuad
    }
  })

  return (
    <animated.div className={'DarkWrapper'} style={animationPopUpWrapper} onClick={handleClick} >
      {children}
    </animated.div>
  )
}

export default DarkWrapper
