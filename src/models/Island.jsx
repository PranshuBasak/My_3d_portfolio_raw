
import React, { useRef , useEffect} from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame , useThree } from "@react-three/fiber";
import islandScene from '../assets/x3d/island.glb'
import {a} from '@react-spring/three'




const Island = ({isRotating , setIsRotating ,setCurrentStage, ...props}) => {
  const { nodes, materials } = useGLTF(islandScene);

  const islandRef = useRef();
  const {gl , viewport} = useThree();

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;
  }

  const handlePointerUp = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);

    
  }

  const handlePointerMove = (e) =>{
    e.stopPropagation();
    e.preventDefault();

    if(isRotating){
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const delta = (clientX - lastX.current) / viewport.width;

    islandRef.current.rotation.y += delta*0.01*Math.PI;

    lastX.current = clientX;

    rotationSpeed.current = delta*0.01*Math.PI;
    }


  }

  const handleKeyDown = (e) =>{
    if( e.key === 'ArrowLeft') {
      if(!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01*Math.PI;
      rotationSpeed.current = 0.0125;
    }else{
      if(!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01*Math.PI;
      rotationSpeed.current = -0.0125;
    }
  }

  const handleKeyUp = (e) =>{
    if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
      setIsRotating(false);
    }
  }


  // Debounce function to handle scroll stop
  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleScrollStop = () => {
    setIsRotating(false);
  };

  const debouncedHandleScrollStop = debounce(handleScrollStop, 2000); // Adjust the delay as needed

  const handleScroll = (e) => {
    // e.preventDefault();
    // Determine the direction of the scroll
    let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

    // Check if we are rotating and if not, set it to rotating
    if(!isRotating) setIsRotating(true);
    // Perform rotation or any other action based on the delta
    // For example, rotate your object here:
    islandRef.current.rotation.y += (delta > 0 ? 1 : -1) * 0.05 * Math.PI;
    
    // After performing the action, you may want to set rotating back to false
    debouncedHandleScrollStop();
  };

  const handleTouch = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Assuming you want to perform similar actions as in pointer move
    if (isRotating) {
        // Get the touch coordinates
        const touchX = e.touches[0].clientX;

        // Calculate the delta
        const delta = (touchX - lastX.current) / viewport.width;
        
        // Perform rotation or other actions
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = touchX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
    }
};


  useFrame(() =>{
    if(!isRotating){
      rotationSpeed.current *= dampingFactor;

      if(Math.abs(rotationSpeed.current) < 0.01){
        rotationSpeed.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeed.current;
    }else{
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  })

  useEffect(() =>{
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('touchmove', handleTouch);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('wheel', handleScroll);

    return () =>{
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('touchmove', handleTouch);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('wheel', handleScroll);
    }




  },[gl , handlePointerDown , handlePointerUp , handlePointerMove,handleTouch] )

  return (
    <a.group ref={islandRef} {...props} >
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}


export default Island;