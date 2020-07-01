 import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({

  card: {
    display: 'flex',
  margin:' 15px 4%',
  flex:' 1 15%',
  borderRadius:' 10px',
  overflow:' hidden',
  position: 'relative',
  boxShadow:' 0 10px 20px 5px rgba(0, 0, 0, 0.3)',
  background: '#333',
  transition: 'transform 0.25s ease-in-out',
  justifyContent:'center',
    cursor: 'pointer',

  '&:hover':{
    transform:'scale(1.035)',
},
'& img':{
  width:'100%',
  height:'100%',
  maxWidth:'30px',
},
 [theme.breakpoints.down('sm')]: {
    flex:' 1 50%',
    height:'300px',

 }
  },

  details: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'absolute',
  color: 'white',
  top: 0,
  opacity:0,
  bottom: 0,
  left: 0,
  right: 0,
  height:' 100%',
  width: '100%',
  transition: 'opacity 0.1s ease',
  background: 'linear-gradient(to top,rgba(10, 10, 10, 0.85),rgba(10, 10, 10, 0.5))',
'&:hover':{
  opacity:1,
}
  },
  name: {
  fontSize:' 0.8rem',
  alignSelf: 'center',
  padding:'10px',
  marginBottom: '5px',
  textAlign: 'center',
},
active: {
  color: 'black',
fontSize:' 1rem',
alignSelf: 'center',
border:' 2px solid green',
background: 'rgb(1,210,119)',
borderRadius: '5px',

},
retired:{
  color: 'black',
fontSize:' 1rem',
alignSelf: 'center',
border:' 2px solid  #930404',
background: 'red',
borderRadius: '5px',
}

}))

const RocketCard = (props) => {
        const styles = useStyles();
  return ( <>

             <div className={styles.card}  onClick={ props.click} >      
       <img src={require(`../images/${props.id}.png`)} alt={props.name}/>
  <div className={styles.details} >
   {props.active ? (
         <span className={styles.active}>active</span>
       ) :          <span className={styles.retired}>Passive</span>
}
       <span className={styles.name}>
         {props.name}  
       </span>
    </div>
       </div>
       </>
       )
     }

export default RocketCard;
