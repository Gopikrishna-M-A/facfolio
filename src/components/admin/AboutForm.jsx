import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { User, Quote, Linkedin, Twitter, Github, Heart, Briefcase, Book } from 'lucide-react';
import axios from 'axios';
import { FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

// Assuming EducationForm is implemented elsewhere
import EducationForm from './EducationForm';

const formSchema = z.object({
  userTag: z.string().min(1, "User Tag is required"),
  quote: z.string().min(1, "Quote is required"),
  linkedinurl: z.string().url("Must be a valid URL"),
  twitterurl: z.string().url("Must be a valid URL"),
  githuburl: z.string().url("Must be a valid URL"),
  interest: z.string().min(1, "Interests are required"),
  responsibilities: z.string().min(1, "Responsibilities are required"),
  expertise: z.string().min(1, "Expertise is required"),
  education: z.array(z.object({
    degree: z.string().min(1, "Degree is required"),
    school: z.string().min(1, "School is required"),
    year: z.number().int().min(1900, "Year must be 1900 or later").max(new Date().getFullYear(), "Year cannot be in the future"),
  })),
});

const AboutForm = ({ initialData, setAboutData, setIsDialogOpen }) => {
  const [step, setStep] = useState(0);
  const steps = ['Personal', 'Social', 'Professional', 'Education'];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      interest: initialData.interest.join(', '),
      responsibilities: initialData.responsibilities.join(', '),
      expertise: initialData.expertise.join(', '),
      education: initialData.education?.map(edu => ({
        ...edu,
        year: edu.year ? parseInt(edu.year, 10) : null // Convert to number or null if empty
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education"
  });

  const onSubmit = async (values) => {
    const updatedValues = {
      ...values,
      responsibilities: values.responsibilities.split(',').map(item => item.trim()),
      interest: values.interest.split(',').map(item => item.trim()),
      expertise: values.expertise.split(',').map(item => item.trim()),
    };
    
    try {
      const response = await axios.patch(`/api/about?id=${initialData._id}`, updatedValues);
      setAboutData(response.data.about);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error making PATCH request:', error.message);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">About You</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(step + 1) * 25} className="mb-4" />
        <Tabs value={steps[step]} onValueChange={(value) => setStep(steps.indexOf(value))}>
          <TabsList className="grid w-full grid-cols-4">
            {steps.map((tabStep, index) => (
              <TabsTrigger key={tabStep} value={tabStep} disabled={index > step}>
                {tabStep}
              </TabsTrigger>
            ))}
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <TabsContent value="Personal">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="userTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Tag</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quote</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Quote className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="Social">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="linkedinurl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FaLinkedinIn className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitterurl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <RiTwitterXLine className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="githuburl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Github className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="Professional">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interests</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Heart className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" placeholder="Separate interests with commas" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsibilities</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" placeholder="Separate responsibilities with commas" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expertise</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Book className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input {...field} className="pl-8" placeholder="Separate areas of expertise with commas" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="Education">
                <EducationForm 
                        fields={fields} 
                        append={() => append({ degree: '', school: '', year: null })}
                        remove={remove} 
                        control={form.control}
                />
              </TabsContent>
            </form>
          </Form>
        </Tabs>
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (step < steps.length - 1) {
                setStep((prev) => prev + 1);
              } else {
                form.handleSubmit(onSubmit)();
              }
            }}
          >
            {step < steps.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutForm;