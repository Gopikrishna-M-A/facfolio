import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Type, Link, Tag, DollarSign, Users, Calendar, FileText } from "lucide-react";
import PublicationForm from './PublicationForm';
import axios from 'axios';
import { DatePicker } from '../DatePicker';

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  tags: z.string(),
  fundingSources: z.string(),
  fundingAmount: z.number().optional(),
  collaborators: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  publications: z.array(z.object({
    title: z.string().min(1, "Publication title is required"),
    authors: z.string(),
    conference: z.string().optional(),
    journal: z.string().optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear()),
    link: z.string().url("Must be a valid URL").optional().or(z.literal(''))
  }))
});

const ProjectForm = ({ current, projectData, setProjectData, setIsDialogOpen, editMode }) => {
  const [currentStep, setCurrentStep] = useState('basic');

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: projectData[current].title,
      description: projectData[current].description,
      link: projectData[current].link,
      tags: projectData[current].tags.join(', '),
      fundingSources: projectData[current].fundingSources.join(', '),
      fundingAmount: projectData[current].fundingAmount,
      collaborators: projectData[current].collaborators.join(', '),
      startDate: projectData[current].startDate ? new Date(projectData[current].startDate) : null,
      endDate: projectData[current].endDate ? new Date(projectData[current].endDate) : null,
      publications: projectData[current].publications.map(pub => ({
        ...pub,
        authors: pub.authors.join(', ')
      }))
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "publications"
  });

  const onSubmit = async (values) => {
    const newData = {
      ...values,
      tags: values.tags.split(',').map(item => item.trim()),
      fundingSources: values.fundingSources.split(',').map(item => item.trim()),
      collaborators: values.collaborators.split(',').map(item => item.trim()),
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      publications: values.publications.map(publication => ({
        ...publication,
        authors: publication.authors.split(',').map(item => item.trim())
      }))
    };

    if (editMode) {
      try {
        const response = await axios.patch(`/api/project?id=${projectData[current]._id}`, newData);
        const updatedData = projectData.map((project, index) => 
          index === current ? response.data.project : project
        );
        setProjectData(updatedData); 
        setIsDialogOpen(false);
        console.log('PATCH request successful:', response.data);
      } catch (error) {
        console.error('Error making PATCH request:', error.message);
      }
    } else {
      const valuesWithUser = {
        ...newData,
        user: projectData[0].user
      };
      try {
        const response = await axios.post(`/api/project`, valuesWithUser); 
        setProjectData((prevProjectData) => [...prevProjectData, response.data.project]);         
        setIsDialogOpen(false);
        console.log('POST request successful:', response.data.project);
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    }
  };

  const steps = [
    { id: 'basic', title: 'Basic Info' },
    { id: 'details', title: 'Details' },
    { id: 'funding', title: 'Funding' },
    { id: 'dates', title: 'Dates' },
    { id: 'publications', title: 'Papers' },
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
        <CardTitle>{editMode ? 'Edit Project' : 'Add Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(steps.findIndex(step => step.id === currentStep) + 1) * (100 / steps.length)} className="mb-4" />
        <Form {...form}>
          <Tabs value={currentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
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
                        <Input placeholder="Enter project title" {...field} className="pl-8" />
                      </div>
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
                      <div className="relative">
                        <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Textarea placeholder="Enter project description" {...field} className="pl-8 pt-2" />
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
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter project link" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter tags (comma-separated)" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collaborators"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collaborators</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter collaborators (comma-separated)" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="funding">
              <FormField
                control={form.control}
                name="fundingSources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Sources</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter funding sources (comma-separated)" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fundingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="number" placeholder="Enter funding amount" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="dates">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-8"
                    value={field.value ? field.value.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                      field.onChange(date);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-8"
                    value={field.value ? field.value.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                      field.onChange(date);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>
            <TabsContent value="publications">
              <PublicationForm control={form.control} register={form.register} />
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
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save Project</Button>
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

export default ProjectForm;