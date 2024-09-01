import { z } from "zod";

export enum Proficiency {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}

const requiredString = z.string().trim().min(5, "Required");

export const blogSchema = z.object({
  bImage: z.union([
    z.any().refine((files) => files instanceof FileList && files.length === 1, {
      message: "You must upload exactly one image file.",
    }),
    z.string().trim().min(2, "Required"),
  ]),
  bTitle: requiredString,
  bShortDesc: requiredString.max(
    200,
    "Description is too long. Maximum length is 200 characters."
  ),
  bLongDesc: requiredString.refine((val) => val !== "<div></div>", {
    message: "This field cannot be empty.",
  }),
});

export interface comment {
  sender: string;
  comment: string;
  _id: string;
}

export type blogSchemaProps = z.infer<typeof blogSchema>;
export type blogProps = blogSchemaProps & {
  _id: string;
  bDate: string;
  bComments: comment[];
  bNumOfLike: number;
};

const atLeastThreeSkills = z.string().refine(
  (val) => {
    const commaCount = (val.match(/,/g) || []).length;
    return commaCount >= 3;
  },
  {
    message: "Minimum of 3 techs (comma-separated) are required",
  }
);

export const projectSchema = z
  .object({
    pImage: z.union([
      z
        .any()
        .refine((files) => files instanceof FileList && files.length === 1, {
          message: "You must upload exactly one image file.",
        }),
      z.string().trim().min(2, "Required"),
    ]),
    pTitle: requiredString,
    pTechnologies: atLeastThreeSkills,
    pShortDesc: requiredString,
    pLongDesc: requiredString.max(150, "Maximum 150 characters"),
    pStartDate: z
      .string()
      .transform((str) => new Date(str))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid start date.",
      }),
    pEndDate: z
      .union([
        z
          .string()
          .nonempty("End date is required")
          .transform((str) => {
            if (str === "present") return str;
            const date = new Date(str);
            if (isNaN(date.getTime())) {
              throw new Error("Invalid end date.");
            }
            return date;
          }),
        z.date(),
        z.literal("present"),
      ])
      .refine((val) => val !== undefined, {
        message: "End date is required",
      }),
    pLink: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val))
      .refine(
        (val) => val === undefined || z.string().url().safeParse(val).success,
        {
          message: "Invalid URL format",
        }
      ),
  })
  .superRefine((data, ctx) => {
    const startDate = data.pStartDate;
    const endDate = data.pEndDate;

    if (
      endDate !== "present" &&
      endDate instanceof Date &&
      startDate instanceof Date
    ) {
      if (startDate > endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["pEndDate"],
          message: "End date cannot be before the start date.",
        });
      }
    }
  });

export type projectProps = z.infer<typeof projectSchema>;
export type projectExtendedProps = projectProps & {
  _id: string;
  pTechnologies: string[];
  createdAt: string;
};

export const skillSchema = z.object({
  title: z.string().nonempty("Title is required"),
  icon: z.union([
    z.any().refine((files) => files instanceof FileList && files.length === 1, {
      message: "You must upload exactly one image file.",
    }),
    z.string().trim().min(2, "Required"),
  ]),
  learntDate: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid start date.",
    }),
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
  shortDescription: z
    .string()
    .min(80, "Minimum 80 characters")
    .max(135, "Maximum 135 characters"),
  relatedLibraries: z.string().optional(),
  color: z.string().trim().min(2, "Required"),
});

export type SkillsProps = z.infer<typeof skillSchema>;
export type SkillsExtendedProps = SkillsProps & {
  _id: string;
  createdAt: string;
};

export const profileSchema = z.object({
  profileImage: z.union([
    z.any().refine((files) => files instanceof FileList && files.length === 1, {
      message: "You must upload exactly one image file.",
    }),
    z.string().trim().min(2, "Required"),
  ]),
  welcomeText: requiredString,
  name: requiredString,
  frontDescription: requiredString,
  aboutTitle: requiredString,
  aboutDescription: requiredString,
  school: requiredString,
  currentCourse: requiredString,
  experience: requiredString,
});

export type profileProps = z.infer<typeof profileSchema>;
