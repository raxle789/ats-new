import { IjobPostType } from '@/types/job-post-type';
import img_1 from '@/assets/images/candidates/img_01.jpg';
import img_2 from '@/assets/images/candidates/img_02.jpg';
import img_3 from '@/assets/images/candidates/img_03.jpg';
import img_4 from '@/assets/images/candidates/img_04.jpg';
import img_5 from '@/assets/images/candidates/img_05.jpg';
import img_6 from '@/assets/images/candidates/img_06.jpg';
// import img_7 from '@/assets/images/candidates/img_07.jpg';
// import img_8 from '@/assets/images/candidates/img_08.jpg';
// import img_9 from '@/assets/images/candidates/img_09.jpg';

const job_post_data: IjobPostType[] = [
  {
    id: 1,
    items: [
      {
        sub_id: 1,
        img: img_1,
        name: 'Julia Ark',
        latestPosition: 'Graphic Designer',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/DKV',
        status: 'assessment',
        score: '100%',
        skills: ['Digital', 'Design', 'UI', 'Figma', 'Photoshop'],
      },
      {
        sub_id: 2,
        img: img_4,
        name: 'Larry Evans',
        latestPosition: 'Graphic Designer',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/Seni Rupa',
        status: 'assessment',
        score: '100%',
        skills: ['Digital', 'UI', 'Design', 'Brand'],
      },
      {
        sub_id: 3,
        img: img_5,
        name: 'Sylvia Schenck',
        latestPosition: 'Data Entry',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/Data Analyst',
        status: 'assessment',
        score: '100%',
        skills: ['Data', 'Entry', 'Microsoft Excel'],
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        sub_id: 1,
        img: img_2,
        name: 'Lucille Whitley',
        latestPosition: 'Fresh Graduate',
        yearExperience: 0,
        expectedSalary: '$30k-$50k',
        education: 'S1/DKV',
        status: 'assessment',
        score: '100%',
        skills: ['Java', 'Developer', 'code', 'frontEnd'],
      },
      {
        sub_id: 2,
        img: img_2,
        name: 'Devin Anderson',
        latestPosition: 'Marketing Expert',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/Manajemen',
        status: 'assessment',
        score: '100%',
        skills: ['Account', 'Finance', 'Marketing', 'Figma', 'Photoshop'],
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        sub_id: 1,
        img: img_3,
        name: 'John Doe',
        latestPosition: 'UI/UX Designer',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/Teknik Informatika',
        status: 'assessment',
        score: '100%',
        skills: ['Design', 'Product', 'UI', 'Brand', 'Figma', 'Photoshop'],
      },
      {
        sub_id: 2,
        img: img_6,
        name: 'Shani Milar',
        latestPosition: 'Telemarketing & Sales',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/Manajemen',
        status: 'assessment',
        score: '100%',
        skills: ['Telemarketing', 'Finance', 'Sales', 'Figma', 'Photoshop'],
      },
      {
        sub_id: 3,
        img: img_2,
        name: 'Lucille Whitley',
        latestPosition: 'Marketing Expert',
        yearExperience: 2,
        expectedSalary: '$30k-$50k',
        education: 'S1/Manajemen',
        status: 'assessment',
        score: '100%',
        skills: ['Java', 'Developer', 'Code'],
      },
    ],
  },

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
  // },
];

export default job_post_data;
