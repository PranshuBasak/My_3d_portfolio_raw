import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import sakura from '../assets/sakura.mp3';
import { soundoff, soundon } from '../assets/icons';

// Lazy load the models
const Island = React.lazy(() => import('../models/island'));
const Sky = React.lazy(() => import('../models/sky'));
const Bird = React.lazy(() => import('../models/Bird'));
const Plane = React.lazy(() => import('../models/Plane'));

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating ,setIsRotating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() =>{
    if(isPlaying){
      audioRef.current.play();
    }

    return () =>{
      audioRef.current.pause();
    }
  }, [isPlaying])



  const adjustIslandForScreenSize = () =>{
    let screenScale = null;
    let screenPostion = [0,-6.5,-43];
    let rotation = [0.1, 4.7 , 0];

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9,0.9];
    }else{
      screenScale = [1, 1, 1 ];
    }

    return [screenPostion,screenScale,rotation]
  }

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

   
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };


  const [islandPosition ,islandScale , islandRotation ] = adjustIslandForScreenSize();

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();



  return (
    <section className='w-full h-screen relative'>
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={ {near:0.1 , far: 1000}}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[0,1,0.5]} intensity={1}/>
          <ambientLight intensity={0.5}/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"/>
          <Bird />
          <Sky isRotating={isRotating}/>
          <Island 
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setCurrentStage={setCurrentStage}
            setIsRotating={setIsRotating}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-14   left-2 md:bottom-2">
        <img src={!isPlaying ? soundoff : soundon} alt="sound" 
        className='w-10 h-10 cursor-pointer '
        onClick={() => setIsPlaying(!isPlaying)}/>
      </div>
    </section>
  )
}

export default Home