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
  tutorId: string;
}
export interface ICourseDto {
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  discount?: number;
  modules?: IModuleDto[];
  coverUrl?: string;
  coverFile?: File;
  promoVideoFile?: File;
  promoVideoRef?: number;
  categories?: string[];
  createdAt?: Date;
  tutorId?: string;
}

export interface IModuleDto {
  id: string;
  order: number;
  title: string;
  description?: string;
  lessons?: ILessonDto[];
}
export interface ILessonDto {
  order: number;
  videoRef: number;
  title: string;
  duration: string;
  description?: string;
  thumbnailUrl: string;
  materialUrl?: string;
}

export interface IModule {
  id: string;
  order: number;
  title: string;
  description?: string;
  lessons: ILesson[];
}

export interface ILesson {
  id: string;
  order: number;
  videoRef: number;
  title: string;
  duration: string;
  description?: string;
  thumbnailUrl: string;
  materialUrl?: string;
}
