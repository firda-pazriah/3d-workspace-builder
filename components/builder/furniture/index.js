import ElectricalDesk from "./ElectricalDesk";
import DualMotorDesk from "./DualMotorDesk";
import OfficeChair, { CHAIR_SPECS } from "./OfficeChair";
import Monitor, { MONITOR_SPECS } from "./Monitor";
import Laptop, { LAPTOP_SPECS } from "./Laptop";
import Keyboard, { KEYBOARD_SPECS } from "./Keyboard";
import Mouse, { MOUSE_SPECS } from "./Mouse";
import DeskLamp from "./DeskLamp";
import Speaker, { SPEAKER_SPECS } from "./Speaker";
import CPU, { COMPUTER_SPECS } from "./CPU";
import CoffeeMachine, { COFFEE_SPECS } from "./CoffeeMachine";
import AirCare, { AIR_CARE_SPECS } from "./AirCare";
import WalkingPad from "./WalkingPad";
import SpinningBike from "./SpinningBike";
import { cm } from "@/data/units";

// One model component per catalogue id, with that product's spec bound.
const withSpecs = (Component, specs) =>
  Object.fromEntries(
    Object.entries(specs).map(([id, spec]) => {
      const Model = () => <Component spec={spec} />;
      Model.displayName = `${Component.name}(${id})`;
      return [id, Model];
    }),
  );

// 3D model for each catalogue item, keyed by `furnitureData[].id`.
export const MODELS = {
  "electrical-adjustable-desk": ElectricalDesk,
  "dual-motor-electric-standing-desk": DualMotorDesk,
  ...withSpecs(OfficeChair, CHAIR_SPECS),
  ...withSpecs(Monitor, MONITOR_SPECS),
  ...withSpecs(Laptop, LAPTOP_SPECS),
  ...withSpecs(Keyboard, KEYBOARD_SPECS),
  ...withSpecs(Mouse, MOUSE_SPECS),
  "smart-led-desk-lamp-1-s": DeskLamp,
  ...withSpecs(Speaker, SPEAKER_SPECS),
  ...withSpecs(CPU, COMPUTER_SPECS),
  ...withSpecs(CoffeeMachine, COFFEE_SPECS),
  ...withSpecs(AirCare, AIR_CARE_SPECS),
  "foldable-walk-pad": WalkingPad,
  "home-spinning-bike-yesoul-S3": SpinningBike,
};

// Panel width in scene units, for placing side monitors edge to edge.
export const getMonitorWidth = (id) =>
  MONITOR_SPECS[id] ? cm(MONITOR_SPECS[id].width) : null;
