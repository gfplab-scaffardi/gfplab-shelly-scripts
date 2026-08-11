# Wiki Schema and Conventions

> Structure, workflows, and quality standards for this project's wiki.
> Read at the start of every session. Update when conventions change.

---

## Language

**All wiki pages must be written in English** (Cursor User Rules).
Frontmatter fields (`title`, `tags`, etc.) keep technical formats (ISO dates, lowercase-with-hyphens tags).
Chat replies to the user may be Italian; wiki and code stay English.

---

## Directory layout

```
{project-root}/
├── docs/         # Source documents (optional)
└── wiki/         # LLM-maintained knowledge base
    ├── SCHEMA.md
    ├── index.md
    ├── log.md
    ├── concepts/
    ├── entities/
    └── sources/
```

`WIKI_ROOT` for llm-wiki MCP is the **project root** (parent of `wiki/`).

---

## Page types

- **concepts/** — how things work
- **entities/** — systems, modules, services
- **sources/** — external docs / URLs

Use `[[Wiki-Links]]` between pages. Append dated entries to `log.md` after significant changes.

*Schema version 3.0 — English wiki.*
