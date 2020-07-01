 import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import {useSpring, animated} from 'react-spring';
import Button from '@material-ui/core/Button';

const ROCKET_INFO = gql `

query Rocket($id: ID!){
  rocket(id:$id ) {
        active
    cost_per_launch
    name
    success_rate_pct
    first_flight
    description
    height {
      meters
    }
    wikipedia
    engines {
      number
      propellant_1
      propellant_2
    }
    mass {
      kg
    }
  
    
  }
  }
`


const useStyles = makeStyles(theme =>({

   modal:{
  position: 'fixed', /* Stay in place */
  zIndex: 1, /* Sit on top */
  paddingTop: '20px',/* Location of the box */
  left: 0,
  top: 0,
  width: '100%', /* Full width */
  height:' 100%', /* Full height */
  overflow: 'auto', /* Enable scroll if needed */
  backgroundColor: 'rgba(0,0,0,0.7)',
 '& h4':{
    fontSize:'1.125rem',
    fontWeight:'Bolder',
    fontFamily:'cursive'
  },
  '& a':{
    float:'left',
    textDecoration:'none',
    color:'black'
  }
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
  padding: '2px 16px',
  display:'flex',
  flexWrap:'wrap',
  fontFamily:'cursive',
  fontSize:'1.125rem'
},
 modal_item:{
  flex:'1 25%',

 }



}))



const Rocket = (props) => {
 const styles = useStyles();
 const animation = useSpring({to:{top:0, opacity:1},from:{top:'100px', opacity:0}, config: {duration:350 }})
 const { loading, error, data } = useQuery(ROCKET_INFO, {
    variables:{id:props.id}
  }); 
        if (loading) return true;
        if (error) return <p>Error :(</p>;
  
        return (
                <>
                <div className={styles.modal} >
                 <animated.div style={animation} className={styles.modal_content}>
                    <div className={styles.modal_header}>   
                    <h2>{data.rocket.name}</h2>
                    </div>    
                    <div className={styles.modal_body}>
                    <p>{data.rocket.description}</p>
                    <div className={styles.modal_item}>
                    <h4>Cost Per Luanch</h4>
                    <p>{data.rocket.cost_per_launch}$</p>
                    </div>
                    <div className={styles.modal_item}>
                    <h4>Success Rate</h4>
                    <p>{data.rocket.success_rate_pct}%</p>
                    </div>
                     <div className={styles.modal_item}>
                    <h4>first Propellant</h4>
                    <p>{data.rocket.engines.propellant_1}</p>
                    </div>
                      <div className={styles.modal_item}>
                    <h4>Second Propellant</h4>
                    <p>{data.rocket.engines.propellant_2}</p>
                    </div>
                    <div className={styles.modal_item}>
                    <h4>First Flight</h4>
                    <p>{data.rocket.first_flight}</p>
                    </div>
                     <div className={styles.modal_item}>
                    <h4> Mass</h4>
                    <p>{data.rocket.mass.kg}</p>
                    </div>
                      <div className={styles.modal_item}>
                    <h4> Engines</h4>
                    <p>{data.rocket.engines.number}</p>
                    </div>
                      <div className={styles.modal_item}>
                    <h4>Height </h4>
                    <p>{data.rocket.height.meters}</p>
                    </div>
                    </div> 
                     <div className={styles.modal_footer}>
         <Button variant="contained" color="secondary" className={styles.close} onClick={props.close} >
                          CLOSE 
                          </Button>
                 <Button  variant="contained"><a href={data.rocket.wikipedia} target="_blank"  rel="noopener noreferrer">more Info</a></Button>

          </div>
          </animated.div>
         </div>
                </>)
 
    
 
}
export default Rocket;