import { z } from "zod";

const urlSchema = z.string().url({ message: "Deve ser uma URL válida." });

// Define um esquema para validação de arquivos (só para tipos de arquivo específicos)
const fileSchema = z.instanceof(File).refine(
  (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/quicktime",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
      "application/pdf", // pdf
      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
    ];
    return allowedTypes.includes(file.type);
  },
  { message: "Tipo de arquivo não suportado." },
);

export const courseBasicInformationformSchema = z.object({
  title: z.string().min(1, { message: "O nome do curso é obrigatório." }),
  description: z
    .string()
    .min(1, { message: "A descrição do curso é obrigatória." })
    .max(500, { message: "A descrição não pode exceder 500 caracteres." }),
  price: z.number().min(0, { message: "O preço deve ser um número positivo." }),
  discount: z
    .number()
    .min(0, { message: "O desconto deve ser um número positivo." })
    .max(100, { message: "O desconto não pode exceder 100%." }),
  coverFile: z
    .any()
    .refine(
      (value) =>
        value === null ||
        value === undefined ||
        fileSchema.safeParse(value).success ||
        urlSchema.safeParse(value).success,
      { message: "Deve ser um arquivo válido ou uma URL válida." },
    )
    .optional()
    .nullable(),
  // promoVideoFile: z
  //   .any()
  //   .refine(
  //     (value) =>
  //       value === null ||
  //       value === undefined ||
  //       fileSchema.safeParse(value).success ||
  //       urlSchema.safeParse(value).success,
  //     { message: "Deve ser um arquivo válido ou uma URL válida." },
  //   )
  //   .optional()
  //   .nullable(),
  categories: z.array(z.string()).nonempty({ message: "Selecione pelo menos uma categoria." }),
});

export const IModuleSchema = z.object({
  order: z.number(),
  title: z.string(),
  description: z.string().optional(),
});

export const ILessonSchema = z.object({
  order: z.number(),
  title: z.string(),
  moduleId: z.string(),
  description: z.string().optional(),
  materialFile: z
    .union([fileSchema, urlSchema], { message: "Deve ser um arquivo válido ou uma URL válida." })
    .optional()
    .nullable(),
  videoFile: z.union([fileSchema, urlSchema], { message: "Deve ser um arquivo de video ou uma URL válida." }),
});
