import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
const DRAGON_INFO = gql `

  query Dragon($id: ID!){
    dragon(id:$id) {
      id
      crew_capacity
      description
      diameter {
        meters
      }
      dry_mass_kg
      first_flight
      wikipedia
      type
    }
  }
`

const useStyles = makeStyles(theme => ({
root: {
display: 'flex',
justifyContent: 'center',
alignContent: 'center',
flexWrap: 'wrap',
textAlign:'center',
background:'linear-gradient(to left,#193248,#b3b2b2 50%,#193248)',
'& p':{
  padding:'0px 35px',
  fontWeight:'bolder',
},
'& table,th,td':{
  border:'1px solid #ddd',
  textAlign:'left',
  fontSize:'0.875rem'
},
'& table':{
  borderCollapse:'collapse',
  width:'100%'
},
'& th,td':{
  padding:'13px'
},
'& tr':{
  background: 'linear-gradient(to left,#193248,#b3b2b2 50%,#193248)'
},
'& th':{
    backgroundColor:' #4CAF50',
  color: 'white',
}
}

}))

  const DragonInfo = (props) => {  
    const styles = useStyles();
   const { loading, error, data } = useQuery(DRAGON_INFO, { variables:{id:props.id} })
   if (loading) return true;
   if (error) return <p>Error :(</p>;
 return ( 
      <div className={styles.root}>
      <div>
      <p>{data.dragon.description}</p>
      </div>
      <div>
      <table>
  <tr>
    <th>CREW CAPACITY</th>
    <th>DIAMETER(meters)</th>
    <th>MASS(kg)</th>
    <th>FIRST FLIGHT</th>
  </tr>
  <tr>
    <td>{data.dragon.crew_capacity}</td>
    <td>{data.dragon.diameter.meters}</td>
    <td>{data.dragon.dry_mass_kg}</td>
    <td>{data.dragon.first_flight}</td>
  </tr>
  </table>
  </div>
      </div>
      )
}

export default DragonInfo;
