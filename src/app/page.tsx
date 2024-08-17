import Controles from "@/components/Base/Controles";
import { DrawerDemo } from "@/components/Base/Drawer";
import Player from "@/components/Base/Player";
import { TimerChart } from "@/components/Base/Timer";
import { SonnerDemo } from "@/components/common/Tost";

export default function Home() {
  return (
    <div>
    
      <TimerChart />
      <Controles  />
      <DrawerDemo />
      <SonnerDemo />
      <Player />
    </div>
  );
}
