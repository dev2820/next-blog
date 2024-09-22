const author = {
  name: process.env.author,
  email: process.env.email,
  profile: process.env.profile,
};

export const getAuthor = () => {
  return author;
};
