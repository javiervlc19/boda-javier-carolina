export type TimelineIcon = "rings" | "aperitif" | "meal" | "party";

export type TimelineItem = {
  time: string;
  title: string;
  icon: TimelineIcon;
};

export type BusDirection = "ida" | "vuelta";

export type BusRoute = {
  name: string;
  direction: BusDirection;
  departureTime: string;
  origin: string;
  destination: string;
  stops: string[];
  mapsUrl: string;
};

export type Hotel = {
  name: string;
  location: string;
  distance: string;
  price?: string;
  website: string;
  mapsUrl: string;
};

export const wedding = {
  couple: {
    groom: "Javier",
    bride: "Carolina",
    initials: "J | C",
  },
  weddingDate: "2027-05-22",
  weddingDateLabel: "22 de mayo de 2027",
  weddingDateHuman: "22 de mayo de 2027",
  city: "Valencia",
  ceremony: {
    time: "11:00h",
    name: "Iglesia de Santa Catalina",
    address: "Alzira (Valencia)",
    mapsUrl: "https://maps.google.com/?q=Iglesia+de+Santa+Catalina+Alzira",
  },
  celebration: {
    time: "12:30h",
    name: "Huerto de San Vicente",
    address: "Picanya (Valencia)",
    mapsUrl: "https://maps.google.com/?q=Huerto+de+San+Vicente+Picanya",
  },
  timeline: [
    { time: "11:00h", title: "Ceremonia", icon: "rings" },
    { time: "12:30h", title: "Aperitivo", icon: "aperitif" },
    { time: "13:30h", title: "Comida", icon: "meal" },
    { time: "16:00h", title: "Baile", icon: "party" },
  ] as TimelineItem[],
  busRoutes: [
    {
      name: "Valencia → Alzira",
      direction: "ida",
      departureTime: "09:45",
      origin: "Valencia",
      destination: "Alzira",
      stops: ["Estación del Norte"],
      mapsUrl: "https://maps.google.com/?q=Estacion+del+Norte+Valencia",
    },
    {
      name: "Alzira → Picanya",
      direction: "ida",
      departureTime: "12:00",
      origin: "Alzira",
      destination: "Picanya",
      stops: ["Iglesia de Santa Catalina"],
      mapsUrl: "https://maps.google.com/?q=Iglesia+de+Santa+Catalina+Alzira",
    },
    {
      name: "Picanya → Valencia",
      direction: "vuelta",
      departureTime: "01:00",
      origin: "Picanya",
      destination: "Valencia",
      stops: ["Huerto de San Vicente"],
      mapsUrl: "https://maps.google.com/?q=Huerto+de+San+Vicente+Picanya",
    },
    {
      name: "Picanya → Alzira",
      direction: "vuelta",
      departureTime: "01:00",
      origin: "Picanya",
      destination: "Alzira",
      stops: ["Huerto de San Vicente"],
      mapsUrl: "https://maps.google.com/?q=Huerto+de+San+Vicente+Picanya",
    },
  ] as BusRoute[],
  hotels: [
    {
      name: "SB Valencia Hotel",
      location: "Xirivella, Valencia",
      distance: "A 5 minutos de la celebración",
      price: "Desde 80€/noche",
      website: "https://www.booking.com",
      mapsUrl: "https://maps.google.com/?q=SB+Valencia+Hotel+Xirivella",
    },
    {
      name: "Hotel Sorolla Palace",
      location: "Valencia ciudad",
      distance: "A 15 minutos de la celebración",
      price: "Desde 90€/noche",
      website: "https://www.booking.com",
      mapsUrl: "https://maps.google.com/?q=Hotel+Sorolla+Palace+Valencia",
    },
    {
      name: "Hotel Husa Alameda Palace",
      location: "Valencia centro",
      distance: "A 20 minutos de la celebración",
      website: "https://www.booking.com",
      mapsUrl: "https://maps.google.com/?q=Hotel+Husa+Alameda+Palace+Valencia",
    },
  ] as Hotel[],
  whatsapp: {
    javier: "34600000000",
    carol: "34600000001",
  },
  bankAccount: {
    iban: "ES45 0182 5319 7500 0095 5634",
    holder: "Javier & Carolina",
  },
  dresscode: {
    title: "DRESS CODE",
    level: "Elegante",
    note: "Pero sobre todo, ven con ganas de pasarlo bien.",
  },
};
