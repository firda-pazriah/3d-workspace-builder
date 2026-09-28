import { cm } from "@/data/units";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const BODY = { color: "#f4f4f5", roughness: 0.4 };

// Where the light comes from, in the lamp's local space (units).
export const LAMP_BULB = [0, cm(40), cm(20)];

// Smart LED Desk Lamp 1S: round base, upright pole and a slim light bar
// reaching forward (+z).
export default function DeskLamp() {
  const isOn = useWorkspaceStore((state) => state.isNight);

  return (
    <group>
      {/* BASE */}
      <mesh position={[0, cm(0.9), 0]} castShadow receiveShadow>
        <cylinderGeometry args={[cm(8.5), cm(8.8), cm(1.8), 40]} />
        <meshStandardMaterial {...BODY} />
      </mesh>

      {/* POLE */}
      <mesh position={[0, cm(21), 0]} castShadow>
        <cylinderGeometry args={[cm(0.9), cm(0.9), cm(38), 16]} />
        <meshStandardMaterial {...BODY} />
      </mesh>

      {/* HINGE */}
      <mesh position={[0, cm(40.5), 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[cm(1.4), cm(1.4), cm(3), 16]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.3} roughness={0.3} />
      </mesh>

      {/* LIGHT BAR */}
      <mesh position={[0, cm(41), cm(19)]} castShadow>
        <boxGeometry args={[cm(3.5), cm(1.4), cm(38)]} />
        <meshStandardMaterial {...BODY} />
      </mesh>

      {/* LED STRIP (underside) */}
      <mesh position={[0, cm(40.25), cm(20)]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[cm(2.4), cm(32)]} />
        <meshBasicMaterial color={isOn ? "#fff7e0" : "#e4e4e7"} />
      </mesh>
    </group>
  );
}
