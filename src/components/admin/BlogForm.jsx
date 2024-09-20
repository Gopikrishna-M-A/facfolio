import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Image, Type, FileText, Link as LinkIcon } from "lucide-react";
import axios from 'axios';

const formSchema = z.object({
  imageUrl: z.string().url("Must be a valid URL").optional(),
  title: z.string().min(1, "Title is required"),
  para: z.string().optional(),
  link: z.string().url("Must be a valid URL").optional(),
});

const BlogForm = ({ current, blogData, setBlogData, setIsDialogOpen, editMode }) => {
  const [currentStep, setCurrentStep] = useState('image');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: blogData[current],
  });

  const onSubmit = async (values) => {
    if (editMode) {
      try {
        const response = await axios.patch(`/api/blog?id=${blogData[current]._id}`, values);
        const updatedData = blogData.map((blog, index) => 
          index === current ? { ...blog, ...values } : blog
        );
        setBlogData(updatedData);
        setIsDialogOpen(false);
        console.log('PATCH request successful:', response.data.blog);
      } catch (error) {
        console.error('Error making PATCH request:', error.message);
      }
    } else {
      const valuesWithUser = {
        ...values,
        user: blogData[0].user
      };
      try {          
        const response = await axios.post(`/api/blog/`, valuesWithUser); 
        setBlogData((prevBlogData) => [...prevBlogData, response.data.blog]);         
        setIsDialogOpen(false);
        console.log('POST request successful:', response.data.blog);
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    }
  };

  const steps = [
    { id: 'image', title: 'Image' },
    { id: 'content', title: 'Content' },
    { id: 'link', title: 'Link' },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{editMode ? 'Edit Blog Post' : 'Add Blog Post'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(steps.findIndex(step => step.id === currentStep) + 1) * (100 / steps.length)} className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={currentStep} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {steps.map((step) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {step.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="image">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Image className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter image URL" {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="content">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Type className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter blog title" {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="para"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Textarea 
                            placeholder="Enter blog content" 
                            className="resize-none pl-8 pt-2" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="link">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Enter blog link" {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === steps[0].id}
              >
                Previous
              </Button>
              {currentStep === steps[steps.length - 1].id ? (
                <Button type="submit">Save Blog Post</Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;