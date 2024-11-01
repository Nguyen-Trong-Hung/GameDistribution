import slugify from "slugify";

export const createSlug = (name, id) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  return `${slug}-${id}`;
};
