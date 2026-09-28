import { cm } from "@/data/units";

// Real sizes (cm): length along z, width along x.
export const MOUSE_SPECS = {
  "logitech-mx-mouse": {
    length: 10.5,
    width: 6.8,
    height: 3.8,
    color: "#1f1f22",
  },
  "logitech-mx-master-mouse-s3": {
    length: 12.5,
    width: 8.4,
    height: 5.1,
    color: "#3a3b40",
  },
  "apple-magic-mouse": {
    length: 11.4,
    width: 5.7,
    height: 2.2,
    color: "#f4f4f5",
  },
};

export default function Mouse({ spec }) {
  const { length, width, height, color } = spec;

  // A unit sphere scaled to the mouse's half-extents, resting on the desk.
  return (
    <mesh
      position={[0, cm(height / 2), 0]}
      scale={[cm(width / 2), cm(height / 2), cm(length / 2)]}
      castShadow
    >
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial color={color} roughness={0.35} />
    </mesh>
  );
}
