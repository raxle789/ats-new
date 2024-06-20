import { StaticImageData } from 'next/image';
import img_1 from '@/assets/images/candidates/img_01.jpg';
import img_2 from '@/assets/images/candidates/img_02.jpg';
import img_3 from '@/assets/images/candidates/img_03.jpg';
import img_4 from '@/assets/images/candidates/img_04.jpg';
import img_5 from '@/assets/images/candidates/img_05.jpg';
import img_6 from '@/assets/images/candidates/img_06.jpg';
import img_7 from '@/assets/images/candidates/img_07.jpg';
import img_8 from '@/assets/images/candidates/img_08.jpg';
import img_9 from '@/assets/images/candidates/img_09.jpg';

// data type
export type ICandidate = {
  id: number;
  img: StaticImageData;
  name: string;
  latestPosition: string;
  yearExperience: number;
  expectedSalary: string;
  education: string;
  status: string;
  score: string;
  // post: string;
  skills: string[];
  // salary: string;
  // location: string;
  // salary_duration: string;
  // experience: string;
  // favorite?: boolean;
  // qualification: string;
};

const candidate_data: ICandidate[] = [
  {
    id: 1,
    img: img_1,
    name: 'Julia Ark',
    latestPosition: 'Graphic Designer',
    yearExperience: 2,
    expectedSalary: '$30k-$50k',
    education: 'S1/DKV',
    status: 'assessment',
    score: '100%',
    skills: ['Digital', 'Design', 'UI', 'Figma', 'Photoshop'],
    // location:'California, US',
    // salary_duration:'yr',
    // experience:'Fresher',
    // favorite:true,
    // qualification:'Master’s Degree',
  },
  // {
  //   id: 2,
  //   img: img_2,
  //   name: 'Lucille Whitley',
  //   latestPosition: 'Fresh Graduate',
  //   yearExperience: 0,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/DKV',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Java', 'Developer', 'code', 'frontEnd'],
  //   // salary:'$3k-$4k',
  //   // location:'London, UK',
  //   // salary_duration:'mo',
  //   // experience:'Intermediate',
  //   // qualification:'Master’s Degree',
  // },
  // {
  //   id: 3,
  //   img: img_3,
  //   name: 'John Doe',
  //   latestPosition: 'UI/UX Designer',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Teknik Informatika',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Design', 'Product', 'UI', 'Brand', 'Figma', 'Photoshop'],
  //   // salary:'$300k-$400k',
  //   // location:'Dubai, UAE',
  //   // salary_duration:'wk',
  //   // experience:'No-Experience',
  //   // favorite:true,
  //   // qualification:'Bachelor Degree',
  // },
  // {
  //   id: 4,
  //   img: img_4,
  //   name: 'Larry Evans',
  //   latestPosition: 'Graphic Designer',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Seni Rupa',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Digital', 'UI', 'Design', 'Brand'],
  //   // salary:'$30k-$50k',
  //   // location:'New York, US',
  //   // experience:'Internship',
  //   // salary_duration:'mo',
  //   // qualification:'Master’s Degree',
  // },
  // {
  //   id: 5,
  //   img: img_2,
  //   name: 'Devin Anderson',
  //   latestPosition: 'Marketing Expert',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Manajemen',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Account', 'Finance', 'Marketing', 'Figma', 'Photoshop'],
  //   // salary:'$3k-$4k',
  //   // location:'Dubai, UAE',
  //   // salary_duration:'mo',
  //   // experience:'Expert',
  //   // favorite:true,
  //   // qualification:'None',
  // },
  // {
  //   id: 6,
  //   img: img_5,
  //   name: 'Sylvia Schenck',
  //   latestPosition: 'Data Entry',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Data Analyst',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Data', 'Entry', 'Microsoft Excel'],
  //   // salary:'$35k-$45k',
  //   // location:'Milan, Italy',
  //   // salary_duration:'mo',
  //   // experience:'Fresher',
  //   // qualification:'Bachelor Degree',
  // },
  // {
  //   id: 7,
  //   img: img_6,
  //   name: 'Shani Milar',
  //   latestPosition: 'Telemarketing & Sales',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Manajemen',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Telemarketing', 'Finance', 'Sales', 'Figma', 'Photoshop'],
  //   // salary:'$45k-$55k',
  //   // location:'California, US',
  //   // salary_duration:'yr',
  //   // favorite:true,
  //   // experience:'Intermediate',
  //   // qualification:'Master’s Degree',
  // },
  // {
  //   id: 8,
  //   img: img_2,
  //   name: 'Lucille Whitley',
  //   latestPosition: 'Marketing Expert',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Manajemen',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Java', 'Developer', 'Code'],
  //   // salary:'$5k-8k$',
  //   // location:'California, US',
  //   // salary_duration:'wk',
  //   // experience:'Internship',
  //   // qualification:'None',
  // },
  // {
  //   id: 9,
  //   img: img_7,
  //   name: 'Man Reese',
  //   latestPosition: 'Data Entry',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/Data Analyst',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Telemarketing', 'Finance', 'Sales'],
  //   // salary:'$40-45$',
  //   // location:'California, US',
  //   // salary_duration:'hr',
  //   // experience:'No-Experience',
  //   // qualification:'Bachelor Degree',
  // },
  // {
  //   id: 10,
  //   img: img_8,
  //   name: 'Ralph Espino',
  //   latestPosition: 'Graphic Designer',
  //   yearExperience: 2,
  //   expectedSalary: '$30k-$50k',
  //   education: 'S1/DKV',
  //   status: 'assessment',
  //   score: '100%',
  //   skills: ['Design', 'UI', 'Digital', 'Brand', 'Figma', 'Photoshop'],
  //   // salary:'$40k-$45k',
  //   // location:'Washington, US',
  //   // salary_duration:'yr',
  //   // favorite:true,
  //   // experience:'Expert',
  //   // qualification:'None',
  // },
];

export default candidate_data;
