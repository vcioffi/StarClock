const M = 20004146; // meridian (m)
const E = 40074275; // equator (m)
const RAD = Math.PI / 180;

export function calc_bearing(coord1, coord2) {
    const c1 = [coord1.latitude * RAD, coord1.longitude * RAD];
    const c2 = [coord2.latitude * RAD, coord2.longitude * RAD];
  
    const y = Math.sin(c2[1] - c1[1]) * Math.cos(c2[0]);
    const x =
      Math.cos(c1[0]) * Math.sin(c2[0]) -
      Math.sin(c1[0]) * Math.cos(c2[0]) * Math.cos(c2[1] - c1[1]);
    return (Math.atan2(y, x) / RAD + 360) % 360; // in degrees
  }