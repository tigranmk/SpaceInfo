 import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import {useSpring, animated} from 'react-spring';
import Button from 'react-bootstrap/Button'
const LAUNCH_INFO = gql `

query Launch($id: ID!){
  launch(id: $id) {
    details
    id
    launch_success
    launch_year
    links {
      flickr_images
      wikipedia
      video_link
    }
    mission_name
    rocket {
      rocket_name
    }
  }
  }
`


const useStyles = makeStyles(theme =>({

   modal:{
  position: 'fixed', /* Stay in place */
  zIndex: 100, /* Sit on top */
  paddingTop: '20px',/* Location of the box */
  left: 0,
  top: 0,
  width: '100%', /* Full width */
  height:' 100%', /* Full height */
  overflow: 'auto', /* Enable scroll if needed */
  backgroundColor: 'rgba(0,0,0,0.7)',
  '& a':{
    float:'left',
    textDecoration:'none',
    color:'black'
  },
  '& h4':{
    fontSize:'1.125rem',
    fontWeight:'Bolder',
    fontFamily:'cursive'
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
  display:'flex',
  justifyContent:'space-around',
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
  fontWeight:'600',
  fontFamily:'cursive',
  '& p':{
  width:'100%'
}
},
 modal_item:{
  flex:'1 50%',
 },
 success:{
  display: 'inline',
border: 'green solid 8px',
background: 'green',
 },
  failed:{
  display: 'inline',
border: 'red solid 8px',
background: 'red',
 }



}))



const LaunchInfo = (props) => {
 const styles = useStyles();
 const animation = useSpring({to:{top:0, opacity:1},from:{top:'100px', opacity:0}, config: {duration:350 }})
 const { loading, error, data } = useQuery(LAUNCH_INFO, {
    variables:{id:props.id}
  }); 
        if (loading) return true;
        if (error) return <p>Error :(</p>;
  
        return (
                <>
                <div className={styles.modal} >
                 <animated.div style={animation} className={styles.modal_content}>
                    <div className={styles.modal_header}>   
                    <h2>{data.launch.mission_name}</h2>
                    </div>    
                    <div className={styles.modal_body}>
                    <p>{data.launch.details}</p>
                    <div className={styles.modal_item}>
                    <h4>Launch year</h4>
                    <p>{data.launch.launch_year}</p>
                    </div>
                    <div className={styles.modal_item}>
                    <h4>Status</h4>
                    {data.launch.launch_success ?<p className={styles.success}>Success</p> : <p className={styles.failed}>Failed</p>}
                    </div>      
                    </div> 
                     <div className={styles.modal_footer}>
         <Button variant="secondary" className={styles.close} onClick={props.close} >
                          CLOSE 
                          </Button>
        <Button   variant="info"><a href={data.launch.links.wikipedia} target="_blank"  rel="noopener noreferrer">Information</a></Button>


{
   data.launch.links.video_link  && 
       <Button variant="primary"><a href={data.launch.links.video_link} target="_blank"  rel="noopener noreferrer">Video</a></Button>
}

          </div>
          </animated.div>
         </div>
                </>)
 
    
 
}
export default LaunchInfo;