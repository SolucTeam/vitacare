
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Mail, Phone, ArrowRight, ArrowLeft, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import OTPVerification from "@/components/auth/OTPVerification";

const PasswordRecovery = () => {
  const { t } = useTranslation();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [stage, setStage] = useState<"request" | "verify" | "reset">("request");
  const [contactInfo, setContactInfo] = useState("");
  const navigate = useNavigate();

  // Schema for the request stage (email or phone)
  const requestSchema = z.object({
    contact: z.string().min(1, { message: t('validation.required') }),
  });

  // Schema for the reset stage (new password)
  const resetSchema = z.object({
    password: z
      .string()
      .min(8, { message: t('validation.passwordLength') }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordMatch'),
    path: ["confirmPassword"],
  });

  type RequestFormValues = z.infer<typeof requestSchema>;
  type ResetFormValues = z.infer<typeof resetSchema>;

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      contact: "",
    },
  });

  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitRequest = (data: RequestFormValues) => {
    console.log("Recovery request:", data);
    setContactInfo(data.contact);
    setStage("verify");
  };

  const onSubmitReset = (data: ResetFormValues) => {
    console.log("New password:", data);
    toast.success(t('auth.passwordResetSuccess'));
    
    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleVerificationComplete = () => {
    setStage("reset");
  };

  const handleResendCode = () => {
    console.log("Resending code to", contactInfo);
    toast.info(t('auth.otpResent'));
  };

  const handleGoBack = () => {
    if (stage === "verify") {
      setStage("request");
    } else if (stage === "reset") {
      setStage("verify");
    }
  };

  if (stage === "verify") {
    return (
      <div className="container max-w-md mx-auto pt-8 pb-16">
        <OTPVerification
          phoneOrEmail={contactInfo}
          onVerificationComplete={handleVerificationComplete}
          onResendCode={handleResendCode}
          onCancel={handleGoBack}
        />
      </div>
    );
  }

  if (stage === "reset") {
    return (
      <div className="container max-w-md mx-auto pt-8 pb-16">
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-3xl font-bold">{t('auth.resetPassword')}</h1>
          <p className="text-gray-500">
            {t('auth.createNewPassword')}
          </p>
        </div>

        <Form {...resetForm}>
          <form onSubmit={resetForm.handleSubmit(onSubmitReset)} className="space-y-6">
            <FormField
              control={resetForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.newPassword')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button" 
                variant="outline"
                onClick={handleGoBack}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back')}
              </Button>
              <Button type="submit" variant="medical" className="flex-1">
                {t('auth.resetPassword')} <KeyRound className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto pt-8 pb-16">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">{t('auth.forgotPassword')}</h1>
        <p className="text-gray-500">
          {t('auth.forgotPasswordDescription')}
        </p>
      </div>

      <Tabs defaultValue="email" onValueChange={(value) => setMethod(value as "email" | "phone")}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {t('auth.email')}
          </TabsTrigger>
          <TabsTrigger value="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {t('auth.phone')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Form {...requestForm}>
            <form onSubmit={requestForm.handleSubmit(onSubmitRequest)} className="space-y-6">
              <FormField
                control={requestForm.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.email')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="votre@email.com" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="medical" className="w-full">
                {t('auth.sendRecoveryLink')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm">
                <Button 
                  variant="link" 
                  onClick={() => navigate("/login")}
                  className="text-medical-600"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t('auth.backToLogin')}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="phone">
          <Form {...requestForm}>
            <form onSubmit={requestForm.handleSubmit(onSubmitRequest)} className="space-y-6">
              <FormField
                control={requestForm.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.phoneNumber')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="+225 XX XX XX XX" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="medical" className="w-full">
                {t('auth.sendRecoveryCode')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm">
                <Button 
                  variant="link" 
                  onClick={() => navigate("/login")}
                  className="text-medical-600"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t('auth.backToLogin')}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PasswordRecovery;
