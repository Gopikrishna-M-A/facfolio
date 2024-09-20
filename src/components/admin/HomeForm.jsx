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
import { Type, AlignLeft } from "lucide-react";
import axios from 'axios';

const formSchema = z.object({
  ctaheading: z.string().min(1, "CTA Heading is required"),
  ctapara: z.string().min(1, "CTA Paragraph is required"),
});

const HomeForm = ({ initialData, setHomeData, setIsDialogOpen }) => {
  const [currentStep, setCurrentStep] = useState('heading');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.patch(`/api/home?id=${initialData._id}`, values);
      setHomeData(response.data.home);
      setIsDialogOpen(false);
      console.log('PATCH request successful:', response.data.home);
    } catch (error) {
      console.error('Error making PATCH request:', error.message);
    }
  };

  const steps = [
    { id: 'heading', title: 'CTA Heading' },
    { id: 'paragraph', title: 'CTA Paragraph' },
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
        <CardTitle>Update Home CTA</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(steps.findIndex(step => step.id === currentStep) + 1) * (100 / steps.length)} className="mb-4" />
        <Form {...form}>
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
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
            <TabsContent value="heading">
              <FormField
                control={form.control}
                name="ctaheading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Heading</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Type className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter CTA heading" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="paragraph">
              <FormField
                control={form.control}
                name="ctapara"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Paragraph</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AlignLeft className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Textarea 
                          placeholder="Enter CTA paragraph" 
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
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HomeForm;