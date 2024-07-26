"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import useCourseStore from "@/app/teacher/products/courses/courseStore";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import ButtonElement, { ButtonShape, ButtonSize, FillType } from "@/components/shared/Button";

export const ILessonSchema = z.object({
  order: z.number(),
  title: z.string(),
  description: z.string().optional(),
});
export function LessonFormDialog(props: { children: React.ReactNode; productID?: number }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openModulesCombobox, setOpenModulesCombobox] = React.useState(false);
  const modules = useCourseStore((state) => state.modules);
  const [value, setValue] = React.useState("");

  const form = useForm<z.infer<typeof ILessonSchema>>({
    resolver: zodResolver(ILessonSchema),
    defaultValues: {
      order: 0,
      title: "",
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
          <DialogTitle>Formúlario da Aula</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormLabel className="font-light leading-tight">Module</FormLabel>
                <div className="flex-grow">
                  <Popover open={openModulesCombobox} onOpenChange={setOpenModulesCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openModulesCombobox}
                        className="w-full justify-between"
                      >
                        Selecionar Módulo...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Procurar módulo..." />
                        <CommandEmpty>No Products found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {modules &&
                              modules.map((module, index) => (
                                <CommandItem
                                  key={index}
                                  value={module.id.toString()}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue);
                                  }}
                                >
                                  <Check
                                    className={cn("mr-2 h-4 w-4", value === module.id ? "opacity-100" : "opacity-0")}
                                  />
                                  {module.title}
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
