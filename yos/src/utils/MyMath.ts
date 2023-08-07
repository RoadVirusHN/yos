export function clamp(value: number, from: number, to: number): number {
  return Math.max(Math.min(value, Math.max(from, to)), Math.min(from, to));
}
export function getManhattanDistance(
  to: { x: number, y: number },
  fr: { x: number, y: number }
): { dX: number, dY: number } {
  return {
    dX: to.x - fr.x,
    dY: to.y - fr.y
  };
}
