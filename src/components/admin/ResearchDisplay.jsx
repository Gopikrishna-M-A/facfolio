import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, EyeOff, Eye } from "lucide-react";
import axios from "axios";
import ResearchForm from "./ResearchForm";

const ResearchDisplay = ({ userData }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [researchData, setResearchData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const mockResearchData = [
    {
      user: userData?.user?._id,
      title: "Mock Research Title",
      subtitle: "Mock Research Subtitle",
      para: "This is a mock research paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      point1: "Mock Research Point 1",
      point2: "Mock Research Point 2",
      point3: "Mock Research Point 3",
    },
  ];

  useEffect(() => {
    if(userData)
    setResearchData(userData.research);
  }, [userData?.research]);

  const updateVisible = async (researchId, isVisible) => {
    try {
      const res = await axios.patch(`/api/research?id=${researchId}`, { isVisible });
      setResearchData((prevResearchData) =>
        prevResearchData.map((research) =>
          research._id === researchId ? { ...research, isVisible } : research
        )
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (index) => {
    setEditMode(index !== -1);
    setIsDialogOpen(true);
    setCurrent(index);
  };

  const handleDeleteClick = async (id) => {
    try {
      console.log("id to tdel",id );
      
      const res = await axios.delete(`/api/research?id=${id}`);
      console.log(res.data);
      const newData = researchData.filter((research) => research._id !== id);
      setResearchData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => handleEditClick(-1)}
        className="w-full"
        variant="outline"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Research
      </Button>

      <div className="grid md:grid-cols-2 gap-10">
      {researchData?.map((research, index) => (
        <Card
          key={research._id}
          className={`${!research.isVisible ? 'opacity-50' : ''} transition-opacity duration-300`}
        >
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              {research.title}
            </h2>
            {research.subtitle && <h3 className="text-xl mb-2">{research.subtitle}</h3>}
            {research.para && <p className="mb-4">{research.para}</p>}
            {research.point1 && (
              <p className="mb-2"><strong>1:</strong> {research.point1}</p>
            )}
            {research.point2 && (
              <p className="mb-2"><strong>2:</strong> {research.point2}</p>
            )}
            {research.point3 && (
              <p className="mb-2"><strong>3:</strong> {research.point3}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateVisible(research._id, !research.isVisible)}
            >
              {research.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEditClick(index)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the research item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteClick(research._id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Research" : "Add New Research"}</DialogTitle>
          </DialogHeader>
          <ResearchForm
            current={editMode ? current : 0}
            researchData={editMode ? researchData : mockResearchData}
            setResearchData={setResearchData}
            setIsDialogOpen={setIsDialogOpen}
            editMode={editMode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchDisplay;