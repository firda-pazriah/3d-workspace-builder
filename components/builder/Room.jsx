export default function Room() {
  return (
    <group>
      {/* BACK WALL */}

      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#ead8c5" />
      </mesh>

      {/* LEFT WALL */}

      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />

        <meshStandardMaterial color="#e4c5ae" />
      </mesh>

      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />

        <meshStandardMaterial color="#d6c2a8" />
      </mesh>
    </group>
  );
}
