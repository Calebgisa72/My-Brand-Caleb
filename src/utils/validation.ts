import { z } from "zod";

export enum Proficiency {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}

const requiredString = z.string().trim().min(1, "Required");
const finishingDateSchema = z.union([z.date(), z.literal("present")]);

export const blogSchema = z.object({
  blogImage: requiredString,
  blogTitle: requiredString,
  blogShortDesc: requiredString,
  blogLongDesc: requiredString,
});

export interface comment {
  sender: string;
  comment: string;
}

export type blogSchemaProps = z.infer<typeof blogSchema>;
export type blogProps = blogSchemaProps & {
  createdAt: Date;
  comments: comment[];
  likes: number;
};

export const projectSchema = z.object({
  pImage: requiredString,
  pTitle: requiredString,
  pTechnologies: z
    .array(z.string())
    .min(3, "You must add at least 3 technologies."),
  pShortDesc: requiredString,
  pLongDesc: requiredString,
  pStartDate: z.date(),
  pEndDate: finishingDateSchema,
  pLink: z.string().url().optional(),
});

export type projectProps = z.infer<typeof projectSchema>;

export const skillSchema = z.object({
  title: z.string().nonempty("Title is required"),
  icon: z.string().nonempty("Icon URL is required").optional(),
  learntDate: z.date(),
  proficiency: z.nativeEnum(Proficiency, {
    errorMap: (issue, _ctx) => {
      if (issue.code === "invalid_enum_value") {
        return {
          message: `Invalid proficiency level. Valid levels are: ${Object.values(
            Proficiency
          ).join(", ")}`,
        };
      }
      return { message: "Invalid value" };
    },
  }),
  shortDescription: z.string().nonempty("Short description is required"),
  relatedLibraries: z.string().optional(),
  color: requiredString,
});

export type skillsProps = z.infer<typeof skillSchema>;

export const profileSchema = z.object({
  welcomeText: requiredString,
  name: requiredString,
  frontDescription: requiredString,
  aboutTitle: requiredString,
  aboutDescription: requiredString,
});

export type profileProps = z.infer<typeof profileSchema>;
