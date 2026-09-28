import Workspace3D from "@/components/builder/Workspace3D";
import FurniturePanel from "@/components/builder/FurniturePanel";
import CheckoutSidebar from "@/components/builder/CheckoutSidebar";

export default function Home() {
  return (
    <main className="bg-surface-soft relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />

        <Workspace3D />
      </div>

      <FurniturePanel />

      <CheckoutSidebar />
    </main>
  );
}
