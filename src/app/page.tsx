import Controles from "@/components/Base/Controles";
import { DrawerDemo } from "@/components/Base/Drawer";
import { TimerChart } from "@/components/Base/Timer";
import { SonnerDemo } from "@/components/common/Tost";

export default function Home() {
  return (
    <div>
      <TimerChart />
      <Controles  />
      <DrawerDemo />
      <SonnerDemo />
    </div>
  );
}
