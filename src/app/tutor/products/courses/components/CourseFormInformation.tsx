"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/file-uploader/FileUploader";
import useCourseStore, { courseSelectors } from "@/app/tutor/products/courses/courseStore";
import { courseBasicInformationformSchema } from "@/app/tutor/products/courses/components/CourseSchemas";
import { MultiSelect } from "@/components/multi-selector/MultiSelect";
import { toast } from "sonner";
import FormButtonWithLoader from "@/components/FormButton/FormButtonWithLoader";
import { getCategoryOptions } from "@/utils/functions";
import ProgressbarWrapper from "@/app/tutor/products/courses/components/ProgressbarWrapper";
import { useGlobalStore } from "@/app/globalStore";

function CourseFormInformation() {
  const saveCourseDtoInfo = useCourseStore((state) => state.saveCourse);
  const updateCourseDtoInfo = useCourseStore((state) => state.updateCourse);
  const courseDto = useCourseStore((state) => state.courseDto);
  const categoriesOptions = useCourseStore((state) => state.categoriesOptions);
  const selectedCategories = useCourseStore((state) => state.selectedCategories);
  const setSelectedCategories = useCourseStore((state) => state.setSelectedCategories);
  const goToNextStep = useCourseStore((state) => state.goToNextStep);
  const loading = useGlobalStore((state) => state.loading);

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof courseBasicInformationformSchema>>({
    resolver: zodResolver(courseBasicInformationformSchema),
    defaultValues: {
      title: courseDto?.title || "",
      description: courseDto?.description || "",
      price: courseDto?.price || 0,
      discount: courseDto?.discount || 0,
      categories: courseDto?.categories || [],
      coverFile: courseDto?.coverUrl || "",
      promoVideoFile: courseDto?.promoVideoRef || 0,
    },
  });
  useEffect(() => {
    useGlobalStore.getState?.()?.setLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  async function onSubmit(values: z.infer<typeof courseBasicInformationformSchema>) {
    setIsLoading(true);
    try {
      const courseId = useCourseStore.getState?.().courseDto?.id;
      if (!courseId) {
        await saveCourseDtoInfo(values);
        toast.success("Informações do curso salvas com sucesso!");
      } else {
        await updateCourseDtoInfo({ ...values, id: courseId });
        toast.success("Informações do curso atualizadas com sucesso!");
      }

      if (!loading) goToNextStep();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setSelectedCategories(getCategoryOptions(courseDto?.categories || []));

    form.reset({
      title: courseDto?.title || "",
      description: courseDto?.description || "",
      price: courseDto?.price || 0,
      discount: courseDto?.discount || 0,
      categories: courseDto?.categories || [],
      coverFile: courseDto?.coverUrl || "",
      promoVideoFile: courseDto?.promoVideoRef || 0,
    });
  }, [courseDto]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-light text-lg leading-tight">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light leading-tight">Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" className="bg-smoothBackground" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light leading-tight">Categorias</FormLabel>
                  <FormControl>
                    <MultiSelect
                      selectedOptions={selectedCategories}
                      options={categoriesOptions}
                      onChange={(selected) => {
                        setSelectedCategories(selected);
                        field.onChange(selected.map((s) => s.value));
                      }}
                    ></MultiSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-light leading-tight">Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição" className="bg-smoothBackground" {...field} />
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
                  <FormLabel className="font-light leading-tight">Preço</FormLabel>
                  <div className="flex flex-row gap-2 items-center">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Preço"
                        className="bg-smoothBackground"
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <span>MZN</span>
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
                  <FormLabel className="font-light leading-tight">Desconto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Desconto"
                      className="bg-smoothBackground"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light leading-tight">Capa</FormLabel>
                  <FormControl>
                    <FileUploader
                      defaultFile={courseDto?.coverUrl}
                      id="coverFile"
                      mimeType="image/*"
                      fileTypes={["SVG", "PNG", "JPG"]}
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
              name="promoVideoFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light leading-tight">Vídeo Promoção</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-1">
                      <FileUploader
                        defaultFile={courseDto?.promoVideoRef}
                        id="promoVideoFile"
                        mimeType="video/*"
                        fileTypes={["MP4"]}
                        onFileChange={(file) => {
                          field.onChange(file);
                        }}
                      />
                      <ProgressbarWrapper selector={courseSelectors.progressPercentage} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <FormButtonWithLoader label={"Próximo"} loading={isLoading} />
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default CourseFormInformation;
