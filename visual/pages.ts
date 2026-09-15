export type VisualPage = {
  name: string;
  path: string;
};

export const pages: VisualPage[] = [
  { name: "home", path: "." },
  { name: "hours", path: "hours/" },
  { name: "contact", path: "contact/" },
];
