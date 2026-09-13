export type TimelineIcon = "rings" | "aperitif" | "meal" | "party";

export type TimelineItem = {
  time: string;
  title: string;
  icon: TimelineIcon;
};

export type BusDirection = "ida" | "vuelta";

export type BusRoute = {
  id: string;
  name: string;
  direction: BusDirection;
  departureTime: string;
  origin: string;
  destination: string;
  originAddress: string;
  destinationAddress: string;
  stops: string[];
  mapsUrl: string;
};

function directionsUrl(originAddress: string, destinationAddress: string) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    originAddress
  )}&destination=${encodeURIComponent(destinationAddress)}&travelmode=driving`;
}

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
    initials: "C | J",
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
    time: "13:00h",
    name: "Huerto de San Vicente",
    address: "Picanya (Valencia)",
    mapsUrl: "https://maps.google.com/?q=Huerto+de+San+Vicente+Picanya",
  },
  timeline: [
    { time: "11:00h", title: "Ceremonia", icon: "rings" },
    { time: "13:00h", title: "Aperitivo", icon: "aperitif" },
    { time: "15:00h", title: "Comida", icon: "meal" },
    { time: "17:00h", title: "Baile", icon: "party" },
  ] as TimelineItem[],
  busRoutes: [
    {
      id: "valencia-alzira",
      name: "Valencia → Alzira",
      direction: "ida",
      departureTime: "10:15",
      origin: "Valencia",
      destination: "Alzira",
      originAddress: "Avenida de Aragón, Valencia",
      destinationAddress: "Iglesia de Santa Catalina, Alzira",
      stops: ["Avenida Aragón"],
    },
    {
      id: "alzira-picanya",
      name: "Alzira → Picanya",
      direction: "ida",
      departureTime: "12:30",
      origin: "Alzira",
      destination: "Picanya",
      originAddress: "Iglesia de Santa Catalina, Alzira",
      destinationAddress: "Huerto de San Vicente, Picanya",
      stops: ["Iglesia de Santa Catalina"],
    },
    {
      id: "picanya-valencia-0100",
      name: "Picanya → Valencia",
      direction: "vuelta",
      departureTime: "01:00",
      origin: "Picanya",
      destination: "Valencia",
      originAddress: "Huerto de San Vicente, Picanya",
      destinationAddress: "Avenida de Aragón, Valencia",
      stops: ["Huerto San Vicente - Avenida Aragón"],
    },
    {
      id: "picanya-valencia-2200",
      name: "Picanya → Valencia",
      direction: "vuelta",
      departureTime: "22:00",
      origin: "Picanya",
      destination: "Valencia",
      originAddress: "Huerto de San Vicente, Picanya",
      destinationAddress: "Avenida de Aragón, Valencia",
      stops: ["Huerto San Vicente - Avenida Aragón"],
    },
    {
      id: "picanya-alzira-0100",
      name: "Picanya → Alzira",
      direction: "vuelta",
      departureTime: "01:00",
      origin: "Picanya",
      destination: "Alzira",
      originAddress: "Huerto de San Vicente, Picanya",
      destinationAddress: "Iglesia de Santa Catalina, Alzira",
      stops: ["Huerto San Vicente - Iglesia Santa Catalina"],
    },
    {
      id: "picanya-alzira-2200",
      name: "Picanya → Alzira",
      direction: "vuelta",
      departureTime: "22:00",
      origin: "Picanya",
      destination: "Alzira",
      originAddress: "Huerto de San Vicente, Picanya",
      destinationAddress: "Iglesia de Santa Catalina, Alzira",
      stops: ["Huerto San Vicente - Iglesia Santa Catalina"],
    },
  ].map((route) => ({
    ...route,
    mapsUrl: directionsUrl(route.originAddress, route.destinationAddress),
  })) as BusRoute[],
  hotels: [
    {
      name: "Hotel Checkin Valencia Ciscar",
      location: "Valencia ciudad",
      distance: "A 7 minutos de la celebración",
      price: "Desde 75€/noche",
      website: "https://www.booking.com/searchresults.html?ss=Hotel+Checkin+Valencia+Ciscar",
      mapsUrl: "https://maps.google.com/?q=Hotel+Checkin+Valencia+Ciscar",
    },
    {
      name: "Valencia Living Suites",
      location: "Valencia ciudad",
      distance: "A 5 minutos de la celebración",
      price: "Desde 70€/noche",
      website: "https://www.booking.com/searchresults.html?ss=Valencia+Living+Suites",
      mapsUrl: "https://maps.google.com/?q=Valencia+Living+Suites",
    },
    {
      name: "Hotel Sorolla Palace",
      location: "Valencia ciudad",
      distance: "A 20 minutos de la celebración",
      price: "Desde 90€/noche",
      website: "https://www.hotelsorollapalace.com",
      mapsUrl: "https://maps.google.com/?q=Hotel+Sorolla+Palace+Valencia",
    },
  ] as Hotel[],
  whatsapp: {
    javier: "34649233038",
    carol: "34662098437",
  },
  bankAccount: {
    iban: "ES45 0182 5319 7500 0095 5634",
    holder: "Carolina & Javier",
  },
};
