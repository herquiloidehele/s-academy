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
}
