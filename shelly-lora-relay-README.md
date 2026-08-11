# Shelly LoRa Relay — TX / RX

A pair of scripts for **Shelly 1 Gen 4** that lets you control a remote relay over **LoRa** (868 MHz), with no Wi-Fi or cloud required.

## Overview

| Device | Script | Role |
|---|---|---|
| Shelly TX (e.g. button / switch) | `shelly-lora-relay-tx.js` | Detects the local switch toggle and sends a LoRa command |
| Shelly RX (e.g. light / load) | `shelly-lora-relay-rx.js` | Receives the LoRa command and drives its own switch |

### 3-phase logic (TX)

The TX implements a cyclic 3-phase counter for each ON press:

| ON press # | Phase | TX (local) | RX (remote) |
|---|---|---|---|
| 1 | 1/3 | ON | OFF |
| 2 | 2/3 | ON | OFF |
| 3 | 3/3 | ON | **ON** |

When the TX switch is turned off, RX=OFF is always sent.

### Protocol

LoRa messages are Base64-encoded JSON:

```json
{
  "t": "relay",
  "on": true,
  "phase": 3,
  "onCount": 3,
  "reason": "tx_on"
}
```

- **t** — message type (`"relay"`)
- **on** — desired RX relay state
- **phase** — current phase (1-3)
- **onCount** — total TX on-count
- **reason** — `"tx_on"` or `"tx_off"`

## Prerequisites

- 2× **Shelly 1 Gen 4** (or any Gen 4 with LoRa support)
- Firmware with LoRa support enabled
- **LoRa** add-on activated on both devices

## LoRa plug-in setup

### 1. Enable LoRa on the device

1. Open the Shelly web UI (`http://<shelly-ip>`)
2. Go to **Settings → Add-ons → LoRa**
3. Enable the LoRa component
4. Note or set the **LoRa ID** — defaults to `100`, must match on both TX and RX

### 2. Configure LoRa communication

Via RPC (HTTP or web console):

```
http://<shelly-ip>/rpc/LoRa.SetConfig?id=100&config={"enable":true}
```

Check the status:

```
http://<shelly-ip>/rpc/LoRa.GetStatus?id=100
```

### 3. Upload the scripts

1. In the web UI → **Scripts**
2. Create a new script, paste the contents of `shelly-lora-relay-tx.js` on the TX Shelly
3. Create a new script, paste the contents of `shelly-lora-relay-rx.js` on the RX Shelly
4. Enable **"Run on startup"** for both
5. Start the scripts

### 4. Verification

- In the TX script console, toggling the switch will show `[TX] SEND ...`
- In the RX script console you will see `[RX] CMD on=...` with the RSSI value
- The RX relay will only activate on the 3rd consecutive ON press (3-phase logic)

## Configurable parameters

Both scripts:

| Variable | Default | Description |
|---|---|---|
| `LORA_ID` | `100` | LoRa component ID (must match on TX and RX) |
| `SWITCH_ID` | `0` | Local switch ID |

## Troubleshooting

- **No reception** — verify that `LORA_ID` is identical, LoRa is enabled, and the devices are within LoRa range (up to ~10 km line-of-sight)
- **Very low RSSI** (< -120 dBm) — move devices closer or improve antennas
- **`[TX] skip busy`** — the previous message has not finished sending yet; the toggle was too fast
