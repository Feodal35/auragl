"use client";

import { useEffect } from "react";

/**
 * WebMCP (Web Model Context Protocol) Client-Side Tool Registration Provider
 *
 * Implements W3C WebML & Chrome Agentic Browsing standard:
 * - Exposes structured client tools to in-browser AI agents
 * - Defines valid JSON Schemas for booking, inquiry, and treatment lookup
 * - Enables native agent actuation without fragile DOM scraping
 */
export default function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect browser WebMCP support on document or navigator
    const modelContext =
      (document as unknown as { modelContext?: WebMcpContext }).modelContext ||
      (navigator as unknown as { modelContext?: WebMcpContext }).modelContext;

    if (!modelContext || typeof modelContext.registerTool !== "function") {
      return;
    }

    try {
      // 1. Tool: book_appointment
      modelContext.registerTool({
        name: "book_appointment",
        description:
          "Bucht oder fragt eine Beauty-Behandlung (Wimpern, Hollywood Glow Facials, Powder Brows) bei Aura Glow by Mürvet in 31224 Peine an.",
        inputSchema: {
          type: "object",
          properties: {
            first_name: {
              type: "string",
              description: "Vorname der Kundin oder des Kunden",
            },
            last_name: {
              type: "string",
              description: "Nachname der Kundin veya des Kunden",
            },
            email: {
              type: "string",
              format: "email",
              description: "Gültige E-Mail-Adresse für die Terminbestätigung",
            },
            phone: {
              type: "string",
              description: "Telefonnummer für Rückfragen zum Wunschtermin",
            },
            treatment_title: {
              type: "string",
              description: "Name der gewünschten Behandlung (z. B. Hollywood Glow Deluxe, Wimpernverlängerung)",
            },
            preferred_date: {
              type: "string",
              description: "Wunschdatum für den Termin im Format JJJJ-MM-TT",
            },
            preferred_time: {
              type: "string",
              description: "Bevorzugte Uhrzeit (z. B. 10:00 Uhr oder Vormittags)",
            },
            notes: {
              type: "string",
              description: "Optionale Kundenwünsche oder Hautbesonderheiten",
            },
          },
          required: [
            "first_name",
            "last_name",
            "email",
            "phone",
            "treatment_title",
            "preferred_date",
          ],
        },
        readOnlyHint: false,
        execute: async (input: Record<string, unknown>) => {
          const res = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...input, privacy_accepted: true }),
          });
          return await res.json();
        },
      });

      // 2. Tool: send_contact_message
      modelContext.registerTool({
        name: "send_contact_message",
        description:
          "Sendet eine allgemeine Frage, Preisanfrage oder Beratungsnachricht an Aura Glow by Mürvet.",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Vollständiger Name des Absenders",
            },
            email: {
              type: "string",
              format: "email",
              description: "E-Mail-Adresse für die Rückantwort",
            },
            phone: {
              type: "string",
              description: "Optionale Telefonnummer",
            },
            subject: {
              type: "string",
              description: "Betreff der Anfrage",
            },
            message: {
              type: "string",
              description: "Ausführlicher Nachrichtentext",
            },
          },
          required: ["name", "email", "subject", "message"],
        },
        readOnlyHint: false,
        execute: async (input: Record<string, unknown>) => {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...input, privacy_accepted: true }),
          });
          return await res.json();
        },
      });

      // 3. Tool: get_treatment_catalog (Read-Only)
      modelContext.registerTool({
        name: "get_treatment_catalog",
        description:
          "Ruft die Behandlungswelten, Leistungsdetails und Preise von Aura Glow by Mürvet in Peine ab.",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Optionale Kategorie: 'wimpern', 'gesichtsreinigung-pflege', 'permanent-make-up', 'schulungen'",
            },
          },
        },
        readOnlyHint: true,
        execute: async () => {
          return {
            studio: "Aura Glow by Mürvet",
            owner: "Mürvet Dincer",
            location: "31224 Peine, Niedersachsen, Deutschland",
            website: "https://xn--aura6lowbymrvet-9vb.de",
            catalogUrl: "https://xn--aura6lowbymrvet-9vb.de/leistungen",
            categories: [
              "Wimpern (Klassisch 1:1, Soft & Russian Volume, Lash Lifting)",
              "Gesichtsreinigung & Pflege (Hollywood Glow, Microneedling)",
              "Permanent Make-up (Powder Brows, Ombré Brows)",
              "Schulungen & Masterclasses"
            ],
          };
        },
      });
    } catch {
      // Graceful fallback if browser does not support modelContext or registration was aborted
    }
  }, []);

  return null;
}

interface WebMcpContext {
  registerTool(tool: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    readOnlyHint?: boolean;
    execute: (input: Record<string, unknown>) => Promise<unknown>;
  }): Promise<void> | void;
}
