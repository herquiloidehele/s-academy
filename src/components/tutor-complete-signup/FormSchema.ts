"use client";

import { z } from "zod";
import { RegexPatterns } from "@/utils/Constants";

export interface ITutorSignupForm {
  id?: string;
  name: string;
  phoneNumber: string;
  description: string;
  userId: string;
  isRegistrationComplete: boolean;
}

export const tutorSingnupFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(5, "Mínimo 5 Caracteres").max(255),
  phoneNumber: z.string().regex(RegexPatterns.PHONE_NUMBER, "Número de telefone inválido"),
  description: z.string().min(10, "Descrição muito curta").max(500, "Descrição muito longa"),
  userId: z.string(),
  isRegistrationComplete: z.boolean(),
});
