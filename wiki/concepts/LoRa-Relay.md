---
title: "LoRa Relay"
type: concept
tags: [shelly, lora, relay, gen4]
created: 2026-08-12
updated: 2026-08-12
sources: []
authority: context
lifecycle: active
---

# LoRa Relay

## Purpose

Pair of **experimental** scripts for Shelly **1 Gen 4** (LoRa add-on): control a remote relay over **868 MHz LoRa** with no Wi-Fi or cloud.

| Device role | File |
|-------------|------|
| TX (local switch / button) | `shelly-lora-relay-tx.js` |
| RX (remote load) | `shelly-lora-relay-rx.js` |

Ops: `shelly-lora-relay-README.md`.

## Flow — TX 3-phase ON cycle

On each TX switch **ON** press, a cyclic phase advances:

| ON press # | Phase | TX local | RX remote |
|------------|-------|----------|-----------|
| 1 | 1/3 | ON | OFF |
| 2 | 2/3 | ON | OFF |
| 3 | 3/3 | ON | **ON** |

TX **OFF** always sends RX=OFF. Payload is Base64 JSON via `LoRa.SendBytes`:

`{ t: "relay", on, phase, onCount, reason }` (`tx_on` / `tx_off`).

## Flow — RX

1. LoRa event handler decodes Base64 → JSON.
2. If `t === "relay"`, calls `Switch.Set` with `on`.
3. Logs RSSI for field debug.

## Triggers

- TX: `switch:N` toggle events; boot reads current output
- RX: LoRa component events for matching `LORA_ID`
- Deploy: upload both scripts, Run on startup, enable LoRa add-on (`LoRa.SetConfig`)

## Dependencies

- 2× Gen 4 with LoRa support; identical `LORA_ID` (default `100`)
- `SWITCH_ID` (default `0`) on each device
- LoRa range / antennas; busy TX skips rapid toggles (`[TX] skip busy`)

## Edge cases

- Mismatched LoRa IDs → no RX
- Very low RSSI (< -120 dBm) → move closer / antenna
- Status experimental — validate before production sites

## Related

[[overview]] · [[Tools-vs-Scripts]]
