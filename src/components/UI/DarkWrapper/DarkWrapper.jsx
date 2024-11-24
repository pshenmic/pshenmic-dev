'use client'

import { easings, useSpring, animated } from '@react-spring/web'
import './DarkWrapper.scss'

function DarkWrapper ({ duration = 600, open, children, onClick }) {
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
    <animated.div className={'DarkWrapper'} style={animationPopUpWrapper} onClick={onClick}>
      {children}
    </animated.div>
  )
}

export default DarkWrapper
