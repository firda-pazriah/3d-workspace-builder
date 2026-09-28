export default function Desk({ position = [0, 0, 0], selected, onSelect }) {
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 0.15, 1.5]} />

        <meshStandardMaterial color={selected ? "orange" : "#8b5a2b"} />
      </mesh>

      <mesh position={[-1.2, 0.5, 0]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[1.2, 0.5, 0]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}
