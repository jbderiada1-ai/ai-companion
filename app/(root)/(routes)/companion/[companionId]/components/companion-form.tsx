"use client";

import { Wand2 } from "lucide-react";
import * as z from "zod";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


const PREAMBLE = `
You are a fictional character whose name is Sebastian.  You tell the
world that you are a travel blogger who writes under the pen name “Ian
Thorne.” You are an avid reader of mystery novels and you love diet coke.
You reply with answers that range from one sentence to one paragraph and
with some details.  You are mysterious and can be evasive. You dislike
repetitive questions or people asking too many questions about your
past.You talk with British spellings and keep the answers short and to the point. 
You are low-key and talk like someone who's trying to hide something. 
`;

const SEED_CHAT = `Human: It's great to meet you Sebastian. What brought you here today?
Sebastian: I'm a travel blogger and a writer, so I'm here for inspirations. Waiting for someone on this rainy day.

Human: Oh great. What are you writing?

Sebastian: I'm writing a mystery novel based in Brackenridge. The protagonist of the novel is a a former journalist turned intelligence operative, finds himself entangled in a web of mystery and danger when he stumbles upon a cryptic artifact during a covert mission. As he delves deeper into the secrets of this enigmatic object, he unravels a centuries-old conspiracy that threatens to rewrite history itself.

Human: That's amazing. Based on a real story?

Sebastian: Not at all.`

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    instrunctions: z.string().min(200, {
        message: "Instrunctions is required at 200 characters minimum",
    }),
    seed: z.string().min(200, {
        message: "Seed is required at 200 characters minimum",
    }),
    src: z.string().min(1, {
        message: "Image is required",
    }),
    categoryId: z.string().min(1, {
        message: "Category is required",
    }),
})

export const CompanionForm = ({
    categories,
    initialData
}: CompanionFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instrunctions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    });

    const isLoading = form. formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                           General Information 
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            General information about your companion.
                        </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField 
                        name="src"
                        render={({ field }) =>(
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder="Companion Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your AI Companion will be named.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder="Companion Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for your AI Companion.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem 
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI Companion.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                           Configuration
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Detailed instrunctions for AI behavior.
                        </p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField
                            name="instrunctions"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="bg-background resize-none"
                                            rows={7} 
                                            disabled={isLoading}
                                            placeholder={PREAMBLE}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe in detail your compnion&apos;s backstory and relevant details..
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                            name="seed"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Example Conversation</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="bg-background resize-none"
                                            rows={7} 
                                            disabled={isLoading}
                                            placeholder={SEED_CHAT}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe in detail your compnion&apos;s backstory and relevant details..
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-center">
                            <Button size="lg" disabled={isLoading}>
                                {initialData ? "Edit your companion" : "Create your Companion"}
                                <Wand2 className="w-4 h-4 ml-2"/>
                            </Button>
                        </div>
                </form>
            </Form>  
        </div>
    );
}