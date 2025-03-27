
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import PatientProfileForm from "@/components/profile/PatientProfileForm";

const CreateProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{t('profile.createProfile')}</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('profile.createProfileDesc')}
          </p>
        </div>

        <PatientProfileForm />
      </div>
    </div>
  );
};

export default CreateProfile;
