
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { CalendarIcon, Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BloodType, UserProfile } from "@/types";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const PatientProfileForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newMedication, setNewMedication] = useState("");
  
  const profileSchema = z.object({
    fullName: z.string().min(1, { message: t('validation.required') }),
    dateOfBirth: z.date({
      required_error: t('validation.required'),
    }),
    gender: z.enum(["male", "female", "other"], {
      required_error: t('validation.required'),
    }),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const).optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactRelationship: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  });

  type ProfileFormValues = z.infer<typeof profileSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      gender: "male",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    // Create the user profile object
    const profile: UserProfile = {
      fullName: data.fullName,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      gender: data.gender,
      bloodType: data.bloodType,
      allergies: allergies.length > 0 ? allergies : undefined,
      chronicConditions: conditions.length > 0 ? conditions : undefined,
      medications: medications.length > 0 ? medications : undefined,
      emergencyContact: (data.emergencyContactName && data.emergencyContactPhone) ? {
        name: data.emergencyContactName,
        relationship: data.emergencyContactRelationship || "",
        phone: data.emergencyContactPhone,
      } : undefined,
      address: (data.street || data.city || data.state || data.postalCode || data.country) ? {
        street: data.street || "",
        city: data.city || "",
        state: data.state || "",
        postalCode: data.postalCode || "",
        country: data.country || "",
      } : undefined,
    };

    console.log("Profile data:", profile);
    toast.success(t('profile.savedSuccess'));
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const addItem = (
    item: string, 
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    inputSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (item.trim()) {
      setter(prev => [...prev, item.trim()]);
      inputSetter("");
    }
  };

  const removeItem = (
    index: number, 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.personalInfo')}</CardTitle>
            <CardDescription>{t('profile.personalInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.fullName')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('profile.dateOfBirth')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t('profile.pickDate')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.gender')}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('profile.selectGender')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">{t('profile.male')}</SelectItem>
                        <SelectItem value="female">{t('profile.female')}</SelectItem>
                        <SelectItem value="other">{t('profile.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.bloodType')}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('profile.selectBloodType')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('profile.medicalInfo')}</CardTitle>
            <CardDescription>{t('profile.medicalInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">{t('profile.allergies')}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    <span className="text-sm">{allergy}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(index, setAllergies)}
                      className="ml-1 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder={t('profile.typeAllergy')}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => addItem(newAllergy, setAllergies, setNewAllergy)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">{t('profile.chronicConditions')}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    <span className="text-sm">{condition}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(index, setConditions)}
                      className="ml-1 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder={t('profile.typeCondition')}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => addItem(newCondition, setConditions, setNewCondition)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">{t('profile.medications')}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {medications.map((medication, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    <span className="text-sm">{medication}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(index, setMedications)}
                      className="ml-1 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  placeholder={t('profile.typeMedication')}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => addItem(newMedication, setMedications, setNewMedication)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('profile.emergencyContact')}</CardTitle>
            <CardDescription>{t('profile.emergencyContactDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.emergencyName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContactRelationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.emergencyRelationship')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>{t('profile.emergencyPhone')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('profile.address')}</CardTitle>
            <CardDescription>{t('profile.addressDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('profile.street')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.city')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.state')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.postalCode')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profile.country')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            {t('common.cancel')}
          </Button>
          <Button type="submit">
            {t('profile.saveProfile')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientProfileForm;
