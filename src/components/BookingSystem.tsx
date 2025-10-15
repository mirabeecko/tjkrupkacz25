import React, { useState } from "react";
import { Calendar, Users, Bed, Check, ArrowRight, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RoomType {
  id: string;
  name: string;
  capacity: number;
  price: number;
  description: string;
  amenities: string[];
}

const roomTypes: RoomType[] = [
  {
    id: "double",
    name: "Dvoulůžkový pokoj",
    capacity: 2,
    price: 800,
    description: "Komfortní pokoj pro dva",
    amenities: ["WiFi", "Vlastní koupelna", "TV"]
  },
  {
    id: "family",
    name: "Rodinný pokoj",
    capacity: 4,
    price: 1400,
    description: "Prostorný pokoj pro rodinu",
    amenities: ["WiFi", "Vlastní koupelna", "TV", "Balkon"]
  },
  {
    id: "dorm",
    name: "Společná ložnice",
    capacity: 8,
    price: 400,
    description: "Ekonomická varianta pro skupiny",
    amenities: ["WiFi", "Sdílená koupelna", "Ložní prádlo"]
  }
];

const BookingSystem: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    roomType: "",
    name: "",
    email: "",
    phone: "",
    note: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diff = end.getTime() - start.getTime();
      return Math.ceil(diff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const room = roomTypes.find(r => r.id === formData.roomType);
    if (nights > 0 && room) {
      return nights * room.price;
    }
    return 0;
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.checkIn && formData.checkOut && formData.guests > 0;
    }
    if (step === 2) {
      return formData.roomType !== "";
    }
    if (step === 3) {
      return formData.name && formData.email && formData.phone;
    }
    return false;
  };

  const handleSubmit = () => {
    toast({
      title: "Rezervace odeslána!",
      description: "Brzy vás budeme kontaktovat s potvrzením.",
    });
    // Here you would typically send the data to your backend
    console.log("Booking data:", formData);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-gradient-to-r from-tjk-blue to-blue-600 p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= s
                      ? "bg-white text-tjk-blue scale-110 shadow-lg"
                      : "bg-white/30 text-white"
                  }`}
                >
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                <span className="text-white text-sm mt-2 font-semibold">
                  {s === 1 ? "Termín" : s === 2 ? "Pokoj" : "Kontakt"}
                </span>
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                  step > s ? "bg-white" : "bg-white/30"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-8">
        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-black text-gray-900 mb-6">
              Vyberte termín pobytu
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Příjezd
                </label>
                <input
                  type="date"
                  min={today}
                  value={formData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Odjezd
                </label>
                <input
                  type="date"
                  min={formData.checkIn || today}
                  value={formData.checkOut}
                  onChange={(e) => handleInputChange("checkOut", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                Počet osob
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={(e) => handleInputChange("guests", parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all"
              />
            </div>

            {calculateNights() > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-blue-900 font-semibold">
                  Délka pobytu: <span className="text-2xl font-black">{calculateNights()}</span> {calculateNights() === 1 ? 'noc' : calculateNights() < 5 ? 'noci' : 'nocí'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Room Selection */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-black text-gray-900 mb-6">
              Vyberte typ ubytování
            </h3>

            <div className="space-y-4">
              {roomTypes.map((room) => (
                <div
                  key={room.id}
                  onClick={() => handleInputChange("roomType", room.id)}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    formData.roomType === room.id
                      ? "border-tjk-blue bg-blue-50 shadow-lg scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Bed className="w-6 h-6 text-tjk-blue" />
                        <h4 className="text-xl font-bold text-gray-900">{room.name}</h4>
                      </div>
                      <p className="text-gray-600 mb-3">{room.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {room.amenities.map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-500">od</p>
                      <p className="text-3xl font-black text-tjk-blue">{room.price} Kč</p>
                      <p className="text-sm text-gray-500">na noc</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-3xl font-black text-gray-900 mb-6">
              Kontaktní údaje
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Jméno a příjmení *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all"
                placeholder="Jan Novák"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                E-mail *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all"
                placeholder="jan.novak@email.cz"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Telefon *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all"
                placeholder="+420 123 456 789"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Poznámka (volitelné)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-tjk-blue focus:ring-2 focus:ring-tjk-blue/20 transition-all resize-none"
                placeholder="Zvláštní požadavky nebo dotazy..."
              />
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-tjk-blue to-blue-600 text-white rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4">Shrnutí rezervace</h4>
              <div className="space-y-2 text-white/90">
                <p><strong>Termín:</strong> {formData.checkIn} - {formData.checkOut} ({calculateNights()} nocí)</p>
                <p><strong>Typ pokoje:</strong> {roomTypes.find(r => r.id === formData.roomType)?.name}</p>
                <p><strong>Počet osob:</strong> {formData.guests}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-3xl font-black">
                  Celkem: {calculateTotal().toLocaleString()} Kč
                </p>
                <p className="text-sm text-white/70 mt-1">včetně DPH</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="px-6 py-3"
            >
              Zpět
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="px-8 py-3 bg-tjk-blue hover:bg-tjk-blue/90"
            >
              Pokračovat
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="px-8 py-3 bg-green-600 hover:bg-green-700"
            >
              Odeslat rezervaci
              <Check className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
