---
title: "BLU MQTT Gateway"
type: concept
tags: [shelly, blu, bthome, mqtt, gateway]
created: 2026-08-12
updated: 2026-08-12
sources: []
authority: context
lifecycle: active
---

# BLU MQTT Gateway

## Purpose

On a Shelly Gen 2/3 (scripting + BLE), continuously scan BLE, decode **BTHome v2** (Shelly BLU) and **Minew S4** packets for a MAC whitelist, and publish status to MQTT for Giano Supervisor / GFP consumers.

Code: `shelly-blu-mqtt-gateway.js` · ops: `shelly-blu-mqtt-gateway-README.md`.

## Flow

1. Script starts; reads device MQTT topic prefix / connection state.
2. BLE scan runs; packets filtered by whitelist MAC.
3. Decode BTHome object IDs (battery, window, motion, button, temp/humidity, …) or Minew S4.
4. Publish to `gfplab/ble/<type>-<mac>/status` (under device topic prefix conventions).
5. Whitelist updates via **KVS** (`gfp.ble.wl.<name>`) or MQTT config on `<topic_prefix>/gfplab/config`.

## Triggers

- Shelly Script “Run on startup” + Start
- Incoming BLE advertisements
- MQTT config messages / KVS sets for whitelist
- Optional timer re-publish (`ENABLE_TIMER_PUBLISH`, `TIMER_PERIOD_MS`)

## Dependencies

- MQTT configured on the Shelly
- BLE capable Gen 2/3 firmware with scripting
- Whitelist entries (empty whitelist → no publishes of interest)

## Tunables (in-script)

| Variable | Role |
|----------|------|
| `DEBUG_ENABLED` / `DEBUG_UNKNOWN_MAC` | Logging |
| `USE_EVENTS` | Event-based publish (slower) |
| `MQTT_QOS` / `MQTT_RETAIN` | Publish flags |
| `ENABLE_TIMER_PUBLISH` | Periodic cache republish |

## Edge cases

- Unknown MACs logged once only if `DEBUG_UNKNOWN_MAC`
- Derived from Allterco BLU examples; keep decode tables aligned when new BLU object IDs appear

## Related

[[overview]] · [[Tools-vs-Scripts]] — host tools can discover BLU SSIDs/names but do not run this gateway.
