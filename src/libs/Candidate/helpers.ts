export function objectToArray(object: any[]) {
  // console.log('object: ', object);
  let arrayOfSkills: string[] = [];
  object.map((skill) => arrayOfSkills.push(skill.skills.name));
  // console.log('arrayOfSkill: ', arrayOfSkills);
  return arrayOfSkills;
}
