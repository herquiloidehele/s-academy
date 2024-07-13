export interface ICourse {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration: string;
  discount: number;
}

export interface ICourseVideo {
  title: string;
  videoId: string;
  duration: string;
  description?: string;
  thumbnailUrl?: string;
}

export interface ICourseSection {
  title: string;
  videos: ICourseVideo[];
}
