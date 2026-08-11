# gfplab-shelly-scripts

Collection of scripts for **Shelly Gen 2/3/4** devices.

## Available scripts

| Script | Description | README |
|---|---|---|
| `shelly-blu-mqtt-gateway.js` | MQTT gateway for Shelly BLU (BTHome) devices with runtime whitelist via KVS/MQTT | [shelly-blu-mqtt-gateway-README.md](shelly-blu-mqtt-gateway-README.md) |
| `shelly-lora-relay-tx.js` | LoRa transmitter — sends relay commands on local switch toggle | [shelly-lora-relay-README.md](shelly-lora-relay-README.md) |
| `shelly-lora-relay-rx.js` | LoRa receiver — receives relay commands and drives the local switch | [shelly-lora-relay-README.md](shelly-lora-relay-README.md) |

## General requirements

- Shelly Gen 2+ devices (for BLE/MQTT) or Gen 4 (for LoRa)
- Up-to-date firmware with scripting support enabled

## License

See [LICENSE](LICENSE).
