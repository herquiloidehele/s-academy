import { z } from "zod";

const urlSchema = z.string().url({ message: "Deve ser um endereço válido." });
const vimeoIDSchema = z.number({ message: "Deve ser um id válido." });

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
  title: z.string().min(5, { message: "O nome do curso deve ter no minimo 5 caracteres." }),
  description: z
    .string()
    .min(70, { message: "A descrição do curso deve ter no minimo 70 caracteres." })
    .max(2000, { message: "A descrição não pode exceder 200 caracteres." }),
  price: z.number().min(0, { message: "O preço deve ser um número positivo." }),
  discount: z
    .number()
    .min(0, { message: "O desconto deve ser um número positivo." })
    .max(100, { message: "O desconto não pode exceder 100%." }),
  coverFile: z.union([fileSchema, urlSchema], { message: "Deve ser um arquivo válido ou uma URL válida." }),
  promoVideoFile: z.union([fileSchema, vimeoIDSchema], { message: "Deve ser um arquivo válido" }).optional().nullable(),
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
  videoFile: z.union([fileSchema, vimeoIDSchema], { message: "Deve ser um arquivo válido" }).optional().nullable(),
});
