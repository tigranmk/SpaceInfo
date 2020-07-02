import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel'

const useStyles = makeStyles({
 root:{
'& h2':{
		textAlign:'center',
    height:'100vh',
		}
 },
    carousel:{
        width:'30em',
        margin:'0 auto',
		border: '10px solid #040000',
		borderRadius: '10px',	
		backgroundColor:'black'
	
    }


})

const CarouselLaunchImg = ({data}) => {
	  const styles = useStyles();
	return (
		<>
		 	  <div className={styles.root}>
            <div>
            <h2>Mission Photos </h2>
            </div>
            <Carousel  className={styles.carousel}  interval={null}>
                {data.launches.map(({links,id}) => (
                                  
                <Carousel.Item key={id}>
    <img
      className="d-block w-100"
      src={ `${links.flickr_images}`|| `${links.mission_patch_small}`}
      alt="Past Launches"
    />
    </Carousel.Item>
  
                ))}
</Carousel>
           </div>
		</>

		)
}
export default CarouselLaunchImg