---
name: changelog
description: บันทึกหรือสรุปการเปลี่ยนแปลง component/token จากหลักฐานจริง ช่วง Draft ใช้วันที่และ commit ไม่เริ่มเลข release เอง
---

# Changelog

Read the current diff/commits and existing changelog in the actual target package. Infer the authorized scope from the request; ask only for a missing baseline that materially changes the summary.

During Draft use a dated heading with an available commit/checkpoint reference. Do not default to v1.0.0, ask for major/minor/patch, or number/publish a DS release until the user explicitly requests starting releases. A Git commit is history, not a numbered DS release.

Summarize only verified added/changed/removed behavior, fixes, token changes and migration impact. Use Thai prose with exact English component/token/prop names. Skip empty categories; do not invent rationale. When writing is requested, prepend to the existing changelog without changing older entries; if none exists use an appropriate package/project location and report it. A request only to summarize does not require creating a file.

Once releases are explicitly enabled, follow the team's actual version policy and assigned version. Do not publish or push as a side effect of writing history.
