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
import { Type, AlignLeft, List } from "lucide-react";
import axios from 'axios';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  para: z.string().optional(),
  point1: z.string().optional(),
  point2: z.string().optional(),
  point3: z.string().optional(),
});

const ResearchForm = ({ researchData, setResearchData, setIsDialogOpen, current, editMode }) => {
  const [currentStep, setCurrentStep] = useState('basic');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: researchData[current],
  });

  const onSubmit = async (values) => {
    if (editMode) {
      try {
        const response = await axios.patch(`/api/research?id=${researchData[current]._id}`, values);
        const updatedData = researchData.map((item, index) => 
          index === current ? { ...item, ...values } : item
        );
        setResearchData(updatedData);
        setIsDialogOpen(false);
        console.log('PATCH request successful:', response.data);
      } catch (error) {
        console.error('Error making PATCH request:', error.message);
      }
    } else {
      try {
        const valuesWithUser = {
          ...values,
          user: researchData[0].user
        };
        const response = await axios.post(`/api/research`, valuesWithUser);
        setResearchData((prevResearchData) => [...prevResearchData, response.data.research]);
        setIsDialogOpen(false);
        console.log('POST request successful:', response.data.research);
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    }
  };

  const steps = [
    { id: 'basic', title: 'Basic Info' },
    { id: 'details', title: 'Details' },
    { id: 'points', title: 'Key Points' },
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
        <CardTitle>{editMode ? 'Edit Research' : 'Add Research'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(steps.findIndex(step => step.id === currentStep) + 1) * (100 / steps.length)} className="mb-4" />
        <Form {...form}>
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
            <TabsContent value="basic">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Type className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter title" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Type className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter subtitle" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="details">
              <FormField
                control={form.control}
                name="para"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paragraph</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AlignLeft className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Textarea placeholder="Enter paragraph" {...field} className="pl-8 pt-2" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="points">
              {['point1', 'point2', 'point3'].map((point, index) => (
                <FormField
                  key={point}
                  control={form.control}
                  name={point}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Point {index + 1}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <List className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder={`Enter point ${index + 1}`} {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
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
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
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

export default ResearchForm;