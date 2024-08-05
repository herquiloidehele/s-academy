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
import FileUploader from "@/components/file-uploader/FileUploader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ILessonSchema } from "@/app/tutor/products/courses/components/CourseSchemas";
import { v4 as uuidv4 } from "uuid";
import { ILessonDto } from "@/app/backend/business/course/CourseData";
import { toast } from "sonner";
import FormButtonWithLoader from "@/components/FormButton/FormButtonWithLoader";

export function LessonFormDialog(props: { children: React.ReactNode; lessonId?: string; moduleId: string }) {
  const [open, setOpen] = useState(false);
  const [openModulesCombobox, setOpenModulesCombobox] = useState(false);
  const addLesson = useCourseStore((state) => state.addLesson);
  const updateLesson = useCourseStore((state) => state.updateLesson);
  const courseDto = useCourseStore((state) => state.courseDto);
  const modules = courseDto?.modules || [];
  const [lessonData, setLessonData] = useState<ILessonDto | undefined>({} as ILessonDto);
  const loading = useCourseStore((state) => state.loading);
  const videoUploadPercentage = useCourseStore((state) => state.videoUploadPercentage);

  const form = useForm<z.infer<typeof ILessonSchema>>({
    resolver: zodResolver(ILessonSchema),
    defaultValues: {
      order: 1,
      title: "",
      description: "",
      moduleId: props.moduleId,
      materialFile: undefined,
      videoFile: "",
    },
  });

  useEffect(() => {
    const moduleData = courseDto?.modules?.find((module) => module.id === props.moduleId);
    if (moduleData) {
      form.reset({
        order: (moduleData.lessons?.length || 0) + 1,
        moduleId: props.moduleId,
      });
    }

    if (props.lessonId) {
      const lessonData = moduleData?.lessons?.find((lesson) => lesson.id === props.lessonId);
      if (lessonData) {
        setLessonData(lessonData);
        form.reset({
          order: lessonData.order,
          title: lessonData.title,
          description: lessonData.description,
          moduleId: lessonData.moduleId,
          materialFile: lessonData.materialFile,
          videoFile: lessonData.videoFile,
        });
      }
    }
  }, [props.lessonId, courseDto, props.moduleId, form]);

  async function onSubmit(values: z.infer<typeof ILessonSchema>) {
    const lessonValues = {
      id: props.lessonId || uuidv4(),
      order: values.order,
      title: values.title,
      description: values.description,
      moduleId: values.moduleId,
      materialFile: values.materialFile,
      videoFile: values.videoFile,
    };

    if (props.lessonId) {
      await updateLesson(lessonValues as ILessonDto);
      toast.success("Aula atualizada com sucesso!");
    } else {
      await addLesson(lessonValues as ILessonDto);
      toast.success("Aula adicionada com sucesso!");
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="w-[90vw] max-h-[90vh] h-fit max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Formulário da Aula</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4 py-4 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-light leading-tight">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="nome da aula" {...field} />
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
                        <Textarea placeholder="Descrição da aula" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="font-light leading-tight">Módulo</FormLabel>
                  <div className="flex-grow">
                    <Popover open={openModulesCombobox} onOpenChange={setOpenModulesCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openModulesCombobox}
                          className="w-full justify-between"
                        >
                          {modules.find((module) => module.id === form.watch("moduleId"))?.title ||
                            "Selecione um módulo"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Procurar módulo..." />
                          <CommandEmpty>Sem módulos registados.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {modules.map((module) => (
                                <CommandItem
                                  key={module.id}
                                  value={module.id}
                                  onSelect={() => {
                                    form.setValue("moduleId", module.id);
                                    setOpenModulesCombobox(false); // Fecha o popover
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.watch("moduleId") === module.id ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  <span className="text-gray-500 font-light">{module.title}</span>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
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

                <FormField
                  control={form.control}
                  name="videoFile"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="font-light leading-tight">Video Aula</FormLabel>
                      <FormControl>
                        <FileUploader
                          loading={loading}
                          defaultFile={lessonData?.videoFile}
                          uploadedPercentage={videoUploadPercentage}
                          mimeType="video/*"
                          fileTypes={["MP4"]}
                          onFileChange={(file) => {
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialFile"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="font-light leading-tight">Material da aula</FormLabel>
                      <FormControl>
                        <FileUploader
                          defaultFile={lessonData?.materialUrl}
                          mimeType="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          fileTypes={["PDF", "DOCX", "PPTX"]}
                          onFileChange={(file) => {
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <FormButtonWithLoader loading={loading} label={"Gravar"} />
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}