import React, { useState } from "react";
import { Calendar, MapPin, Clock, Users, Filter, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Závod" | "Workshop" | "Akce" | "Soustředění" | "Ostatní";
  description: string;
  capacity?: string;
  link?: string;
  image?: string;
}

interface EventCalendarProps {
  events: Event[];
  compact?: boolean;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, compact = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Vše");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const categories = ["Vše", "Závod", "Workshop", "Akce", "Soustředění", "Ostatní"];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Závod": "bg-red-500",
      "Workshop": "bg-blue-500",
      "Akce": "bg-green-500",
      "Soustředění": "bg-purple-500",
      "Ostatní": "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

  const filteredEvents = selectedCategory === "Vše"
    ? events
    : events.filter(event => event.category === selectedCategory);

  const sortedEvents = [...filteredEvents].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingEvents = sortedEvents.filter(event =>
    new Date(event.date) >= new Date()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('cs-CZ', { month: 'long' });
    return { day, month };
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-3">
            Kalendář akcí
          </h2>
          <p className="text-lg text-gray-600">
            Přehled nadcházejících eventů, závodů a workshopů
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-tjk-blue text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events List/Grid */}
        {compact ? (
          /* Compact List View */
          <div className="space-y-4">
            {upcomingEvents.slice(0, 5).map((event) => {
              const { day, month } = formatDate(event.date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex gap-4 items-center group"
                >
                  {/* Date Box */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-tjk-blue to-blue-600 text-white rounded-xl flex flex-col items-center justify-center shadow-lg">
                    <span className="text-2xl font-black">{day}</span>
                    <span className="text-xs uppercase">{month.slice(0, 3)}</span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${getCategoryColor(event.category)} px-2 py-1 rounded text-xs font-bold text-white`}>
                        {event.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-tjk-blue transition-colors">
                      {event.title}
                    </h4>
                  </div>

                  {/* Link */}
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 bg-gray-100 hover:bg-tjk-blue hover:text-white rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Full Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => {
              const { day, month } = formatDate(event.date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image or Color Header */}
                  {event.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-tjk-blue">{day}</span>
                        <span className="text-xs uppercase text-gray-600">{month.slice(0, 3)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`${getCategoryColor(event.category)} h-32 flex items-center justify-center relative`}>
                      <Calendar className="w-16 h-16 text-white/30" />
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-gray-900">{day}</span>
                        <span className="text-xs uppercase text-gray-600">{month.slice(0, 3)}</span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-xs font-bold text-white`}>
                        {event.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tjk-blue transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-tjk-blue" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-tjk-blue" />
                        <span>{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-tjk-blue" />
                          <span>{event.capacity}</span>
                        </div>
                      )}
                    </div>

                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-tjk-blue text-white font-semibold rounded-lg hover:bg-tjk-blue/90 transition-all duration-300 shadow-md"
                      >
                        Více informací
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {upcomingEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Žádné nadcházející akce
            </h3>
            <p className="text-gray-500">
              {selectedCategory === "Vše"
                ? "Momentálně nejsou naplánovány žádné akce."
                : `Žádné akce v kategorii "${selectedCategory}".`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventCalendar;
