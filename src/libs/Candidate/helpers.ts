export function objectToArray(object: any[]) {
  let arrayOfSkills: string[] = [];
  object.map(skill => arrayOfSkills.push(skill.skills.name));
  return arrayOfSkills;
};