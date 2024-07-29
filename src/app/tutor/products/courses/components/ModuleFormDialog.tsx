"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { IModuleDto } from "@/app/backend/business/course/CourseData";
import { Button } from "@/components/ui/button";
import { IModuleSchema } from "@/app/tutor/products/courses/components/CourseSchemas";

export function ModuleFormDialog(props: { children: React.ReactNode; productID?: number }) {
  const [open, setOpen] = useState(false);
  const addModule = useCourseStore((state) => state.addModule);

  const form = useForm<z.infer<typeof IModuleSchema>>({
    resolver: zodResolver(IModuleSchema),
    defaultValues: {
      order: 0,
      title: "",
      description: "",
    },
  });

  async function onSubmit(values) {
    const moduleValues: IModuleDto = {
      order: values.order,
      title: values.title,
      description: values.description,
    };
    addModule(moduleValues);

    setOpen(false);
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light leading-tight">Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título do módulo" {...field} />
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
                        <Input
                          type="number"
                          placeholder="posição da aula"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="hover:bg-active hover:text-active-foreground">
                  Gravar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
