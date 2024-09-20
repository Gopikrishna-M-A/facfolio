import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, GraduationCap, School, Calendar } from "lucide-react";

const EducationForm = ({ fields, append, remove, control }) => {
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <Card key={field.id} className="shadow-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <GraduationCap className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter degree" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.school`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <School className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter school" {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`education.${index}.year`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="number" 
                          placeholder="Enter year" 
                          {...field} 
                          value={field.value ?? ''} // Use nullish coalescing to handle null/undefined
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : parseInt(value, 10));
                          }}
                          onBlur={(e) => {
                            field.onBlur();
                            if (e.target.value === '') {
                              field.onChange(null);
                            }
                          }}
                          min={1900}
                          max={new Date().getFullYear()}
                          className="pl-8" 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => remove(index)}
              className="mt-4"
            >
              <Minus className="mr-2 h-4 w-4" /> Remove Entry
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => append({ degree: '', school: '', year: null })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
};

export default EducationForm;