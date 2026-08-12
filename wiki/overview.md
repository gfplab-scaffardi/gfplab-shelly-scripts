---
title: "Overview — gfplab-shelly-scripts"
type: overview
tags: [overview, shelly, scripts, mqtt, lora]
created: 2026-08-12
updated: 2026-08-12
sources: []
authority: context
lifecycle: active
---

# Overview — gfplab-shelly-scripts

Collection of **on-device Shelly Scripts** (Gen 2/3/4) that run inside the Shelly scripting engine for GFP Lab field behaviour.

## What this repo is / is not

| Is | Is not |
|----|--------|
| JS uploaded to Shelly **Scripts** UI | Host Node.js discovery/label tools |
| Runtime BLE→MQTT and LoRa relay logic | Firmware patches |
| Ops READMEs next to each script | A deploy pipeline / npm package |

Sibling host tooling: **gfplab-shelly-tools** — see [[Tools-vs-Scripts]].

## Purpose

Provide maintainable, versioned scripts for:

1. Bridging Shelly BLU / BTHome (and Minew S4) sensors into MQTT for Giano Supervisor / GFP stack
2. Controlling a remote relay over LoRa without Wi-Fi/cloud (Gen 4 + LoRa add-on)

## Scripts

| Script | Status (in-file) | Wiki |
|--------|------------------|------|
| `shelly-blu-mqtt-gateway.js` | production | [[BLU-MQTT-Gateway]] |
| `shelly-lora-relay-tx.js` | experimental | [[LoRa-Relay]] |
| `shelly-lora-relay-rx.js` | experimental | [[LoRa-Relay]] |

Operator docs in git: `shelly-blu-mqtt-gateway-README.md`, `shelly-lora-relay-README.md`, root `README.md`.

## Flow (deploy)

1. Ensure device Gen / firmware supports scripting (and LoRa add-on for relay pair).
2. Configure MQTT (gateway) or LoRa IDs (relay) on the device.
3. Paste script into Shelly web UI → Scripts; enable **Run on startup**; start.
4. Configure whitelist (gateway) or verify TX/RX logs (relay).

## Triggers

- Device boot (Run on startup)
- BLE advertisements / MQTT config topics ([[BLU-MQTT-Gateway]])
- Local switch toggle / LoRa RX events ([[LoRa-Relay]])

## Dependencies

- Shelly Gen 2+ (BLE/MQTT gateway) or Gen 4 with LoRa (relay)
- Scripting enabled; MQTT broker reachable for gateway
- Matching `LORA_ID` on TX and RX for LoRa pair

## Related

- Host tools wiki: MCP `llm-wiki-gfplab-shelly-tools`
- Agent entry: `llms.txt`, [[current-focus]]
