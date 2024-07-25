export interface ICourse {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration: string;
  discount: number;
  modules: IModule[];
  coverUrl?: string;
  promoVideoRef?: number;
  categories?: string[];
  createdAt?: Date;
}

export interface IModule {
  id: string;
  order: number;
  title: string;
  courseId: string;
  description?: string;
  lessons: ILesson[];
}

export interface ILesson {
  id: string;
  order: number;
  videoRef: number;
  title: string;
  moduleId: string;
  duration: string;
  description?: string;
  thumbnailUrl: string;
}
