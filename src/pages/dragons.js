 import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useSpring, animated} from 'react-spring';
import { useMediaQuery } from 'react-responsive';
import DragonInfo from '../components/dragonInfo';
import dragon2Img from '../images/dragon2.jpg';
import dragon3Img from '../images/dragon3.jpg';

const useStyles = makeStyles(theme => ({
root: {
  margin: 0,
  padding: 0,
  background:'linear-gradient(to left,#193248,#b3b2b2 50%,#193248)',
  overflowY:'hidden',
'& .c ':{
  position: 'absolute',
  width: '500px',
  height:' 500px',
  cursor: 'pointer',
  willChange: 'transform, opacity',
  [theme.breakpoints.down('sm')]:{
  	width: '100vw',
  }
},
"& div.front, div.back":{
  backgroundSize: 'cover',
},
'& div.back':{
  backgroundImage:`url(${dragon2Img})`,
},
'& div.front':{
  backgroundImage:` url(${dragon3Img})`,
}
},
card:{
  transition: 'box-shadow 0.5s',
  willChange: 'transform',
  position:'relative',
   borderRadius:' 5px',
  boxShadow:' 0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
  	 width:'500px',
  height:'80vh',
    margin:'0 auto',
'&:hover': {
  boxShadow:' 0px 30px 100px -10px rgba(0, 0, 0, 0.4)',
},
 [theme.breakpoints.down('sm')]:{
  	width: '100vw',
height:' 100vh',
  }
},

div:{
	position:'relative',
	 width: '500px',
  height:' 80vh',
  cursor: 'pointer',
   [theme.breakpoints.down('sm')]:{
  	width: '100vw',
  }
}



}))

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20,1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


  const Dragons = () => {
  	const styles = useStyles();

  	    const [dragonId,setDragonId] = useState("dragon1");
  	  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  	 const [flipped, set] = useState(false);
   const [props, def] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  const setState = () =>  {  
  	set(state => !state);
  	var str1="dragon2";
  	var str2="dragon1";
  	var state = true;
  	if(dragonId === str1) {
  		setDragonId(str2);
  		state=false;
  	}
  	else if (state){
  		setDragonId(str1)
  	}
  }
  

 return ( 
    	<>
     <div className={styles.root}>
    {isTabletOrMobile ? 
    	<div  
       onClick={setState}
       className={styles.div}
       >
    	 <animated.div className="c back " style={{ opacity: opacity.interpolate(o => 1 - o), transform }}  />
      <animated.div className="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
    		</div>
    	:
     <animated.div 
     className={styles.card} 
     onClick={setState}
     onMouseMove={({ clientX: x, clientY: y }) => def({ xys: calc(x, y) })}
      onMouseLeave={() => def({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
      >
      <animated.div className="c back " style={{ opacity: opacity.interpolate(o => 1 - o), transform }}  />
      <animated.div className="c front" style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
   		</animated.div> }

    </div>
   		    	       		    <DragonInfo id={dragonId}/> 

      		</>
    	)
    	
  }
export default Dragons;