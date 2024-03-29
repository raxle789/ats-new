import { StaticImageData } from 'next/image';

export interface subPostType {
  sub_id: number;
  img: StaticImageData;
  name: string;
  latestPosition: string;
  yearExperience: number;
  expectedSalary: string;
  education: string;
  status: string;
  score: string;
  skills: string[];
}

export interface IjobPostType {
  id: number;
  items: subPostType[];
}
