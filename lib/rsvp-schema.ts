import { z } from "zod";
import { wedding } from "@/data/wedding";

const idaRouteValues = wedding.busRoutes
  .filter((route) => route.direction === "ida")
  .map((route) => route.id) as [string, ...string[]];

const returnBusValues = [
  "no",
  ...wedding.busRoutes
    .filter((route) => route.direction === "vuelta")
    .map((route) => route.id),
] as [string, ...string[]];

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(2, "Indica tu nombre y apellidos"),
    attendance: z.enum(["si", "no"], {
      message: "Indica si asistirás",
    }),
    guestCount: z.coerce.number().int().min(1).max(6).default(1),
    companions: z.array(z.string().trim()).default([]),
    children: z.enum(["si", "no"]).default("no"),
    childrenCount: z.coerce.number().int().min(0).max(10).default(0),
    busRoutes: z.array(z.enum(idaRouteValues)).default([]),
    returnBus: z.enum(returnBusValues).default("no"),
    dietaryRequirements: z.string().trim().default(""),
    notes: z.string().trim().default(""),
    song: z.string().trim().default(""),
    message: z.string().trim().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.attendance === "si" && data.children === "si" && data.childrenCount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["childrenCount"],
        message: "Indica el número de niños",
      });
    }
  });

export type RsvpFormValues = z.input<typeof rsvpSchema>;
export type RsvpFormOutput = z.output<typeof rsvpSchema>;
