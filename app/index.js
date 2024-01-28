import * as stats from "./module/stats";
import * as sensors from "./module/sensors";
import * as clock from "./module/clock";
import * as compass from "./module/compass";


clock.init();

sensors.init();

compass.init()
// stats.update();