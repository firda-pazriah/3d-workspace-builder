"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export default function CameraController() {
  const camera = useThree((state) => state.camera);

  // OrbitControls registers itself here via `makeDefault`.
  const controls = useThree((state) => state.controls);

  const request = useWorkspaceStore((state) => state.camera);

  const isAnimating = useRef(false);

  const targetPosition = useRef(new THREE.Vector3());

  const targetLookAt = useRef(new THREE.Vector3());

  // Start a tween on every camera request (the initial state needs none).
  useEffect(() => {
    if (request.requestId === 0) return;

    targetPosition.current.set(...request.position);
    targetLookAt.current.set(...request.target);

    isAnimating.current = true;
  }, [request]);

  // If the user starts interacting with OrbitControls,
  // immediately release the camera.
  useEffect(() => {
    if (!controls) return;

    const handleStart = () => {
      isAnimating.current = false;
    };

    controls.addEventListener("start", handleStart);

    return () => {
      controls.removeEventListener("start", handleStart);
    };
  }, [controls]);

  useFrame(() => {
    if (!isAnimating.current) return;

    camera.position.lerp(targetPosition.current, 0.1);

    if (controls) {
      controls.target.lerp(targetLookAt.current, 0.1);

      controls.update();
    }

    const positionDistance = camera.position.distanceTo(targetPosition.current);

    const targetDistance = controls
      ? controls.target.distanceTo(targetLookAt.current)
      : 0;

    if (positionDistance < 0.03 && targetDistance < 0.03) {
      camera.position.copy(targetPosition.current);

      if (controls) {
        controls.target.copy(targetLookAt.current);

        controls.update();
      }

      isAnimating.current = false;
    }
  });

  return null;
}
