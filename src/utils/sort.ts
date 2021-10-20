type ByStartTime = { startTime: string };
export const byStartTime = (a: ByStartTime, b: ByStartTime) =>
  a.startTime.localeCompare(b.startTime);
