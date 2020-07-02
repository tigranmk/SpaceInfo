 import React,{useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../components/loading';
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import { Divider } from '@material-ui/core';
import CarouselLaunchImg from '../components/launchCarousel';
import LaunchInfo from '../components/launchesInfo';
const LAUNCH_LIST = gql `
	
query Launch($limit:Int,$offset: Int,$order: String) {
  launches(limit:$limit,offset:$offset,order:$order) {
     links {
      mission_patch_small
      wikipedia
      flickr_images

    }
    rocket {
      rocket_name
    }
    mission_name
    details
    launch_year
    id
    launch_success
  }
}

`
const useStyles = makeStyles({
	root:{
		maxWidth:'140em',
    height:'100vh',

    background:'linear-gradient(to left,#193248,#b3b2b2 50%,#193248)',
    },
    carousel:{
        width:'30em',
        margin:'0 auto',
        border: '10px solid #040000',
        borderRadius: '10px',
         backgroundColor:'black',
         [theme.breakpoints.down('sm')]:{
    width: '100vw',
  }

    }


})

  const Launches = () =>{
   const styles = useStyles();
          const [state,setState] = useState("");
        
        const openModal = (id) => () => setState(id);
        const closeModal = () => setState("");

   const { loading, error, data,fetchMore } = useQuery(LAUNCH_LIST,{
    variables:{
      limit:10,
      offset:0,
      order: "timestamp"
    }, 
    fetchPolicy: "cache-and-network"
   })

   function onLoadMore () {
              fetchMore({
          variables: {
            offset: data.launches.length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              launches: [...prev.launches, ...fetchMoreResult.launches]
            });
          }
        })
        }
  

   if (loading) return <Loading />;
   if (error) return <p>Error :(</p>;
 return ( 

 		<div className={styles.root}>
            <Divider light={true} />

            <Carousel className={styles.carousel}  interval={null} >

 		{data.launches.map(({links,mission_name,launch_year,launch_success,id}) => (
 	 <Carousel.Item key={id} >
    <img
      className="d-block w-100"
      src={`${links.mission_patch_small}`}
      alt="Past Launches"
    />
    <Carousel.Caption>
     <Button variant="secondary" onClick={openModal(id)}>
     Details
      </Button>
    </Carousel.Caption>
  </Carousel.Item>  
 		))}
            </Carousel>
            <Button variant="danger" onClick={onLoadMore}>
              Load More
               </Button>

                 {state ?<LaunchInfo id={state} close={closeModal}/> : null}

            <Divider light={true} />

          <CarouselLaunchImg
          data={data}
          />
    </div>
    )
 	}
  	

export default Launches;