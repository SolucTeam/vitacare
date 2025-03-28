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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Mail, Phone, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import OTPVerification from "@/components/auth/OTPVerification";

const Login = () => {
  const { t } = useTranslation();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [showOTP, setShowOTP] = useState(false);
  const [verificationContact, setVerificationContact] = useState("");
  const navigate = useNavigate();

  const emailSchema = z.object({
    email: z.string().email({ message: "Veuillez saisir un email valide." }),
    password: z.string().min(1, { message: "Le mot de passe est requis." }),
    rememberMe: z.boolean().optional(),
  });

  const phoneSchema = z.object({
    phone: z.string().min(8, { message: "Veuillez saisir un numéro de téléphone valide." }),
    password: z.string().min(1, { message: "Le mot de passe est requis." }),
    rememberMe: z.boolean().optional(),
  });

  type EmailFormValues = z.infer<typeof emailSchema>;
  type PhoneFormValues = z.infer<typeof phoneSchema>;

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmitEmail = (data: EmailFormValues) => {
    console.log("Email login data:", data);
    
    // For demo purposes, we'll trigger 2FA
    setVerificationContact(data.email);
    setShowOTP(true);
  };

  const onSubmitPhone = (data: PhoneFormValues) => {
    console.log("Phone login data:", data);
    
    // For demo purposes, we'll trigger 2FA
    setVerificationContact(data.phone);
    setShowOTP(true);
  };

  const handleVerificationComplete = () => {
    // When OTP verification is complete, proceed with login
    setShowOTP(false);
    toast.success(t('auth.loginSuccess'));
    
    // For demo purposes we'll simulate logging in
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleResendCode = () => {
    // In a real app, this would trigger a new OTP to be sent
    console.log("Resending code to", verificationContact);
  };

  const handleCancelVerification = () => {
    setShowOTP(false);
  };

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
        <h1 className="text-3xl font-bold">{t('auth.login')}</h1>
        <p className="text-gray-500">
          {t('auth.connectToAccount')}
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

              <FormField
                control={emailForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('auth.password')}</FormLabel>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm font-medium text-medical-600 hover:underline"
                      >
                        {t('auth.forgotPassword')}
                      </Link>
                    </div>
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
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="leading-none">
                      <FormLabel>{t('auth.rememberMe')}</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" variant="medical" className="w-full">
                {t('auth.login')} <LogIn className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-gray-500">
                {t('auth.noAccount')}{" "}
                <Link to="/register" className="font-medium text-medical-600 hover:underline">
                  {t('auth.register')}
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

              <FormField
                control={phoneForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>{t('auth.password')}</FormLabel>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm font-medium text-medical-600 hover:underline"
                      >
                        {t('auth.forgotPassword')}
                      </Link>
                    </div>
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
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="leading-none">
                      <FormLabel>{t('auth.rememberMe')}</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" variant="medical" className="w-full">
                {t('auth.login')} <LogIn className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-gray-500">
                {t('auth.noAccount')}{" "}
                <Link to="/register" className="font-medium text-medical-600 hover:underline">
                  {t('auth.register')}
                </Link>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
