export const slugify = (str: string): string => {
  return str
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^\sA-Z0-9]+/gi, "")
    .replace(/[\s]+/g, "-");
};
