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

export const ILessonSchema = z.object({
  id: z.string(),
  order: z.number(),
  videoRef: z.number(),
  title: z.string(),
  moduleId: z.string(),
  duration: z.string(),
  description: z.string().optional(),
  thumbnailUrl: z.string().url(),
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
      id: "",
      order: 0,
      videoRef: 0,
      title: "",
      moduleId: "",
      duration: "",
      description: "",
      thumbnailUrl: "",
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
          <DialogTitle>Lesson Form</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of the lesson" {...field} />
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
                      <Textarea placeholder="Brief description of the lesson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Module</FormLabel>
                <div className="flex-grow">
                  <Popover open={openModulesCombobox} onOpenChange={setOpenModulesCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openModulesCombobox}
                        className="w-full justify-between"
                      >
                        Select Products...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search Products..." />
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
                name="videoRef"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Reference</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Video reference ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="Duration (e.g., 20:30)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input placeholder="URL for the lesson thumbnail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Gravar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
