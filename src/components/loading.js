import React from 'react'
import { useSpring, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
root: {
  margin: 0,
  padding: 0,
  userSelect: 'none',
  position:' relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  color: 'black',
  background:'grey',
},

scriptBox: {
  width:' 100px',
  height: '300px',
  background: 'black',
  margin: '5px',
  willChange: 'transform',
'&:hover' :{
  background: 'red',
},
}
})
const items = [0,1,2,3]
const interp = i => r => `translate3d(0, ${15 * Math.sin(r+ (i* 2 * Math.PI) / 1.6)}px, 0)`

export default function Loading() {
	const styles = useStyles();
  const { radians } = useSpring({
    to: async next => {
      while (1) await next({ radians: 4})
    },
    from: { radians: 0 },
    config: { duration: 1000 },
    reset: true,
  })
  return  (<div className={styles.root}>
{    items.map(i => <animated.div key={i} className={styles.scriptBox }style={{ transform: radians.interpolate(interp(i)) }} />)
    }  
      </div>
      )
}


