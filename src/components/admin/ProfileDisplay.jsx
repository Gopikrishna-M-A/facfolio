import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Edit } from "lucide-react";
import Image from "next/image";
import ProfileForm from "./ProfileForm";

const ProfileDisplay = ({ userData }) => {
  const [profileData, setProfileData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const setData = async () => {
      if(userData)
      setProfileData(userData.user);
    };
    setData();
  }, [userData?.user]);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const toggleVisibility = () => {
    // Implement the logic to toggle visibility
    // This is just a placeholder, you'll need to implement the actual API call
    setProfileData(prev => ({ ...prev, isVisible: !prev.isVisible }));
  };

  return (
    <div className="p-4">
      {profileData ? (
        <Card className={`${!profileData.isVisible ? 'opacity-50' : ''} transition-opacity duration-300`}>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={ profileData.customImageUrl || profileData.image}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                  {profileData.name}
                </h2>
              </div>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
              <p><strong>Slug:</strong> {profileData.slug}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" size="icon" onClick={toggleVisibility}>
              {profileData.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" onClick={handleEditClick}>
              <Edit className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center py-4">Loading...</div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <ProfileForm
            initialData={profileData}
            setProfileData={setProfileData}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDisplay;