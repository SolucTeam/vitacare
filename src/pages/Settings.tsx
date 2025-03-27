import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const Settings = () => {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">{t('common.settings')}</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Languages className="mr-2 h-5 w-5" />
            {t('common.language')}
          </CardTitle>
          <CardDescription>
            {t('settings.changeLanguage')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button
            variant={currentLanguage === 'en' ? 'default' : 'outline'}
            onClick={() => changeLanguage('en')}
            className="flex-1"
          >
            <span className="mr-2">🇬🇧</span> {t('languageSelection.english')}
          </Button>
          <Button
            variant={currentLanguage === 'fr' ? 'default' : 'outline'}
            onClick={() => changeLanguage('fr')}
            className="flex-1"
          >
            <span className="mr-2">🇫🇷</span> {t('languageSelection.french')}
          </Button>
        </CardContent>
      </Card>
      
      {/* Other settings can be added here */}
    </div>
  );
};

export default Settings;
