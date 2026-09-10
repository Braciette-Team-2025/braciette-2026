const API_BASE_URL = process.env.API_BASE_URL;

interface SettingItem {
  id: string;
  name: string;
  is_enable: boolean;
}

interface SettingsResponse {
  success: boolean;
  message: string;
  data: SettingItem[];
}

export async function getSettings(): Promise<SettingItem[] | null> {
  if (!API_BASE_URL) {
    console.warn(
      "[settings] API_BASE_URL is not configured — Feature flags will default to fail-open (enabled)",
    );
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/settings`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;

    const json: SettingsResponse = await response.json();
    if (!json.success) return null;

    return json.data;
  } catch {
    return null;
  }
}

export function isFeatureEnabled(
  settings: SettingItem[] | null,
  featureName: string,
): boolean {
  if (!settings) return true;
  const feature = settings.find((s) => s.name === featureName);
  return feature?.is_enable ?? true;
}
