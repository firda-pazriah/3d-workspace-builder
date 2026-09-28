import * as THREE from "three";

import { cm } from "@/data/units";

// Real panel sizes (cm, including bezels) of the monis.rent monitors.
// bottom: height of the panel's lower edge above the desk.
export const MONITOR_SPECS = {
  "24-full-hd-office-monitor-a24i-2026": {
    width: 54,
    height: 32.5,
    bottom: 11,
    stand: "foot",
  },
  "27-4-k-multimedia-monitor": {
    width: 61.3,
    height: 36.5,
    bottom: 11,
    stand: "foot",
  },
  "34-4-k-curved-monitor-180-hz": {
    width: 81,
    height: 37,
    bottom: 11,
    stand: "foot",
    curveRadius: 150, // 1500R
  },
  "32-4-k-ergonomic-monitor": {
    width: 71.5,
    height: 42.5,
    bottom: 15,
    stand: "arm",
  },
  "apple-studio-display": {
    width: 62.3,
    height: 35.6,
    bottom: 12,
    stand: "studio",
    finish: "silver",
  },
};

const DARK = { color: "#1b1b1d", metalness: 0.3, roughness: 0.4 };
const SILVER = { color: "#d4d4d8", metalness: 0.7, roughness: 0.3 };
const SCREEN = { color: "#1f2937", roughness: 0.2 };

function FlatPanel({ width, height, finish }) {
  return (
    <group>
      {/* BACK SHELL */}
      <mesh position={[0, 0, cm(-1)]} castShadow>
        <boxGeometry args={[cm(width), cm(height), cm(finish ? 2.5 : 1.5)]} />
        <meshStandardMaterial {...(finish ? SILVER : DARK)} />
      </mesh>

      {/* BEZEL + DISPLAY */}
      <mesh position={[0, 0, cm(0.3)]}>
        <boxGeometry args={[cm(width), cm(height), cm(0.4)]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.3} />
      </mesh>

      <mesh position={[0, cm(finish ? 0 : 0.8), cm(0.55)]}>
        <planeGeometry
          args={[cm(width - 1.6), cm(height - (finish ? 1.6 : 3))]}
        />
        <meshStandardMaterial {...SCREEN} />
      </mesh>
    </group>
  );
}

// Concave toward the viewer: an open cylinder arc whose centre is in front.
function CurvedPanel({ width, height, curveRadius }) {
  const radius = cm(curveRadius);
  const arc = cm(width) / radius;

  return (
    <group position={[0, 0, radius]}>
      <mesh castShadow>
        <cylinderGeometry
          args={[
            radius + cm(1.5),
            radius + cm(1.5),
            cm(height),
            32,
            1,
            true,
            Math.PI - arc / 2,
            arc,
          ]}
        />
        <meshStandardMaterial {...DARK} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, cm(0.8), 0]}>
        <cylinderGeometry
          args={[
            radius,
            radius,
            cm(height - 3),
            32,
            1,
            true,
            Math.PI - arc / 2 + 0.005,
            arc - 0.01,
          ]}
        />
        <meshStandardMaterial {...SCREEN} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Width along local x, screen faces +z.
export default function Monitor({ spec }) {
  const { width, height, bottom, stand, finish, curveRadius } = spec;
  const centerY = bottom + height / 2;

  return (
    <group>
      {stand === "foot" && (
        <>
          <mesh position={[0, cm(0.75), cm(-2)]} castShadow receiveShadow>
            <boxGeometry args={[cm(curveRadius ? 40 : 22), cm(1.5), cm(18)]} />
            <meshStandardMaterial {...DARK} />
          </mesh>

          <mesh position={[0, cm(centerY / 2), cm(-4)]} castShadow>
            <boxGeometry args={[cm(5), cm(centerY), cm(2.5)]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
        </>
      )}

      {stand === "studio" && (
        <>
          <mesh position={[0, cm(0.3), cm(-3)]} castShadow receiveShadow>
            <boxGeometry args={[cm(17), cm(0.6), cm(19)]} />
            <meshStandardMaterial {...SILVER} />
          </mesh>

          <mesh
            position={[0, cm(centerY / 2), cm(-8)]}
            rotation={[-0.2, 0, 0]}
            castShadow
          >
            <boxGeometry args={[cm(17), cm(centerY + 2), cm(1)]} />
            <meshStandardMaterial {...SILVER} />
          </mesh>
        </>
      )}

      {stand === "arm" && (
        <>
          {/* desk clamp at the back edge + pole + arm */}
          <mesh position={[0, cm(1.5), cm(-13)]} castShadow>
            <boxGeometry args={[cm(8), cm(3), cm(8)]} />
            <meshStandardMaterial {...DARK} />
          </mesh>

          <mesh position={[0, cm(24), cm(-13)]} castShadow>
            <cylinderGeometry args={[cm(1.8), cm(1.8), cm(45), 16]} />
            <meshStandardMaterial {...DARK} />
          </mesh>

          <mesh position={[0, cm(centerY), cm(-7.5)]} castShadow>
            <boxGeometry args={[cm(4), cm(3), cm(11)]} />
            <meshStandardMaterial {...DARK} />
          </mesh>
        </>
      )}

      <group position={[0, cm(centerY), 0]}>
        {curveRadius ? (
          <CurvedPanel
            width={width}
            height={height}
            curveRadius={curveRadius}
          />
        ) : (
          <FlatPanel width={width} height={height} finish={finish} />
        )}
      </group>
    </group>
  );
}
