
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Mail, Phone, User, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import OTPVerification from "@/components/auth/OTPVerification";

const Register = () => {
  const { t } = useTranslation();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [showOTP, setShowOTP] = useState(false);
  const [verificationContact, setVerificationContact] = useState("");
  const navigate = useNavigate();

  const emailSchema = z.object({
    email: z.string().email({ message: t('validation.validEmail') }),
    password: z
      .string()
      .min(8, { message: t('validation.passwordLength') }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: t('validation.acceptTerms'),
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordMatch'),
    path: ["confirmPassword"],
  });

  const phoneSchema = z.object({
    phone: z.string().min(8, { message: t('validation.validPhone') }),
    password: z
      .string()
      .min(8, { message: t('validation.passwordLength') }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: t('validation.acceptTerms'),
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordMatch'),
    path: ["confirmPassword"],
  });

  type EmailFormValues = z.infer<typeof emailSchema>;
  type PhoneFormValues = z.infer<typeof phoneSchema>;

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmitEmail = (data: EmailFormValues) => {
    console.log("Email registration data:", data);
    // For demo purposes, we'll trigger 2FA
    setVerificationContact(data.email);
    setShowOTP(true);
  };

  const onSubmitPhone = (data: PhoneFormValues) => {
    console.log("Phone registration data:", data);
    // For demo purposes, we'll trigger 2FA
    setVerificationContact(data.phone);
    setShowOTP(true);
  };

  const handleVerificationComplete = () => {
    // When OTP verification is complete, proceed with registration
    setShowOTP(false);
    toast.success(t('auth.registrationSuccess'));
    
    // Redirect to profile creation
    setTimeout(() => {
      navigate("/create-profile");
    }, 1500);
  };

  const handleResendCode = () => {
    // In a real app, this would trigger a new OTP to be sent
    console.log("Resending code to", verificationContact);
  };

  const handleCancelVerification = () => {
    setShowOTP(false);
  };

  // Show OTP verification screen if we're in verification mode
  if (showOTP) {
    return (
      <div className="container max-w-md mx-auto pt-8 pb-16">
        <OTPVerification
          phoneOrEmail={verificationContact}
          onVerificationComplete={handleVerificationComplete}
          onResendCode={handleResendCode}
          onCancel={handleCancelVerification}
        />
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto pt-8 pb-16">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">{t('auth.register')}</h1>
        <p className="text-gray-500">
          {t('auth.createAccountDescription')}
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
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-6">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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

              <FormField
                control={emailForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
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
                control={emailForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
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
                control={emailForm.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 mt-1"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte les{" "}
                        <Link to="/terms" className="text-medical-600 hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link to="/privacy" className="text-medical-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                S'inscrire <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-gray-500">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="font-medium text-medical-600 hover:underline">
                  Connectez-vous
                </Link>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="phone">
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="space-y-6">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
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

              <FormField
                control={phoneForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
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
                control={phoneForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
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
                control={phoneForm.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 mt-1"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        J'accepte les{" "}
                        <Link to="/terms" className="text-medical-600 hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link to="/privacy" className="text-medical-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                S'inscrire <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-gray-500">
                Vous avez déjà un compte?{" "}
                <Link to="/login" className="font-medium text-medical-600 hover:underline">
                  Connectez-vous
                </Link>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
