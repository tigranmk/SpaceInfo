 import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import {useSpring, animated} from 'react-spring';
import Button from '@material-ui/core/Button';
const Rockets_list = gql`
  
   {
  rockets {
    name
    country
    description
    wikipedia
    id
    active
  }

  }
`
const useStyles = makeStyles(theme =>({
root:{
margin:' 0px auto',
display: 'flex',
flexWrap: 'wrap',
background:'linear-gradient(to left,#465664,#0b0808 50%,#465664)',
minHeight:'100vh',
overflow:'hidden',
},
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
  modal:{
    display: 'none', /* Hidden by default */
  position: 'fixed', /* Stay in place */
  zIndex: 1, /* Sit on top */
  paddingTop: '100px',/* Location of the box */
  left: 0,
  top: 0,
  width: '100%', /* Full width */
  height:' 100%', /* Full height */
  overflow: 'auto', /* Enable scroll if needed */
  backgroundColor: 'rgba(0,0,0,0.7)',/* Fallback color */
  },
  modal_content:{
  position: 'relative',
  backgroundColor:' #fefefe',
  margin: 'auto',
  padding: 0,
  border:' 1px solid #888',
  width:' 80%',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
  },
  modal_header: {
  padding:' 2px 16px',
  backgroundColor: '#333e33',
  color: 'white',
},
modal_footer:{
  padding:' 50px 15px',
  backgroundColor: '#333e33',
  color: 'white',
},
close: {
  color: 'white',
  float: 'right',
  fontWeight: 'bold',
'&:hover,&:focus': {
  color: '#000',
  textDecoration: 'none',
  cursor: 'pointer',
},
},
modal_body:{
  padding: '2px 16px'
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

function openModal(){
  document.getElementById('modal_window').style.display='block'
}

function closeModal(){
  document.getElementById('modal_window').style.display='none'

}
  const Rockets = () => {
        const styles = useStyles();
        const props = useSpring({to:{top:0, opacity:1},from:{top:'100px', opacity:0}, config: {duration:350 }})
 return ( 
  <div className={styles.root} >
   <Query
     query={Rockets_list}
   >
  {({ loading, error, data }) => {
       if (loading) return <p>Loading...</p>;
       if (error) return <p>Error :(</p>;
 
       return data.rockets.map(({ name, country,description,wikipedia,id,active}) => (
           <>
           <div className={styles.card}  onClick={()=>openModal()} key={id}>      
       <img src={require(`../images/${id}.png`)} alt={name}/>
  <div className={styles.details} >
   {active ? (
         <span className={styles.active}>active</span>
       ) :          <span className={styles.retired}>Retired</span>
}
       <span className={styles.name}>
         {name}  
       </span>
    </div>
       </div>
         <div className={styles.modal} id="modal_window">
         <animated.div style={props} className={styles.modal_content}>
            <div className={styles.modal_header}>   
            <h2>{name}</h2>
            </div>    
            <div className={styles.modal_body}>
            <span>{country}</span>
            <p>{description}</p>
            <a href={wikipedia}>more Info</a>

            </div> 
             <div className={styles.modal_footer}>
 <Button variant="contained" color="secondary" className={styles.close} onClick={()=>closeModal()} >
                  CLOSE 
                  </Button>
  </div>
  </animated.div>
 
  </div>
  </>
       ));
     }}
   </Query>
  
      </div>)
}

export default Rockets;
