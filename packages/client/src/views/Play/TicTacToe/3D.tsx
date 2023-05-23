import Board from './components/board'
import {  ARButton, XR } from '@react-three/xr'
import { Canvas} from '@react-three/fiber'





function App() {
  
  return (
    <>
      <ARButton/>
      <Canvas 
        // onCreated={onCanvasCreated}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}>
        <XR>
          <Board position={[0,0,-1]}></Board>
        </XR>
      </Canvas>
    </>
  )
}
export default App
