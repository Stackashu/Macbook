import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three-stdlib";

const MAC_GLB_PATH = "./mac.glb";
const RED_TEXTURE_PATH = "./red.jpg";

const MacContainer = () => {
  // Memoize DRACOLoader to avoid recreating it on every render
  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    return loader;
  }, []);

  // Correct usage: useGLTF(url, dracoLoader)
  const { scene, nodes } = useGLTF(MAC_GLB_PATH, dracoLoader);
  const texture = useTexture(RED_TEXTURE_PATH);
  const data = useScroll();

  useLayoutEffect(() => {
    if (nodes?.matte?.material) {
      nodes.matte.material.map = texture;
      nodes.matte.material.emissiveIntensity = 0;
      nodes.matte.material.metalness = 0;
      nodes.matte.material.roughness = 1;
      nodes.matte.material.needsUpdate = true;
    }
  }, [nodes, texture]);

  useFrame(() => {
    if (nodes?.screen) {
      nodes.screen.rotation.x = THREE.MathUtils.degToRad(
        180 - data.offset * 90
      );
    }
  });

  return (
    <group position={[0, -17, 30]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload assets with DRACOLoader for GLB
const dracoLoaderForPreload = new DRACOLoader();
dracoLoaderForPreload.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
useGLTF.preload(MAC_GLB_PATH, dracoLoaderForPreload);
useTexture.preload(RED_TEXTURE_PATH);

export default MacContainer;
