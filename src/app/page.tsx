import Controles from "@/components/Base/Controles";
import { DrawerDemo } from "@/components/Base/Drawer";
import TimerInfo from "@/components/Base/TimerInfo";
import Player from "@/components/Base/Player";
import { TimerChart } from "@/components/Base/Timer";

export default function Home() {
  return (
    <>
    <div className="h-screen">
    
      <TimerChart />
      <Controles  />
      {/* <DrawerDemo /> */}
     
      <Player />
    </div>
    <TimerInfo />
    </>
  );
}
