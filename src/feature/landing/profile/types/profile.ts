export interface UserProfile {
  id: string;
  name: string;
  email: string;
  /** Fallback shown in the avatar circle when there's no photo, e.g. "DB". */
  avatarInitials?: string;
  /** Photo URL — when provided, this is shown instead of the initials. */
  avatarImageSrc?: string;
}
