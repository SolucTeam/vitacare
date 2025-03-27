
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelection = () => {
  const { t } = useTranslation();
  const { changeLanguage, setIsFirstVisit } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageSelect = (language: string) => {
    changeLanguage(language);
    setIsFirstVisit(false);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Languages className="h-12 w-12 mx-auto mb-4 text-medical-600" />
          <CardTitle className="text-2xl">{t('languageSelection.title')}</CardTitle>
          <CardDescription>
            {t('languageSelection.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-6 text-lg justify-start font-normal hover:bg-medical-50 hover:text-medical-700"
            onClick={() => handleLanguageSelect('en')}
          >
            <span className="font-bold mr-2">🇬🇧</span> {t('languageSelection.english')}
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg justify-start font-normal hover:bg-medical-50 hover:text-medical-700"
            onClick={() => handleLanguageSelect('fr')}
          >
            <span className="font-bold mr-2">🇫🇷</span> {t('languageSelection.french')}
          </Button>
          
          <Button 
            className="w-full mt-6" 
            onClick={() => {
              setIsFirstVisit(false);
              navigate('/');
            }}
          >
            {t('languageSelection.continue')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelection;
