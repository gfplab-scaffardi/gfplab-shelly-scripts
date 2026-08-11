# Shelly BLU MQTT Gateway

Script for **Shelly Gen 2/3** devices that acts as a BLE → MQTT gateway for **BTHome** (Shelly BLU) and **Minew S4** sensors.

## How it works

1. The Shelly runs a continuous BLE scan
2. Filters devices through a **whitelist** (MAC address)
3. Decodes BTHome / Minew S4 packets
4. Publishes the status to MQTT on topic `gfplab/ble/<type>-<mac>/status`

## Supported sensors

- **BTHome v2** (Shelly BLU Door/Window, Motion, Button, H&T, etc.)
- **Minew S4** (door/window sensor)

## Whitelist

The whitelist can be configured in two ways:

### Via KVS (persistent)

Store entries in the Shelly Key-Value Store with key `gfp.ble.wl.<name>`:

```
http://<ip>/rpc/KVS.Set?key="gfp.ble.wl.sensor1"&value="{\"mac\":\"aa:bb:cc:dd:ee:ff\",\"type\":\"bthome\",\"desc\":\"Garage door\"}"
```

### Via MQTT (runtime)

Publish a JSON message to the topic `<topic_prefix>/gfplab/config`:

```json
{
  "ble": {
    "wl": [
      { "mac": "aa:bb:cc:dd:ee:ff", "type": "bthome", "desc": "Garage door" },
      { "mac": "11:22:33:44:55:66", "type": "minew", "desc": "Kitchen window" }
    ]
  }
}
```

## Configurable parameters

| Variable | Default | Description |
|---|---|---|
| `DEBUG_ENABLED` | `true` | Enable debug logging |
| `DEBUG_UNKNOWN_MAC` | `false` | Log unknown BLE MACs once |
| `USE_EVENTS` | `false` | Use Shelly events instead of direct publish (slower) |
| `MQTT_QOS` | `0` | MQTT QoS level |
| `MQTT_RETAIN` | `false` | MQTT retain flag |
| `ENABLE_TIMER_PUBLISH` | `false` | Periodically re-publish cached status |
| `TIMER_PERIOD_MS` | `60000` | Timer interval (ms) |

## Setup

1. Configure MQTT on the Shelly (Settings → MQTT)
2. Upload `shelly-blu-mqtt-gateway.js` in Scripts
3. Enable "Run on startup"
4. Add sensors to the whitelist (KVS or MQTT)
