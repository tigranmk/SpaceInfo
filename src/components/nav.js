 import React from 'react';
import {makeStyles} from '@material-ui//core/styles';
import {useSpring, animated} from 'react-spring'
import {
  Link
} from "react-router-dom";
const stylesNav = makeStyles ({
	root:{
		      display:'flex',
		      margin:0,
              padding:'.5em',
              backgroundColor:'#000',
              listStyleType:'none',
              justifyContent:' space-around',

	'& li':{
              marginTop:0,
            
	},
	'& li>a':{
		 display:'block',
         padding:'.5em 1em',
         color:'white',
         textDecoration:'none',
         transition: 'opacity .6s linear',
     },
     '& a:link': {

              fontWeight:'bold',
              textDecoration:'none',
            },

           ' & a:hover': {
              textDecoration:'none',
              color:'grey',
            },
            '& a:active': {
              color:'#b81414',
            },
        },
	nav:{
		      gridColumn:'1/7',
              gridRow:'span 1',
	}

})

  const Nav = () => {
 	const classes = stylesNav();
  const props = useSpring({opacity: 1, from: {opacity: 0}});
   return 	(
 	<>
 <nav className={classes.nav}>
      <animated.ul className={classes.root} style={props}>
      <li><Link to="/rockets">Rockets</Link></li>
      <li><Link to="/launches">Launches</Link></li>
      <li><Link to="/capsules">Capsules</Link></li>
      <li><Link to="/missions">Missions</Link></li>
          
       </animated.ul>
     </nav>
     </>
     )
}

export default Nav;