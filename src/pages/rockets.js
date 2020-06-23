 import React,{useState,useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import Rocket from '../components/Rocket';
import Loading from '../components/loading';

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


  const Rockets = () => {
        const styles = useStyles();
        const [state,setState] = useState("");
        const openModal = function(id){
 setState(id)
}


 const { loading, error, data } = useQuery(Rockets_list)
   if (loading) return <Loading />;
        if (error) return <p>Error :(</p>;

 return ( 
  <div className={styles.root} >
{ data.rockets.map(({ name,id,active}) => (
                <RocketCard 
                name={name}
                id={id}
                active={active}
                key={id}
                click={()=>openModal(id)}
                />
       ))}
    {state ?<Rocket id={state} close={()=>setState("")}/> : null}
      </div>)
}

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
export default Rockets;
