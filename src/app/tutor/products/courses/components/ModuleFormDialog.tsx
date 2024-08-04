"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { IModuleDto } from "@/app/backend/business/course/CourseData";
import { IModuleSchema } from "@/app/tutor/products/courses/components/CourseSchemas";
import { toast } from "sonner";
import FormButtonWithLoader from "@/components/FormButton/FormButtonWithLoader";

export function ModuleFormDialog(props: { children: React.ReactNode; moduleId?: string }) {
  const [open, setOpen] = useState(false);
  const addModule = useCourseStore((state) => state.addModule);
  const updateModule = useCourseStore((state) => state.updateModule);
  const courseDto = useCourseStore((state) => state.courseDto);
  const [moduleData, setModuleData] = useState<IModuleDto | undefined>({} as IModuleDto);
  const loading = useCourseStore((state) => state.loading);

  const form = useForm<z.infer<typeof IModuleSchema>>({
    resolver: zodResolver(IModuleSchema),
    defaultValues: {
      order: moduleData?.order || courseDto?.modules?.length + 1 || 1,
      title: moduleData?.title || "",
      description: moduleData?.description || "",
    },
  });

  async function onSubmit(values) {
    const moduleValues = {
      id: props.moduleId,
      order: values.order,
      title: values.title,
      description: values.description,
    };

    if (props.moduleId !== undefined) {
      await updateModule(moduleValues);
      toast.success("Módulo atualizado com sucesso!");
    } else {
      await addModule(moduleValues);
      toast.success("Módulo adicionado com sucesso!");
    }

    setOpen(false);
  }

  useEffect(() => {
    if (props.moduleId !== undefined) {
      const moduleData = courseDto?.modules?.find((module) => module.id === props.moduleId);
      if (moduleData) {
        setModuleData(moduleData);
        form.reset({
          order: moduleData.order,
          title: moduleData.title,
          description: moduleData.description,
        });
      }
    }
  }, [props.moduleId, courseDto, form]);

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
                <DialogFooter>
                  <FormButtonWithLoader loading={loading} label={"Gravar"} />
                </DialogFooter>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
