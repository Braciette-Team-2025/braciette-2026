/**
 * Backend sudah dinonaktifkan (event selesai). Feature flag kini statis
 * dan tidak melakukan request jaringan.
 */
export interface SettingItem {
  id: string;
  name: string;
  is_enable: boolean;
}

const STATIC_SETTINGS: SettingItem[] = [
  { id: "voting", name: "voting", is_enable: false },
  { id: "open-talent", name: "open-talent", is_enable: false },
];

export async function getSettings(): Promise<SettingItem[] | null> {
  return STATIC_SETTINGS;
}

export function isFeatureEnabled(
  settings: SettingItem[] | null,
  featureName: string,
): boolean {
  if (!settings) return false;
  const feature = settings.find((s) => s.name === featureName);
  return feature?.is_enable ?? false;
}
