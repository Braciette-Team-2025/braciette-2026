export interface CreateInternalSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    type: string;
    name: string;
    cabinet_name: string;
    short_description: string;
    major_program: string;
    pic: string;
    pic_contact: string;
    drive_link: string;
    nominations: string[];
    achievements: string[];
    social_medias: { platform: string; url: string }[];
  };
}
