
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
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2, ChevronRight } from "lucide-react";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BloodType } from "@/types";

const profileSchema = z.object({
  fullName: z.string().min(3, { message: "Le nom complet est requis." }),
  dateOfBirth: z.date({ required_error: "La date de naissance est requise." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Le genre est requis.",
  }),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Le groupe sanguin est requis.",
  }).optional(),
  allergies: z.array(z.string()).optional(),
  chronicConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  emergencyContact: z
    .object({
      name: z.string().min(3, { message: "Le nom est requis." }),
      relationship: z.string().min(1, { message: "La relation est requise." }),
      phone: z.string().min(8, { message: "Le numéro de téléphone est requis." }),
    })
    .optional(),
  address: z
    .object({
      street: z.string().min(1, { message: "L'adresse est requise." }),
      city: z.string().min(1, { message: "La ville est requise." }),
      state: z.string().min(1, { message: "La région est requise." }),
      postalCode: z.string().optional(),
      country: z.string().min(1, { message: "Le pays est requis." }),
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const CreateProfile = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [allergyInput, setAllergyInput] = useState("");
  const [conditionInput, setConditionInput] = useState("");
  const [medicationInput, setMedicationInput] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      gender: "male",
      allergies: [],
      chronicConditions: [],
      medications: [],
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Côte d'Ivoire",
      },
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile data:", data);
    toast.success("Profil créé avec succès!");
    
    // For demo purposes we'll simulate creating a profile
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const addAllergy = () => {
    if (allergyInput.trim()) {
      const current = form.getValues("allergies") || [];
      form.setValue("allergies", [...current, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const removeAllergy = (index: number) => {
    const current = form.getValues("allergies") || [];
    form.setValue(
      "allergies",
      current.filter((_, i) => i !== index)
    );
  };

  const addCondition = () => {
    if (conditionInput.trim()) {
      const current = form.getValues("chronicConditions") || [];
      form.setValue("chronicConditions", [...current, conditionInput.trim()]);
      setConditionInput("");
    }
  };

  const removeCondition = (index: number) => {
    const current = form.getValues("chronicConditions") || [];
    form.setValue(
      "chronicConditions",
      current.filter((_, i) => i !== index)
    );
  };

  const addMedication = () => {
    if (medicationInput.trim()) {
      const current = form.getValues("medications") || [];
      form.setValue("medications", [...current, medicationInput.trim()]);
      setMedicationInput("");
    }
  };

  const removeMedication = (index: number) => {
    const current = form.getValues("medications") || [];
    form.setValue(
      "medications",
      current.filter((_, i) => i !== index)
    );
  };

  const nextStep = async () => {
    const fields = [
      ["fullName", "dateOfBirth", "gender"],
      ["allergies", "chronicConditions", "medications", "bloodType"],
      ["emergencyContact.name", "emergencyContact.relationship", "emergencyContact.phone"],
      ["address.street", "address.city", "address.state", "address.country"],
    ];

    // Create a subset of schema for the current step
    let stepValid = true;

    if (formStep === 0) {
      const isValid = await form.trigger(["fullName", "dateOfBirth", "gender"]);
      if (isValid) setFormStep(1);
    } else if (formStep === 1) {
      setFormStep(2);
    } else if (formStep === 2) {
      const isValid = await form.trigger([
        "emergencyContact.name",
        "emergencyContact.relationship",
        "emergencyContact.phone",
      ]);
      if (isValid) setFormStep(3);
    } else if (formStep === 3) {
      const isValid = await form.trigger([
        "address.street",
        "address.city",
        "address.state",
        "address.country",
      ]);
      if (isValid) form.handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    setFormStep(Math.max(0, formStep - 1));
  };

  return (
    <div className="container max-w-2xl mx-auto pt-8 pb-16">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Créer votre profil médical</h1>
        <p className="text-gray-500">
          Ces informations nous aideront à mieux vous servir
        </p>
      </div>

      <div className="flex justify-between mb-8">
        {[0, 1, 2, 3].map((step) => (
          <div
            key={step}
            className={cn(
              "flex flex-col items-center",
              formStep >= step ? "text-medical-600" : "text-gray-400"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                formStep >= step
                  ? "bg-medical-600 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {step + 1}
            </div>
            <span className="text-xs">
              {step === 0
                ? "Informations de base"
                : step === 1
                ? "Informations médicales"
                : step === 2
                ? "Contact d'urgence"
                : "Adresse"}
            </span>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form className="space-y-6">
          {formStep === 0 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de naissance</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
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
                  <FormItem className="space-y-3">
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Homme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Femme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Autre</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {formStep === 1 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Groupe sanguin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un groupe sanguin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Facultatif, mais utile en cas d'urgence médicale
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Allergies</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ajouter une allergie"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAllergy();
                      }
                    }}
                  />
                  <Button type="button" onClick={addAllergy} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  {form.watch("allergies")?.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 py-2 px-3 rounded mt-2"
                    >
                      <span>{allergy}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAllergy(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <FormDescription>
                  Ajoutez toutes vos allergies connues
                </FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Conditions chroniques</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ajouter une condition"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCondition();
                      }
                    }}
                  />
                  <Button type="button" onClick={addCondition} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  {form.watch("chronicConditions")?.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 py-2 px-3 rounded mt-2"
                    >
                      <span>{condition}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCondition(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <FormDescription>
                  Ajoutez toutes vos conditions médicales chroniques
                </FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Médicaments actuels</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ajouter un médicament"
                    value={medicationInput}
                    onChange={(e) => setMedicationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addMedication();
                      }
                    }}
                  />
                  <Button type="button" onClick={addMedication} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2">
                  {form.watch("medications")?.map((medication, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 py-2 px-3 rounded mt-2"
                    >
                      <span>{medication}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMedication(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <FormDescription>
                  Ajoutez tous les médicaments que vous prenez actuellement
                </FormDescription>
              </FormItem>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                <h3 className="font-medium text-lg mb-2">Contact d'urgence</h3>
                <p className="text-gray-500 text-sm">
                  Qui devons-nous contacter en cas d'urgence médicale?
                </p>
              </div>

              <FormField
                control={form.control}
                name="emergencyContact.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContact.relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relation</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Conjoint, Parent, Ami" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyContact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="+225 XX XX XX XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {formStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                <h3 className="font-medium text-lg mb-2">Adresse</h3>
                <p className="text-gray-500 text-sm">
                  Votre adresse nous aide à vous recommander des médecins proches de chez vous
                </p>
              </div>

              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Rue et numéro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <FormControl>
                        <Input placeholder="Ville" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Région</FormLabel>
                      <FormControl>
                        <Input placeholder="Région" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code postal</FormLabel>
                      <FormControl>
                        <Input placeholder="Code postal (facultatif)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <FormControl>
                        <Input placeholder="Pays" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={formStep === 0}
            >
              Précédent
            </Button>
            <Button type="button" onClick={nextStep}>
              {formStep === 3 ? "Créer profil" : "Suivant"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProfile;
