
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Users, MessageSquare, Globe, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond shortly.",
      variant: "default"
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-medical-600" />,
      title: "Phone",
      details: [
        "+1 (234) 567-890",
        "+1 (234) 567-891"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-medical-600" />,
      title: "Email",
      details: [
        "info@vitacare.com",
        "support@vitacare.com"
      ]
    },
    {
      icon: <MapPin className="h-6 w-6 text-medical-600" />,
      title: "Address",
      details: [
        "123 Healthcare Avenue",
        "Medical District, City 12345"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-medical-600" />,
      title: "Hours",
      details: [
        "Monday-Friday: 8am-8pm",
        "Saturday: 9am-5pm"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-medical-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to our team for support with your healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="appointment">Appointment</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" variant="medical" size="lg" className="w-full">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="bg-medical-600 text-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Need Immediate Assistance?</h3>
              </div>
              <p className="mb-4">
                Our support team is available 24/7 to help with urgent matters.
              </p>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-medical-600"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Our Hotline
              </Button>
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How can I schedule an appointment?
                  </h3>
                  <p className="text-gray-600">
                    You can schedule an appointment through our website, mobile app, or by calling our customer service line at +1 (234) 567-890.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What insurance plans do you accept?
                  </h3>
                  <p className="text-gray-600">
                    We accept most major insurance plans. Please contact our billing department for specific information about your coverage.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do I access my medical records?
                  </h3>
                  <p className="text-gray-600">
                    You can access your medical records through our patient portal. If you need assistance, please contact our support team.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-medical-600" />
                  <p className="text-gray-600">Follow us on social media for updates and health tips</p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </Button>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Subscribe to Our Newsletter</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Stay updated with health tips, news, and special offers.
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Your email address" className="flex-1" />
                  <Button variant="medical">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
