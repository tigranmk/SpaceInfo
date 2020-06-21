import React from 'react';
import '../App.css';
import { useMediaQuery } from 'react-responsive';
import NavMobile from '../components/navMobile';
import Nav from '../components/nav';
import {useSpring, animated} from 'react-spring';


     const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
     const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

export default function Home() {
     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
     const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 500, friction:140 },opacity: 1, from: {opacity: 0} }))

  return (
    <>
      <div className="container">
      {  isTabletOrMobile ? <NavMobile /> : <Nav />}
     <main className="main-title"  onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
     <animated.h1 style={{ transform: props.xy.interpolate(trans4) }}>InfoSpace</animated.h1>
     </main>
     </div>
    </>
  )
}
