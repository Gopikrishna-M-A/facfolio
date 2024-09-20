import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Edit, Settings, Linkedin, Twitter, Github, GraduationCap, Briefcase, Heart, Quote } from "lucide-react";
import AboutForm from './AboutForm';
import axios from 'axios';

import { FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";



const AboutDisplay = ({ userData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if(userData){
      setAboutData(userData.about);
      setIsVisible(userData.about.isVisible);
    }
  }, [userData]);

  useEffect(() => {
    const updateVisible = async () => {
      try {
        if(userData && aboutData)
        await axios.patch(`/api/about?id=${aboutData._id}`, { isVisible });
      } catch (err) {
        console.log(err);
      }
    };
    updateVisible();
  }, [isVisible, userData, aboutData]);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  if (!aboutData) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card className={`${!isVisible && 'opacity-50'} transition-opacity duration-300`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            {aboutData.userTag}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Info Section */}
            <div className="col-span-full space-y-4">
              <div className="flex items-center space-x-2">
                <Quote size={20} />
                <p className="italic text-gray-600">"{aboutData.quote}"</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center">
                  <Briefcase className="mr-2" size={20} /> Expertise
                </h3>
                <p>{aboutData.expertise.join(', ')}</p>
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Heart className="mr-2" size={20} /> Interests
              </h3>
              <p>{aboutData.interest.join(', ')}</p>
            </div>

            {/* Responsibilities Section */}
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <Briefcase className="mr-2" size={20} /> Responsibilities
              </h3>
              <p>{aboutData.responsibilities.join(', ')}</p>
            </div>

            {/* Social Links Section */}
            <div>
              <h3 className="font-semibold mb-2">Social Links</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                <FaLinkedinIn className="mr-2" size={20}/>
                  <a href={aboutData.linkedinurl} className="text-blue-500 hover:underline">{aboutData.linkedinurl}</a>
                </div>
                <div className="flex items-center">
                  <RiTwitterXLine className="mr-2" size={20}/> 

                  <a href={aboutData.twitterurl} className="text-blue-500 hover:underline">{aboutData.twitterurl}</a>
                </div>
                <div className="flex items-center">
                  <TbBrandGithubFilled className="mr-2" size={20}/> 
                  <a href={aboutData.githuburl} className="text-blue-500 hover:underline">{aboutData.githuburl}</a>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3 className="font-semibold flex items-center mb-2">
                <GraduationCap className="mr-2" size={20} /> Education
              </h3>
              {aboutData.education.map((edu, index) => (
                <p key={index} className="mb-2">{edu.degree} at {edu.school}, {edu.year}</p>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleEditClick}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit About</DialogTitle>
          </DialogHeader>
          <AboutForm
            initialData={aboutData}
            setAboutData={setAboutData}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutDisplay;