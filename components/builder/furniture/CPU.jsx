import { cm } from "@/data/units";

// Real sizes (cm) of the monis.rent Mac desktops.
export const COMPUTER_SPECS = {
  "apple-mac-mini-m4": { size: 12.7, height: 5 },
  "apple-mac-mini-m2-new": { size: 19.7, height: 3.6 },
  "apple-mac-studio": { size: 19.7, height: 9.5, vents: true },
};

const ALUMINIUM = { color: "#c8c8cc", metalness: 0.75, roughness: 0.3 };

// Square aluminium box, front ports facing +z.
export default function CPU({ spec }) {
  const { size, height, vents } = spec;

  return (
    <group>
      <mesh position={[0, cm(height / 2), 0]} castShadow receiveShadow>
        <boxGeometry args={[cm(size), cm(height), cm(size)]} />
        <meshStandardMaterial {...ALUMINIUM} />
      </mesh>

      {/* FRONT PORTS / STATUS LIGHT */}
      <mesh position={[cm(-size / 4), cm(height / 2), cm(size / 2 + 0.01)]}>
        <planeGeometry args={[cm(size / 5), cm(0.6)]} />
        <meshStandardMaterial color="#27272a" />
      </mesh>

      <mesh
        position={[cm(size / 2 - 1.5), cm(height / 2), cm(size / 2 + 0.01)]}
      >
        <circleGeometry args={[cm(0.25), 12]} />
        <meshBasicMaterial color="#e5e7eb" />
      </mesh>

      {/* Mac Studio: perforated base band */}
      {vents && (
        <mesh position={[0, cm(0.6), 0]}>
          <boxGeometry args={[cm(size + 0.05), cm(1.2), cm(size + 0.05)]} />
          <meshStandardMaterial
            color="#8e8e93"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      )}
    </group>
  );
}
