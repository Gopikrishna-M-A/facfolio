import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Edit, Settings, Plus } from "lucide-react";
import HomeForm from './HomeForm';

const HomeDisplay = ({ userData }) => {
  const [homeData, setHomeData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setdata = async () => {
      if (userData?.home) {
        setHomeData(userData.home);
      }
      setIsLoading(false);
    }
    setdata();
  }, [userData?.home]);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const toggleVisibility = () => {
    // Implement the logic to toggle visibility
    // This is just a placeholder, you'll need to implement the actual API call
    setHomeData(prev => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const handleCreateHome = () => {
    setHomeData({
      ctaheading: "Welcome to My Home",
      ctapara: "This is a default paragraph. Click edit to customize your home page.",
      isVisible: true
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!homeData) {
    return (
      <div className="p-4">
        <Card className="text-center py-8">
          <CardContent>
            <p className="mb-4">No home data available. Create your home page now!</p>
            <Button onClick={handleCreateHome}>
              <Plus className="mr-2 h-4 w-4" /> Create Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className={`${!homeData.isVisible ? 'opacity-50' : ''} transition-opacity duration-300`}>
        <CardContent className="pt-6">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            {homeData.ctaheading}
          </h2>
          <p className="text-gray-600">{homeData.ctapara}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={toggleVisibility}>
            {homeData.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{homeData.ctaheading ? 'Edit Home' : 'Create Home'}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <HomeForm
            initialData={homeData}
            setHomeData={setHomeData}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default HomeDisplay;