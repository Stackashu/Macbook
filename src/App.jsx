import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import MacContainer from "./MacContainer";
import "./index.css";

const App = () => {
  return (
    <div className="w-full h-screen">
      <div className=" navbar flex gap-24 pt-10 pb-5 absolute top-0 left-1/2 -translate-x-1/2 line">
        {["iphone", "ipad", "services", "ios", "mac", "products"].map((e,key) => (
     <a key={key} href="" className="text-white font-[200px] text-sm capitalize transition cursor-pointer duration-1 hover:text-[#66d9ef]" >{e}</a>
        ))}
      </div>
      <div className="absolute  flex justify-center items-center flex-col  text-white top-[22%] left-1/2 -translate-x-1/2">
        <h3 className="masked font-bold text-6xl">macbook pro.</h3>
        <h5>Oh so pro !</h5>
        <p className="text-center w-3/4">
         
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          omnis debitis perspiciatis dolorem odit.
        </p>
      </div>
      <Canvas camera={{ fov: 20, position: [0, -10, 165] }}>
        <Environment
          files={[
            "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/studio_small_09_4k.hdr",
          ]}
        />
        <ScrollControls className="hide " pages={3}>
          <MacContainer />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default App;
