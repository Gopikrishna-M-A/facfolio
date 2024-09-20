import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus, BookOpen, Users, Award, Calendar, Link } from "lucide-react";

const PublicationForm = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "publications"
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 border rounded">
          <FormField
            control={control}
            name={`publications.${index}.title`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BookOpen className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter title" {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`publications.${index}.authors`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Authors</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter authors (comma-separated)" {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`publications.${index}.conference`}
            render={({field }) => (
              <FormItem>
                <FormLabel>Conference</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Award className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter conference" {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`publications.${index}.journal`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journal</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BookOpen className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter journal" {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`publications.${index}.year`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter year" 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))} 
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`publications.${index}.link`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Link className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter publication link" {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
            className="mt-2"
          >
            <Minus className="h-4 w-4 mr-2" /> Remove Publication
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ title: '', authors: '', conference: '', journal: '', year: new Date().getFullYear(), link: '' })}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Publication
      </Button>
    </div>
  );
};

export default PublicationForm;