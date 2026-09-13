"use client";
/* eslint-disable react-hooks/incompatible-library -- react-hook-form's
   watch() is a stable subscription API, not a value that needs memoizing. */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";
import { supabase } from "@/lib/supabase";
import { rsvpSchema, type RsvpFormValues } from "@/lib/rsvp-schema";

const inputClasses =
  "w-full border-b border-stone/50 bg-transparent py-2 font-sans text-sm text-ink placeholder:text-stone/70 focus:border-olive focus:outline-none";
const labelClasses =
  "font-sans text-xs uppercase tracking-[0.2em] text-stone";

export function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      guestCount: 1,
      companions: [],
      children: "no",
      childrenCount: 0,
      busRoutes: [],
      returnBus: "no",
      dietaryRequirements: "",
      notes: "",
      song: "",
      message: "",
    },
  });

  const attendance = watch("attendance");
  const guestCount = Number(watch("guestCount") ?? 1);
  const childrenAnswer = watch("children");

  async function onSubmit(values: RsvpFormValues) {
    setStatus("idle");
    const isAttending = values.attendance === "si";

    const companions = isAttending
      ? Array.from({ length: guestCount - 1 }, (_, i) =>
          (values.companions?.[i] ?? "").toString().trim()
        ).filter(Boolean)
      : [];

    const { error } = await supabase.from("wedding_guests").insert({
      name: values.name,
      attendance: values.attendance,
      guest_count: isAttending ? guestCount : null,
      companions: isAttending ? companions : null,
      children: isAttending ? values.children === "si" : null,
      children_count:
        isAttending && values.children === "si" ? Number(values.childrenCount) : null,
      bus_route:
        isAttending && values.busRoutes && values.busRoutes.length > 0
          ? values.busRoutes
              .map((id) => {
                const route = wedding.busRoutes.find((r) => r.id === id);
                return route ? `${route.name} · ${route.departureTime}h` : id;
              })
              .join(" + ")
          : null,
      return_bus:
        isAttending && values.returnBus && values.returnBus !== "no"
          ? (() => {
              const route = wedding.busRoutes.find(
                (r) => r.id === values.returnBus
              );
              return route ? `${route.name} · ${route.departureTime}h` : values.returnBus;
            })()
          : isAttending
            ? "no"
            : null,
      dietary_requirements: isAttending ? values.dietaryRequirements || null : null,
      song: isAttending ? values.song || null : null,
      notes: isAttending ? values.notes || null : null,
      message: values.message || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <section id="rsvp" className="bg-warm-white py-24 text-center sm:py-32">
        <FadeUp className="mx-auto max-w-lg px-6">
          <p className="font-display text-3xl text-ink sm:text-4xl">
            ¡Gracias!
          </p>
          <p className="mt-6 font-sans text-sm text-stone">
            Tu confirmación se ha enviado correctamente. Nos vemos el{" "}
            {wedding.weddingDateHuman}.
          </p>
        </FadeUp>
      </section>
    );
  }

  return (
    <section id="rsvp" className="bg-warm-white py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-6">
        <FadeUp className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Confirmación
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Confirmar asistencia
          </h2>
        </FadeUp>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-16 flex flex-col gap-8"
          noValidate
        >
          <div>
            <label className={labelClasses} htmlFor="name">
              Nombre y apellidos *
            </label>
            <input
              id="name"
              required
              className={inputClasses}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-700">{errors.name.message}</p>
            )}
          </div>

          <fieldset>
            <legend className={labelClasses}>¿Asistirás?</legend>
            <div className="mt-3 flex flex-col gap-3">
              <label className="flex items-center gap-3 font-sans text-sm text-ink">
                <input type="radio" value="si" {...register("attendance")} />
                Sí, allí estaremos
              </label>
              <label className="flex items-center gap-3 font-sans text-sm text-ink">
                <input type="radio" value="no" {...register("attendance")} />
                No podremos asistir
              </label>
            </div>
            {errors.attendance && (
              <p className="mt-1 text-xs text-red-700">
                {errors.attendance.message}
              </p>
            )}
          </fieldset>

          {attendance === "si" && (
            <>
              <div>
                <label className={labelClasses} htmlFor="guestCount">
                  Número de asistentes
                </label>
                <select
                  id="guestCount"
                  className={inputClasses}
                  {...register("guestCount")}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {guestCount > 1 && (
                <div className="flex flex-col gap-4">
                  <p className={labelClasses}>Nombre de acompañantes</p>
                  {Array.from({ length: guestCount - 1 }, (_, i) => (
                    <input
                      key={i}
                      className={inputClasses}
                      placeholder={`Acompañante ${i + 1}`}
                      {...register(`companions.${i}` as const)}
                    />
                  ))}
                </div>
              )}

              <fieldset>
                <legend className={labelClasses}>¿Vendrán niños?</legend>
                <div className="mt-3 flex gap-6">
                  <label className="flex items-center gap-2 font-sans text-sm text-ink">
                    <input type="radio" value="si" {...register("children")} />
                    Sí
                  </label>
                  <label className="flex items-center gap-2 font-sans text-sm text-ink">
                    <input type="radio" value="no" {...register("children")} />
                    No
                  </label>
                </div>
              </fieldset>

              {childrenAnswer === "si" && (
                <div>
                  <label className={labelClasses} htmlFor="childrenCount">
                    Número de niños
                  </label>
                  <input
                    id="childrenCount"
                    type="number"
                    min={1}
                    className={inputClasses}
                    {...register("childrenCount")}
                  />
                  {errors.childrenCount && (
                    <p className="mt-1 text-xs text-red-700">
                      {errors.childrenCount.message}
                    </p>
                  )}
                </div>
              )}

              <fieldset>
                <legend className={labelClasses}>Autobús de ida</legend>
                <p className="mt-2 font-sans text-xs text-stone">
                  Marca las etapas que necesites. Si sales desde Valencia,
                  marca ambas.
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  {wedding.busRoutes
                    .filter((route) => route.direction === "ida")
                    .map((route) => (
                      <label
                        key={route.id}
                        className="flex items-center gap-3 font-sans text-sm text-ink"
                      >
                        <input
                          type="checkbox"
                          value={route.id}
                          {...register("busRoutes")}
                        />
                        {route.name} · {route.departureTime}h
                      </label>
                    ))}
                </div>
              </fieldset>

              <div>
                <label className={labelClasses} htmlFor="returnBus">
                  Autobús de vuelta
                </label>
                <select
                  id="returnBus"
                  className={inputClasses}
                  {...register("returnBus")}
                >
                  <option value="no">No</option>
                  {wedding.busRoutes
                    .filter((route) => route.direction === "vuelta")
                    .map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name} · {route.departureTime}h
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className={labelClasses} htmlFor="dietaryRequirements">
                  Alimentación
                </label>
                <input
                  id="dietaryRequirements"
                  className={inputClasses}
                  placeholder="Vegetariano, celiaquía, alergias..."
                  {...register("dietaryRequirements")}
                />
              </div>

              <div>
                <label className={labelClasses} htmlFor="notes">
                  Observaciones
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className={inputClasses}
                  {...register("notes")}
                />
              </div>

              <div>
                <label className={labelClasses} htmlFor="song">
                  Canción
                </label>
                <input
                  id="song"
                  className={inputClasses}
                  placeholder="¿Qué canción no puede faltar en la fiesta?"
                  {...register("song")}
                />
              </div>
            </>
          )}

          <div>
            <label className={labelClasses} htmlFor="message">
              Mensaje para los novios
            </label>
            <textarea
              id="message"
              rows={3}
              className={inputClasses}
              {...register("message")}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-700">
              No hemos podido guardar tu confirmación. Inténtalo de nuevo.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 border border-olive bg-olive px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-warm-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar confirmación"}
          </button>
        </form>
      </div>
    </section>
  );
}
