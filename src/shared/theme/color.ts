function channels(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((start) => Number.parseInt(value.slice(start, start + 2), 16)) as [
    number,
    number,
    number,
  ];
}

export function withAlpha(hex: string, alpha: number): string {
  'worklet';
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mix(from: string, to: string, amount: number): string {
  const a = channels(from);
  const b = channels(to);
  const blended = a.map((channel, index) =>
    Math.round(channel * (1 - amount) + (b[index] ?? 0) * amount)
      .toString(16)
      .padStart(2, '0'),
  );
  return `#${blended.join('')}`;
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = channels(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (light + 0.05) / (dark + 0.05);
}

export const SUBTLE_SHIFT = 0.08;

export function subtleGradient(hex: string): string {
  return `linear-gradient(135deg, ${mix(hex, '#FFFFFF', SUBTLE_SHIFT)} 0%, ${hex} 50%, ${mix(hex, '#000000', SUBTLE_SHIFT)} 100%)`;
}

export function washGradient(hex: string, from = 0.24, to = 0.1): string {
  return `linear-gradient(135deg, ${withAlpha(hex, from)} 0%, ${withAlpha(hex, to)} 100%)`;
}

const SKY_TINT = { light: [0.16, 0.05], dark: [0.12, 0.04] } as const;

export function skyGradient(background: string, tint: string, mode: 'light' | 'dark'): string {
  const [top, middle] = SKY_TINT[mode];
  return `linear-gradient(180deg, ${mix(background, tint, top)} 0%, ${mix(background, tint, middle)} 30%, ${background} 58%)`;
}

export function skyEdgeGradient(background: string, tint: string, mode: 'light' | 'dark'): string {
  const edge = mix(background, tint, SKY_TINT[mode][0]);
  return `linear-gradient(180deg, ${edge} 0%, ${edge} 55%, ${withAlpha(edge, 0)} 100%)`;
}

export function brandWash(hex: string): string {
  return `linear-gradient(180deg, ${withAlpha(hex, 0.22)} 0%, ${withAlpha(hex, 0.08)} 26%, ${withAlpha(hex, 0)} 48%)`;
}
