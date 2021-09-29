// Sanitize text (to lower case & remove [åäö]) and replace ' ' -> '-'.
export const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[äå]/g, 'a')
    .replace(/[ö]/g, 'o')
    .replace(/[^\w-]/g, '');
