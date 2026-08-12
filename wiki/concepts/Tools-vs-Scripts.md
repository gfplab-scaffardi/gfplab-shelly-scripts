---
title: "Tools vs Scripts"
type: concept
tags: [shelly, architecture, sibling-repos]
created: 2026-08-12
updated: 2026-08-12
sources: []
authority: context
lifecycle: active
---

# Tools vs Scripts

| | **gfplab-shelly-scripts** (this repo) | **gfplab-shelly-tools** |
|--|--------------------------------------|-------------------------|
| Runs on | Shelly device scripting engine | Operator PC / Docker / Electron |
| Language | Shelly Script (device JS) | Node.js |
| Job | [[BLU-MQTT-Gateway]], [[LoRa-Relay]] | Discover + P-Touch labels |
| Deploy | Paste into device Scripts UI | `npm` / Docker / pkg |
| MCP wiki | `llm-wiki-gfplab-shelly-scripts` | `llm-wiki-gfplab-shelly-tools` |

**Complementary lifecycle:** label and identify with **tools** at commission time; run **scripts** on the installed device for MQTT bridging or LoRa control.

No shared npm package. Domain overlap: Shelly BLU naming and MQTT topics consumed by Giano / GFP stack.

See [[overview]].
