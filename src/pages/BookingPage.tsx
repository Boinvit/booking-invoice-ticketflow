
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services = [
    { id: "haircut", name: "Haircut & Styling", price: 45, duration: "45 min" },
    { id: "wash", name: "Hair Wash & Dry", price: 25, duration: "30 min" },
    { id: "color", name: "Hair Coloring", price: 85, duration: "90 min" },
    { id: "beard", name: "Beard Trim", price: 20, duration: "20 min" },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Business Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">BS</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blue Salon & Spa</h1>
              <p className="text-gray-600">Professional hair care and styling services</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Open Today
                </Badge>
                <span className="text-sm text-gray-500">9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>📍 123 Main Street, Downtown</div>
            <div>📞 (555) 123-4567</div>
            <div>⭐ 4.8/5 (124 reviews)</div>
          </div>
        </div>
      </header>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Service</CardTitle>
                <CardDescription>Choose from our available services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                        selectedService === service.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{service.name}</h3>
                        <Badge variant="outline">${service.price}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{service.duration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Select Time</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary & Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedService && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">
                        {services.find(s => s.id === selectedService)?.name}
                      </span>
                      <span className="font-bold">
                        ${services.find(s => s.id === selectedService)?.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {services.find(s => s.id === selectedService)?.duration}
                    </p>
                  </div>
                )}

                {selectedDate && (
                  <div className="text-sm">
                    <span className="font-medium">Date: </span>
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </div>
                )}

                {selectedTime && (
                  <div className="text-sm">
                    <span className="font-medium">Time: </span>
                    {selectedTime}
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total:</span>
                    <span>
                      ${selectedService ? services.find(s => s.id === selectedService)?.price : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="notes">Special Requests</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any special requests or notes..."
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedService || !selectedDate || !selectedTime}
                >
                  Book Appointment
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  You'll receive a confirmation via WhatsApp and email
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
