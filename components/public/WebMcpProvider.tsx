"use client";

import { useEffect } from "react";

/**
 * WebMCP (Web Model Context Protocol) Client-Side Tool Registration Provider
 *
 * Implements W3C WebML & Chrome Agentic Browsing standards:
 * - Exposes structured client tools to in-browser AI agents
 * - Defines valid JSON Schemas for booking, inquiry, and treatment lookup
 * - Enables native agent actuation without fragile DOM scraping
 */
export default function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Standard WebMCP tools with strictly valid JSON Schemas
    const tools = [
      {
        name: "book_appointment",
        description:
          "Bucht oder fragt eine Beauty-Behandlung (Wimpern, Hollywood Glow Facials, Powder Brows) bei Aura Glow by Mürvet in 31224 Peine an.",
        inputSchema: {
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          properties: {
            first_name: {
              type: "string",
              description: "Vorname der Kundin oder des Kunden",
            },
            last_name: {
              type: "string",
              description: "Nachname der Kundin oder des Kunden",
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
          additionalProperties: false,
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
      },
      {
        name: "send_contact_message",
        description:
          "Sendet eine allgemeine Frage, Preisanfrage oder Beratungsnachricht an Aura Glow by Mürvet in Peine.",
        inputSchema: {
          $schema: "http://json-schema.org/draft-07/schema#",
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
          additionalProperties: false,
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
      },
      {
        name: "get_treatment_catalog",
        description:
          "Ruft die Behandlungswelten, Leistungsdetails und Preise von Aura Glow by Mürvet in Peine ab.",
        inputSchema: {
          $schema: "http://json-schema.org/draft-07/schema#",
          type: "object",
          properties: {
            category: {
              type: "string",
              description:
                "Optionale Kategorie: 'wimpern', 'gesichtsreinigung-pflege', 'permanent-make-up', 'schulungen'",
            },
          },
          additionalProperties: false,
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
              "Schulungen & Masterclasses",
            ],
          };
        },
      },
    ];

    // Ensure modelContext registry exists across window, document, and navigator
    const win = window as unknown as Record<string, unknown>;
    const doc = document as unknown as Record<string, unknown>;
    const nav = navigator as unknown as Record<string, unknown>;

    const registeredMap = new Map<string, typeof tools[0]>();

    const registerToolImpl = (tool: typeof tools[0]) => {
      registeredMap.set(tool.name, tool);
    };

    const getToolsImpl = () => Array.from(registeredMap.values());

    // Connect to or polyfill modelContext
    for (const target of [win, doc, nav]) {
      if (target.modelContext && typeof (target.modelContext as { registerTool?: unknown }).registerTool === "function") {
        for (const t of tools) {
          try {
            (target.modelContext as { registerTool: (tool: unknown) => void }).registerTool(t);
          } catch {
            // ignore registration duplicate errors
          }
        }
      } else {
        target.modelContext = {
          registerTool: registerToolImpl,
          getTools: getToolsImpl,
          tools: getToolsImpl,
        };
      }
    }

    // Register all tools into the internal registry
    for (const t of tools) {
      registerToolImpl(t);
    }

    // Expose global registry for agent inspection / Lighthouse test runner
    win.__webmcp_tools__ = tools;
    win.__webmcp_context__ = {
      tools: getToolsImpl(),
      registerTool: registerToolImpl,
    };
  }, []);

  return null;
}
