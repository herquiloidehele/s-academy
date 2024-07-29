import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/file-uploader/FileUploader";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { courseBasicInformationformSchema } from "@/app/tutor/products/courses/components/CourseSchemas";
import { MultiSelect } from "@/components/multi-selector/MultiSelect";

function CourseFormInformation() {
  const saveCourseDtoInfo = useCourseStore((state) => state.saveCourseDtoInfo);
  const courseDto = useCourseStore((state) => state.courseDto);
  const categoriesOptions = useCourseStore((state) => state.categoriesOptions);
  const selectedCategories = useCourseStore((state) => state.selectedCategories);
  const setSelectedSelectedCategories = useCourseStore((state) => state.setSelectedSelectedCategories);

  const form = useForm<z.infer<typeof courseBasicInformationformSchema>>({
    resolver: zodResolver(courseBasicInformationformSchema),
    defaultValues: {
      title: courseDto.title,
      description: courseDto.description,
      price: courseDto.price,
      discount: courseDto.discount,
      categories: courseDto.categories || [],
      coverFile: courseDto.coverUrl,
      promoVideoFile: courseDto.promoVideoRef?.toString(),
    },
  });

  async function onSubmit(values: z.infer<typeof courseBasicInformationformSchema>) {
    saveCourseDtoInfo(values);
  }

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
              name="description"
              render={({ field }) => (
                <FormItem>
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
                  <FormLabel className="font-light leading-tight">Desconto (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Desconto"
                      className="bg-smoothBackground"
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
              name="categories"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-light leading-tight">Categorias</FormLabel>
                  <FormControl>
                    <MultiSelect
                      selectedOptions={selectedCategories}
                      options={categoriesOptions}
                      onChange={(selected) => {
                        setSelectedSelectedCategories(selected);
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
              name="coverFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light leading-tight">Capa</FormLabel>
                  <FormControl>
                    <FileUploader
                      defaultFile={courseDto.coverFile}
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
                    <FileUploader
                      defaultFile={courseDto.promoVideoFile}
                      id="promoVideoFile"
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
          </div>
          <DialogFooter>
            <Button className="hover:bg-green-600" type="submit">
              Próximo
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default CourseFormInformation;