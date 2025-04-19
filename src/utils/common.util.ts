export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i:${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i:");
  return arr[arr.length - 1];
};

export const removeSpecialCharacter = (str: string) =>
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );
