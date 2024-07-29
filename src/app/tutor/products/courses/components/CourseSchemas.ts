import { z } from "zod";

// Define um esquema para validação de URL
const urlSchema = z.string().url({ message: "Deve ser uma URL válida." });

// Define um esquema para validação de arquivos (só para tipos de arquivo específicos)
// Você pode precisar ajustar a validação conforme necessário para os tipos de arquivo aceitos
const fileSchema = z.instanceof(File).refine(
  (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
    return allowedTypes.includes(file.type);
  },
  { message: "Tipo de arquivo não suportado." },
);

// Define o esquema de validação para o formulário
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
  coverFile: z.union([fileSchema, urlSchema], { message: "Deve ser um arquivo válido ou uma URL válida." }),
  promoVideoFile: z.union([fileSchema, urlSchema], { message: "Deve ser um arquivo válido ou uma URL" }),
  categories: z.array(z.string()).nonempty({ message: "Selecione pelo menos uma categoria." }),
});

export const IModuleSchema = z.object({
  order: z.number(),
  title: z.string(),
  description: z.string().optional(),
});
