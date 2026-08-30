export const DRIVE_LINK_PREFIX = "https://drive.google.com/";

export function isValidDriveLink(link: string): boolean {
  return link.trim().startsWith(DRIVE_LINK_PREFIX);
}
