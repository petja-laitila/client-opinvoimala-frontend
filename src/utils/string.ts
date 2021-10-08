// Sanitize text (to lower case & remove [åäö]) and replace ' ' -> '-'.
export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[äå]/g, 'a')
    .replace(/[ö]/g, 'o')
    .replace(/[^\w-]/g, '');

export const validatePassword = (pw: string) => {
  const validLength = pw.length >= 8;
  const containsNumber = /\d/.test(pw);
  return validLength && containsNumber;
};
