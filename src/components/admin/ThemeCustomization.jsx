import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { HexColorPicker } from "react-colorful";

const ThemeCustomization = () => {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#3b82f6',
      secondary: '#10b981',
      background: '#ffffff',
      text: '#000000',
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 16,
    },
  });

  const [activeColor, setActiveColor] = useState('primary');

  const handleColorChange = (color) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        [activeColor]: color,
      },
    }));
  };

  const handleTypographyChange = (key, value) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      typography: {
        ...prevTheme.typography,
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log('Saving theme:', theme);
    // Add your save logic here
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Tabs defaultValue="colors">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
            </TabsList>
            <TabsContent value="colors">
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Customize your website's color palette</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Color to Edit</Label>
                    <Select
                      onValueChange={setActiveColor}
                      defaultValue={activeColor}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary Color</SelectItem>
                        <SelectItem value="secondary">Secondary Color</SelectItem>
                        <SelectItem value="background">Background Color</SelectItem>
                        <SelectItem value="text">Text Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Color Picker</Label>
                    <HexColorPicker color={theme.colors[activeColor]} onChange={handleColorChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Selected Color</Label>
                    <div 
                      className="w-full h-10 rounded"
                      style={{ backgroundColor: theme.colors[activeColor] }}
                    ></div>
                    <div className="text-center">{theme.colors[activeColor]}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="typography">
              <Card>
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                  <CardDescription>Adjust your website's fonts and text sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      onValueChange={(value) => handleTypographyChange('fontFamily', value)}
                      defaultValue={theme.typography.fontFamily}
                    >
                      <SelectTrigger id="fontFamily">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="OpenSans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Base Font Size (px)</Label>
                    <Slider
                      id="fontSize"
                      min={12}
                      max={24}
                      step={1}
                      value={[theme.typography.fontSize]}
                      onValueChange={([value]) => handleTypographyChange('fontSize', value)}
                    />
                    <div className="text-right">{theme.typography.fontSize}px</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your changes look in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                style={{
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: `${theme.typography.fontSize}px`,
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <h2 style={{ color: theme.colors.primary, marginBottom: '16px' }}>
                  Welcome to My Portfolio
                </h2>
                <p style={{ marginBottom: '16px' }}>
                  This is a preview of how your website might look with the current theme settings.
                </p>
                <button
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.background,
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Sample Button
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={handleSave}>Save Theme</Button>
      </div>
    </div>
  );
};


export default ThemeCustomization;