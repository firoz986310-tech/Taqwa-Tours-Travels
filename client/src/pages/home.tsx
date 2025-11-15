import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertCustomerLeadSchema, type InsertCustomerLead } from "@shared/schema";
import { Plane, GraduationCap, MapPin, Phone, Mail, Facebook, MessageCircle, Check, Building2, Users, Globe2 } from "lucide-react";
import { SiFacebook, SiWhatsapp } from "react-icons/si";

export default function Home() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<InsertCustomerLead>({
    resolver: zodResolver(insertCustomerLeadSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: "",
      travelDate: undefined,
      passportStatus: undefined,
      message: undefined,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertCustomerLead) => {
      return await apiRequest("POST", "/api/submit-form", data);
    },
    onSuccess: () => {
      setFormSubmitted(true);
      form.reset();
      toast({
        title: "সফলভাবে জমা হয়েছে!",
        description: "আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
      });
      
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    },
    onError: () => {
      toast({
        title: "ত্রুটি ঘটেছে",
        description: "দয়া করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertCustomerLead) => {
    submitMutation.mutate(data);
  };

  const scrollToForm = () => {
    document.getElementById("customer-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            আপনার স্বপ্নের ভ্রমণ এখনই শুরু করুন!
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Taqwa Tours and Travels-এর সঙ্গে নিরাপদ ও আরামদায়ক সফর
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 bg-primary/90 backdrop-blur-sm hover:bg-primary border border-primary-border"
              data-testid="button-book-now"
            >
              এখন বুক করুন
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToForm}
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              data-testid="button-contact"
            >
              যোগাযোগ করুন
            </Button>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <a
            href="https://wa.me/8801722333911"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover-elevate active-elevate-2 transition-transform"
            data-testid="button-whatsapp"
          >
            <SiWhatsapp className="w-7 h-7" />
          </a>
          <a
            href="https://www.facebook.com/share/14RnaKUXypk/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1877F2] text-white shadow-lg hover-elevate active-elevate-2 transition-transform"
            data-testid="button-facebook-messenger"
          >
            <SiFacebook className="w-7 h-7" />
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground" data-testid="heading-services">
            আমাদের সেবা
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            আপনার ভ্রমণকে সহজ ও নিরাপদ করতে আমরা প্রস্তুত
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hajj & Umrah Service */}
            <Card className="hover-elevate overflow-visible" data-testid="card-hajj-umrah">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">হজ ও উমরাহ সার্ভিস</CardTitle>
                <CardDescription className="text-base">সম্পূর্ণ হজ ও উমরাহ প্যাকেজ</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>ভিসা প্রসেসিং</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>বিমান টিকিট</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>মক্কা–মদিনায় আরামদায়ক হোটেল</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>জিয়ারা</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>অভিজ্ঞ মোয়াল্লিম দ্বারা গ্রুপ পরিচালনা</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* World Tour Package */}
            <Card className="hover-elevate overflow-visible" data-testid="card-world-tour">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Globe2 className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">ওয়ার্ল্ড ট্যুর প্যাকেজ</CardTitle>
                <CardDescription className="text-base">বিশ্বের সেরা গন্তব্যে ভ্রমণ</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  আমরা সাশ্রয়ী মূল্যে বিশ্বব্যাপী ট্যুর প্যাকেজ প্রদান করি।
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    মালয়েশিয়া, সিঙ্গাপুর
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    থাইল্যান্ড, দুবাই
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    তুরস্ক, ইউরোপ
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Student Consultancy */}
            <Card className="hover-elevate overflow-visible" data-testid="card-student-consultancy">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl">বিদেশে শিক্ষাজীবন</CardTitle>
                <CardDescription className="text-base">আন্তর্জাতিক শিক্ষা পরামর্শ সেবা</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>ভর্তি সহায়তা</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>ভিসা গাইডেন্স</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>ডকুমেন্ট প্রস্তুতি</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* World Tour Destinations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground" data-testid="heading-destinations">
            জনপ্রিয় গন্তব্যসমূহ
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            বিশ্বের সবচেয়ে সুন্দর স্থানগুলি আবিষ্কার করুন
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "মালয়েশিয়া", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400" },
              { name: "সিঙ্গাপুর", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400" },
              { name: "থাইল্যান্ড", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400" },
              { name: "দুবাই", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
              { name: "তুরস্ক", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400" },
              { name: "সৌদি আরব", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400" },
              { name: "ইউরোপ", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400" },
              { name: "মিশর", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400" },
            ].map((destination, idx) => (
              <Card key={idx} className="overflow-hidden hover-elevate group" data-testid={`card-destination-${idx}`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                    {destination.name}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Countries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground" data-testid="heading-study-abroad">
            বিদেশে উচ্চশিক্ষা
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
            বিশ্বমানের শিক্ষাপ্রতিষ্ঠানে ভর্তির সম্পূর্ণ সহায়তা এবং দিকনির্দেশনা
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["যুক্তরাজ্য", "কানাডা", "অস্ট্রেলিয়া", "মালয়েশিয়া", "চীন", "জাপান", "কোরিয়া", "ইউরোপ"].map((country, idx) => (
              <div 
                key={idx}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                data-testid={`badge-country-${idx}`}
              >
                {country}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">১০০০+ শিক্ষার্থী</h3>
              <p className="text-muted-foreground text-sm">সফলভাবে বিদেশে পাঠানো হয়েছে</p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">৫০+ বিশ্ববিদ্যালয়</h3>
              <p className="text-muted-foreground text-sm">আমাদের সহযোগী প্রতিষ্ঠান</p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">৯৫% সফলতার হার</h3>
              <p className="text-muted-foreground text-sm">ভিসা অনুমোদনে</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Umrah Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground" data-testid="heading-packages">
            উমরাহ প্যাকেজ
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            সাশ্রয়ী মূল্যে সম্পূর্ণ উমরাহ প্যাকেজ
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-visible hover-elevate" data-testid="card-package-8day">
              <CardHeader className="text-center pb-4">
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  ৮ দিনের প্যাকেজ
                </div>
                <CardTitle className="text-4xl font-bold text-primary">১,৩০,০০০ টাকা</CardTitle>
                <CardDescription className="text-base mt-2">প্রতি ব্যক্তি</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>রিটার্ন এয়ার টিকেট</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>মক্কা ও মদিনায় হোটেল</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>সকল ভিসা খরচ</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>জিয়ারাত</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>অভিজ্ঞ গাইড</span>
                </div>
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={scrollToForm}
                  data-testid="button-apply-8day"
                >
                  আবেদন করুন
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-visible hover-elevate border-primary" data-testid="card-package-14day">
              <CardHeader className="text-center pb-4">
                <div className="inline-block px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
                  ১৪ দিনের প্যাকেজ
                </div>
                <CardTitle className="text-4xl font-bold text-primary">১,৪০,০০০ টাকা</CardTitle>
                <CardDescription className="text-base mt-2">প্রতি ব্যক্তি</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>রিটার্ন এয়ার টিকেট</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>মক্কা ও মদিনায় উন্নত হোটেল</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>সকল ভিসা খরচ</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>সম্পূর্ণ জিয়ারাত ট্যুর</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>অভিজ্ঞ মোয়াল্লিম ও গাইড</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>অতিরিক্ত সুবিধা</span>
                </div>
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={scrollToForm}
                  data-testid="button-apply-14day"
                >
                  আবেদন করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Form */}
      <section id="customer-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-foreground" data-testid="heading-form">
            আবেদন ফর্ম
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন
          </p>

          {formSubmitted ? (
            <Card className="p-8 text-center bg-accent/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">সফলভাবে জমা হয়েছে!</h3>
              <p className="text-muted-foreground text-lg">
                আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।
              </p>
            </Card>
          ) : (
            <Card className="p-6 lg:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">নাম *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="আপনার পুরো নাম লিখুন" 
                            {...field} 
                            data-testid="input-name"
                          />
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
                        <FormLabel className="text-base">ফোন নম্বর *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="০১৭xxxxxxxx" 
                            {...field} 
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">সার্ভিসের ধরন *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service-type">
                              <SelectValue placeholder="সার্ভিস নির্বাচন করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="হজ">হজ</SelectItem>
                            <SelectItem value="উমরাহ">উমরাহ</SelectItem>
                            <SelectItem value="ওয়ার্ল্ড ট্যুর">ওয়ার্ল্ড ট্যুর</SelectItem>
                            <SelectItem value="বিদেশে শিক্ষা">বিদেশে শিক্ষা</SelectItem>
                            <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">সফরের তারিখ</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            data-testid="input-travel-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passportStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">পাসপোর্ট স্ট্যাটাস</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger data-testid="select-passport-status">
                              <SelectValue placeholder="পাসপোর্ট স্ট্যাটাস নির্বাচন করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="আছে">আছে</SelectItem>
                            <SelectItem value="নেই">নেই</SelectItem>
                            <SelectItem value="প্রসেসিং চলছে">প্রসেসিং চলছে</SelectItem>
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
                        <FormLabel className="text-base">বার্তা / অনুরোধ</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="আপনার কোন বিশেষ অনুরোধ বা প্রশ্ন থাকলে এখানে লিখুন" 
                            className="min-h-[120px]"
                            {...field} 
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitMutation.isPending}
                    data-testid="button-submit-form"
                  >
                    {submitMutation.isPending ? "জমা হচ্ছে..." : "জমা দিন"}
                  </Button>
                </form>
              </Form>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Taqwa Tours and Travels</h3>
              <p className="text-muted-foreground mb-4">
                আপনার বিশ্বস্ত ভ্রমণ সঙ্গী। হজ, উমরাহ এবং আন্তর্জাতিক ট্যুরের জন্য।
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">যোগাযোগ</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+8801722333911" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-phone"
                >
                  <Phone className="w-4 h-4" />
                  <span>০১৭২২ ৩৩৩ ৯১১</span>
                </a>
                <a 
                  href="https://www.facebook.com/share/14RnaKUXypk/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">সেবাসমূহ</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>হজ ও উমরাহ</li>
                <li>ওয়ার্ল্ড ট্যুর</li>
                <li>বিদেশে শিক্ষা</li>
                <li>ভিসা সেবা</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Taqwa Tours and Travels. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
