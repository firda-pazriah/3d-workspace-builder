export default function Plant() {
  return (
    <group>
      {/* POT */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.22, 0.5, 32]} />

        <meshStandardMaterial color="#b08968" roughness={0.8} />
      </mesh>

      {/* SOIL */}
      <mesh position={[0, 0.51, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.03, 32]} />

        <meshStandardMaterial color="#3f2d20" roughness={1} />
      </mesh>

      {/* STEM */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.8, 12]} />

        <meshStandardMaterial color="#52734d" roughness={0.8} />
      </mesh>

      {/* LEAVES */}

      <mesh position={[0.22, 0.9, 0]} rotation={[0, 0, -0.5]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />

        <meshStandardMaterial color="#668f5a" roughness={0.8} />
      </mesh>

      <mesh position={[-0.22, 1.05, 0.05]} rotation={[0, 0, 0.5]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />

        <meshStandardMaterial color="#5f8555" roughness={0.8} />
      </mesh>

      <mesh position={[0.15, 1.25, 0]} rotation={[0, 0, -0.3]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />

        <meshStandardMaterial color="#739c68" roughness={0.8} />
      </mesh>

      <mesh position={[-0.1, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.27, 16, 16]} />

        <meshStandardMaterial color="#608755" roughness={0.8} />
      </mesh>
    </group>
  );
}
