"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CourseFormInformation(props) {
  const formSchema = z.object({
    name: z.string().min(1, { message: "O nome do curso é obrigatório." }),
    description: z
      .string()
      .min(1, { message: "A descrição do curso é obrigatória." })
      .max(500, { message: "A descrição não pode exceder 500 caracteres." }),
    price: z.number().min(0, { message: "O preço deve ser um número positivo." }),
    discount: z
      .number()
      .min(0, { message: "O desconto deve ser um número positivo." })
      .max(100, { message: "O desconto não pode exceder 100%." }),
    cover: z.string().url({ message: "A URL da imagem de capa deve ser válida." }),
    promo_video: z.string().url({ message: "A URL do vídeo promocional deve ser válida." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      categories: [],
      cover: "",
      promo_video: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className=" grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <div className="flex flex-row gap-2 items-center">
                    <FormControl>
                      <Input type="number" placeholder="price" {...field} />
                    </FormControl>
                    <span>Mtn</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disconto</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="disconto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capa</FormLabel>
                  <FormControl>
                    <Input placeholder="cover" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="promo_video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Promoção</FormLabel>
                  <FormControl>
                    <Input placeholder="url do video promocional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Próximo</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default CourseFormInformation;
