"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DRAG_THRESHOLD, LEFT_WALL_CAMERA } from "@/data/categories";

const FLOOR_MIN = -4;
const FLOOR_MAX = 4;
const PLANK_WIDTH = 0.8;
const PLANK_DEPTH = 0.32;
const PLANK_ROWS = 25;
const PLANK_TONES = ["#B98255", "#C9905E", "#C58A58"];

// Running-bond parquet: odd rows start with a half plank, and the last plank
// of each row is trimmed to the floor edge.
function buildPlanks() {
  const planks = [];

  for (let row = 0; row < PLANK_ROWS; row++) {
    const z = FLOOR_MIN + PLANK_DEPTH / 2 + row * PLANK_DEPTH;

    let start = FLOOR_MIN;
    let col = 0;

    while (start < FLOOR_MAX - 1e-6) {
      const fullWidth =
        row % 2 === 1 && col === 0 ? PLANK_WIDTH / 2 : PLANK_WIDTH;
      const width = Math.min(fullWidth, FLOOR_MAX - start);

      const tone =
        (row + col) % 4 === 0
          ? PLANK_TONES[0]
          : (row + col) % 3 === 0
            ? PLANK_TONES[1]
            : PLANK_TONES[2];

      planks.push({ x: start + width / 2, z, width, tone });

      start += width;
      col++;
    }
  }

  return planks;
}

const PLANKS = buildPlanks();

// One instanced draw call instead of a mesh per plank.
function WoodFloor() {
  const meshRef = useRef(null);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    PLANKS.forEach((plank, i) => {
      matrix.makeScale(plank.width - 0.015, 0.03, PLANK_DEPTH - 0.012);
      matrix.setPosition(plank.x, 0.015, plank.z);

      mesh.setMatrixAt(i, matrix);
      mesh.setColorAt(i, color.set(plank.tone));
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PLANKS.length]}
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />

      <meshStandardMaterial roughness={0.72} />
    </instancedMesh>
  );
}

function Rug() {
  return (
    <group position={[-0.7, 0.055, 0.2]}>
      {/* rug body */}
      <mesh receiveShadow>
        <boxGeometry args={[4.8, 0.045, 4]} />

        <meshStandardMaterial color="#D8C8B2" roughness={1} />
      </mesh>

      {/* subtle inner border */}
      <mesh position={[0, 0.024, 0]}>
        <boxGeometry args={[4.5, 0.008, 3.7]} />

        <meshStandardMaterial color="#CDBBA3" roughness={1} />
      </mesh>

      {/* center */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[4.2, 0.008, 3.4]} />

        <meshStandardMaterial color="#DDD0BE" roughness={1} />
      </mesh>
    </group>
  );
}

function Window() {
  return (
    <group
      // Back wall
      position={[2.15, 4.26, -3.94]}
      scale={[1, 1.2, 1]}
    >
      {/* dark outer frame */}
      <mesh>
        <boxGeometry args={[2.7, 3.1, 0.09]} />

        <meshStandardMaterial color="#252525" roughness={0.45} />
      </mesh>

      {/* glass */}
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[2.5, 2.9]} />

        <meshStandardMaterial
          color="#AFC8D2"
          transparent
          opacity={0.35}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* vertical divider */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[0.06, 2.9, 0.06]} />

        <meshStandardMaterial color="#282828" />
      </mesh>

      {/* horizontal divider */}
      <mesh position={[0, 0.15, 0.11]}>
        <boxGeometry args={[2.5, 0.06, 0.06]} />

        <meshStandardMaterial color="#282828" />
      </mesh>

      {/* sill */}
      <mesh position={[0, -1.58, 0.12]} castShadow>
        <boxGeometry args={[2.9, 0.1, 0.28]} />

        <meshStandardMaterial color="#ECE7DF" roughness={0.7} />
      </mesh>
    </group>
  );
}

function MinimalPoster({ position, rotation = [0, 0, 0], type = "circle" }) {
  return (
    <group position={position} rotation={rotation}>
      {/* FRAME */}
      <mesh castShadow>
        <boxGeometry args={[1.15, 1.6, 0.07]} />

        <meshStandardMaterial color="#202020" roughness={0.5} />
      </mesh>

      {/* PAPER */}
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[1.03, 1.48]} />

        <meshStandardMaterial color="#EEE7DD" roughness={0.9} />
      </mesh>

      {type === "circle" && (
        <>
          <mesh position={[0, 0.3, 0.05]}>
            <circleGeometry args={[0.3, 32]} />

            <meshBasicMaterial color="#B98E6C" />
          </mesh>

          <mesh position={[0, -0.28, 0.051]}>
            <circleGeometry args={[0.35, 32]} />

            <meshBasicMaterial color="#292725" />
          </mesh>
        </>
      )}

      {type === "arches" && (
        <>
          <mesh position={[0, 0.32, 0.05]}>
            <circleGeometry args={[0.27, 32, 0, Math.PI]} />

            <meshBasicMaterial color="#B18B6D" />
          </mesh>

          <mesh position={[0, -0.1, 0.051]}>
            <circleGeometry args={[0.32, 32, 0, Math.PI]} />

            <meshBasicMaterial color="#34312E" />
          </mesh>

          <mesh position={[0, -0.5, 0.052]}>
            <boxGeometry args={[0.62, 0.12, 0.01]} />

            <meshBasicMaterial color="#B18B6D" />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function Room() {
  const [wallHovered, setWallHovered] = useState(false);

  const focusCamera = useWorkspaceStore((state) => state.focusCamera);

  useCursor(wallHovered);

  const focusLeftWall = (event) => {
    event.stopPropagation();

    // Releasing an orbit drag over the wall shouldn't count as a click.
    if (event.delta > DRAG_THRESHOLD) return;

    focusCamera(LEFT_WALL_CAMERA);
  };

  return (
    <group>
      {/* ================================= */}
      {/* BASE FLOOR */}
      {/* ================================= */}

      <mesh position={[0, -0.04, 0]} receiveShadow>
        <boxGeometry args={[8, 0.08, 8]} />

        <meshStandardMaterial color="#A8734D" roughness={0.8} />
      </mesh>

      {/* ================================= */}
      {/* WOOD PARQUET */}
      {/* ================================= */}

      <WoodFloor />

      {/* ================================= */}
      {/* RUG */}
      {/* ================================= */}

      <Rug />

      {/* ================================= */}
      {/* BACK WALL */}
      {/* ================================= */}

      <mesh position={[0, 3.5, -4]} receiveShadow>
        <boxGeometry args={[8, 7, 0.12]} />

        <meshStandardMaterial color="#F1ECE5" roughness={0.9} />
      </mesh>

      {/* ================================= */}
      {/* LEFT WALL */}
      {/* ================================= */}

      <mesh
        position={[-4, 3.5, 0]}
        receiveShadow
        onClick={focusLeftWall}
        onPointerOver={(event) => {
          event.stopPropagation();
          setWallHovered(true);
        }}
        onPointerOut={() => setWallHovered(false)}
      >
        <boxGeometry args={[0.12, 7, 8]} />

        <meshStandardMaterial color="#F5F1EB" roughness={0.9} />
      </mesh>

      {/* ================================= */}
      {/* WINDOW */}
      {/* ================================= */}

      <Window />

      {/* ================================= */}
      {/* MINIMALIST POSTERS */}
      {/* ================================= */}

      {/* back wall poster */}
      <MinimalPoster position={[-1.4, 4.3, -3.91]} type="circle" />

      {/* left wall poster */}
      <MinimalPoster
        position={[-3.91, 4.3, 3.2]}
        rotation={[0, Math.PI / 2, 0]}
        type="arches"
      />

      {/* ================================= */}
      {/* BASEBOARDS */}
      {/* ================================= */}

      <mesh position={[0, 0.1, -3.88]}>
        <boxGeometry args={[8, 0.2, 0.1]} />

        <meshStandardMaterial color="#E3DDD4" roughness={0.8} />
      </mesh>

      <mesh position={[-3.88, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.2, 8]} />

        <meshStandardMaterial color="#E3DDD4" roughness={0.8} />
      </mesh>
    </group>
  );
}
