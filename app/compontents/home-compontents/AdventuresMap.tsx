
"use client";
import { useState } from "react";
import ActivityBadge from "../ActivityBadge";

import {locations } from "@/app/data/content";


export default function AdventuresMap() {
    return (
        <section className="py-24 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-2">
                Adventures map
              </p>
              <h2 className="font-serif text-4xl text-charcoal mb-6">
                Places & Trails
              </h2>
              <p className="text-sm text-muted-fg leading-relaxed mb-8 max-w-md">
                From the snow-capped Himalayas to ancient ruins in the Deccan —
                each dot on this map holds a story worth telling.
              </p>
              <div className="space-y-3">
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        loc.type === "trekking"
                          ? "bg-trek"
                          : loc.type === "travel"
                          ? "bg-travel"
                          : "bg-run"
                      }`}
                    />
                    <span className="font-serif text-sm text-charcoal">
                      {loc.name}
                    </span>
                    <span className="font-mono text-[10px] text-muted-fg tracking-wide">
                      {loc.state}
                    </span>
                    <ActivityBadge type={loc.type as ActivityType} />
                  </div>
                ))}
              </div>
            </div>

            {/* Stylized map */}
            <div className="relative bg-cream border border-border p-8 aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-fg mb-4 text-center">
                India · Adventure Map
              </p>
              <svg
                viewBox="0 0 100 120"
                className="w-full h-auto"
                fill="none"
              >
                {/* Simplified India outline */}
                <path
                  d="M35,5 L45,3 L58,5 L68,10 L72,18 L75,28 L72,38 L78,45 L80,55 L75,65 L70,72 L65,80 L60,88 L55,95 L50,105 L47,112 L44,105 L40,95 L35,85 L28,75 L22,65 L20,55 L22,45 L25,35 L22,28 L25,18 L30,12 Z"
                  stroke="#D5CFC6"
                  strokeWidth="0.8"
                  fill="#FAF7F2"
                />
                {/* Location dots */}
                {locations.map((loc) => (
                  <g key={loc.name}>
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="1.5"
                      className={
                        loc.type === "trekking"
                          ? "fill-trek"
                          : loc.type === "travel"
                          ? "fill-travel"
                          : "fill-run"
                      }
                    />
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="3"
                      className={
                        loc.type === "trekking"
                          ? "fill-trek/20"
                          : loc.type === "travel"
                          ? "fill-travel/20"
                          : "fill-run/20"
                      }
                    />
                    <text
                      x={loc.x + 2}
                      y={loc.y - 1.5}
                      fontSize="3"
                      fill="#6B6560"
                      fontFamily="DM Mono, monospace"
                    >
                      {loc.name}
                    </text>
                  </g>
                ))}
              </svg>
              {/* Legend */}
              <div className="flex gap-4 justify-center mt-4">
                {[
                  { label: "Trekking", cls: "bg-trek" },
                  { label: "Travel", cls: "bg-travel" },
                  { label: "Running", cls: "bg-run" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${l.cls}`} />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-fg">
                      {l.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    )
}