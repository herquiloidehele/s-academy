"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import useCourseStore from "@/app/teacher/products/courses/courseStore";
import ButtonElement, { ButtonShape, ButtonSize, FillType } from "@/components/shared/Button";

export const IModuleSchema = z.object({
  order: z.number(),
  name: z.string(),
  description: z.string().optional(),
});
export function ModuleFormDialog(props: { children: React.ReactNode; productID?: number }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openModulesCombobox, setOpenModulesCombobox] = React.useState(false);
  const modules = useCourseStore((state) => state.modules);
  const [value, setValue] = React.useState("");

  const form = useForm<z.infer<typeof IModuleSchema>>({
    resolver: zodResolver(IModuleSchema),
    defaultValues: {
      order: 0,
      name: "",
      description: "",
    },
  });

  async function onSubmit(values) {
    if (props.productID) {
      return;
    } else {
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Formúlario do Módulo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light leading-tight">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do módulo" {...field} />
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
                    <FormLabel className="font-light leading-tight">Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição do módulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light leading-tight">Posição</FormLabel>
                    <div className="flex flex-row gap-2 items-center">
                      <FormControl>
                        <Input type="number" placeholder="posição da aula" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <ButtonElement
                  type="submit"
                  fillType={FillType.FILLED}
                  shape={ButtonShape.SQUARE}
                  size={ButtonSize.SMALL}
                >
                  Gravar
                </ButtonElement>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
