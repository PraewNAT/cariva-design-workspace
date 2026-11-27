---
name: localization-export
description: Pull all text from a Figma screen/flow to check translation readiness (i18n readiness), categorize and export/update it as Excel, and translate with AI (a person must review before real use) — use when the user says export text ("export ข้อความ"), pull text to localization ("ดึงข้อความไป localization"), make a localization sheet ("ทำ localization sheet"), update localization ("อัปเดต localization"), translate localization ("แปล localization")
---

# Localization Export

Use when the user says (Thai trigger phrases are kept so Thai-speaking users can still invoke it):

```
Pull the text to localization  (Thai: "ดึงข้อความไป localization")
export text [name] node-id=[id]  (Thai: "export ข้อความ [ชื่อ] node-id=[id]")
Make a localization sheet  (Thai: "ทำ localization sheet")
Update localization [name] node-id=[id]  (Thai: "อัปเดต localization [ชื่อ] node-id=[id]")
Please translate the localization  (Thai: "แปล localization ให้หน่อย")
Please translate the languages that are still missing  (Thai: "แปลภาษาที่ยังไม่มีให้หน่อย")
```

---

## Pre-flight

1. **Always ask for the Product name first** — both on the first export and on every update (do not guess that there is only one file and skip this — always ask to be sure which file will be edited)
2. Output file: `localization/localization-[product].xlsx`
   - If this file does not exist yet → Export mode (create new)
   - If this file already exists and the user gives a normal export/update command → Update mode (see the "Update mode" section below)
   - If the user directly says "translate" (Thai: "แปล") → Translate mode (see the "Translate mode" section below) — no need to re-scan Figma
3. Receive the node-id (the frame/flow/page to pull text from)
4. Walk the structure to find TEXT layers that are **visible only** — you must **always walk at full depth from the first pass**; do not use a depth-limited scan and then ask later whether to "go deeper", so that no text is missed from deeply nested nodes (e.g. a dialog nested several levels deep)
5. Filter out mock data — text that is sample values the user typed into a form (not the system's static copy) is not put in any sheet. If unsure whether it is mock data or real copy, ask
6. Check **i18n Readiness** during the same walk (see the section below) — the result of this check directly affects how keys are set in the next step, so it must be done before categorizing

---

## i18n Readiness Check (done during the same scan pass as pulling the text)

Check each text layer found:

1. **Can the text container stretch?** — if the text is in a frame with fixed width/height (not auto-layout hug/fill) → flag that translated text risks overflowing, especially in limited-space spots (button, tab, badge, chip)
2. **Text mixed with variables/real data** — e.g. "Total : 100 Items" must be split into the static parts ("Total :", "Items") and the dynamic part ("100") before setting keys — **never take a whole string mixed with numbers/real names as a single key**, because it cannot really be translated and breaks when the value changes
3. **TH vs EN length differs a lot in limited-space spots** — if one language is clearly longer than the other (narrow button/tab/badge) → flag as a warning
4. **Hardcoded number/date/currency format** — if a fixed format (e.g. "31/12/2026") is found where it should adapt to the language → flag it

**Output of the readiness check:** show it as a separate section in the report before the Excel table, for example:

```
## i18n Readiness
🟡 "Total : 100 Items" (Table Footer) — number mixed with static text, the key should be split
🟡 Button "Login" (fixed 42px) — if translated to a longer word such as "เข้าสู่ระบบ" (Thai for "Log in"), check whether the container can stretch
✅ No problems found elsewhere
```

- No RTL (right-to-left) check rule is needed because this team uses only Thai/English

---

## Sheet Structure

### Cross-cutting group (reusable across every feature)

| Sheet | What it holds | Key format |
|---|---|---|
| CTA | General buttons/actions | `cta.[description]` |
| Toast | Notification messages that pop up then disappear | `toast.[type].[description]` |
| Form Validation | Errors under a field that are reusable across every form | `validation.[description]` |
| Empty State | Messages shown when there is no data | `empty.[description]` |
| Navigation | Menu/sidebar/breadcrumb | `nav.[description]` |
| Table/List Controls | Words used in tables/lists on every page | `table.[description]` |

### Feature-specific group

| Sheet | What it holds | Key format |
|---|---|---|
| [feature name] | Header, body, errors specific to that feature | `[feature].[type].[description]` |

---

## Grouping rules (check in order — use the first one that matches; do not keep checking)

1. It is a Toast/Snackbar/Notification component (floats above the main layout, appears temporarily) → **Toast**
2. It is the label of a Button/IconButton/Link that triggers an action when pressed → **CTA**
3. It is helper/error text under a field **and** the text is a general rule not tied to specific business logic → **Form Validation**
   - If the error has business-specific content (e.g. states a condition/number/feature name) → skip to rule 7 (Feature) instead
4. It is inside a Table/DataGrid/Pagination/Toolbar component → **Table/List Controls**
5. It is inside a Sidebar/Navbar/Menu/Breadcrumb → **Navigation**
6. It is the "no data" message of an empty list/table → **Empty State**
7. It matches none of the conditions → **Feature sheet** named after the page/frame the text is in

**Additional rules:**
- Always check for duplicate keys first, whichever sheet — exactly the same text uses the existing key; do not create a duplicate
- If more than 1 condition applies and it is unclear which to choose → stop and ask the user; do not guess
- Keys must not use counters (`_1 _2 _3`) — always use a short-description that conveys specific meaning

---

## Output Columns (every sheet uses the same structure)

| Key | Type | TH | EN | Context | Status |
|---|---|---|---|---|---|
| `login.error.locked` | error | บัญชีถูกระงับชั่วคราว 5 นาที | Login has been temporarily disabled for 5 minutes | Login page after 3 wrong attempts | Confirmed |

- **Context** = the page/situation where this text appears (helps translators avoid mistranslating the meaning)
- **Status** = `Confirmed` (text comes from real Figma, both TH/EN) or `AI Draft — Needs Review` (not yet translated/reviewed by a person)
- If the Figma file has only one language → **leave the other column empty for now** (do not translate at export/update time), set Status to empty/`Not Translated` — wait for a separate later command "Please translate localization" (Thai: "แปล localization ให้หน่อย") (see Translate mode)

**Dropdown (Data Validation) — must be added every time a new file is created (Export mode), without asking:**
- The **Status** column of every data sheet → dropdown list: `Not Translated`, `AI Draft — Needs Review`, `Confirmed`
- The **Severity** column in the "i18n Readiness" sheet → dropdown list: `Warning`, `Info`, `Pass`, `Resolved`
- Set the dropdown range wide enough to cover rows that will be added later from Update mode (not just the rows with data at export time)

**Conditional Formatting — must be added every time a new file is created (Export mode), without asking:**
- Every data sheet: if the **Type = "error"** column → the whole row's text is red (`#DC2626`) so it is easy to scan which rows are error messages
- Use conditional formatting (not a fixed color) so it also covers new rows added later from Update mode

---

## Update mode (when an existing `localization-[product].xlsx` file is found)

1. The Product name was already confirmed in Pre-flight — do not ask again
2. Scan the new node as usual, then compare with the keys already in the file:
   - **Existing text, unchanged** → skip, do not touch
   - **Same key but the content changed** (copy edited) → update only the TH/EN columns of that row; do not delete the key (in case dev still references the old key in code)
   - **New text that never existed** → add a new row at the end of the relevant sheet (use the grouping rules above)
   - **A key that is in the file but is no longer found in Figma** → do not delete automatically; mark it "No longer found in Figma — delete?" and always ask the user first
3. **Also check the "i18n Readiness" sheet on every update** — not just the data sheets:
   - If a problem flagged earlier (e.g. a typo, text mixed with variables) is no longer found in Figma (fixed) → automatically mark that row **Resolved**, with a note of what it originally was
   - If new problems are found from added/edited text → add new rows in this sheet as usual
4. Final summary report: how many rows added, how many edited, how many keys possibly no longer used, how many i18n problems resolved

---

## Translate mode (commanded separately later, e.g. "translate the localization" — Thai: "แปล localization ให้หน่อย")

1. Ask for the Product name → open the existing `localization/localization-[product].xlsx` file (no file → say it has never been exported and export first)
2. Find rows where the TH or EN column is still empty (Status = empty/`Not Translated`)
3. Translate with AI following the tone from `shadcn/DESIGN.md` — fill the missing column
4. Always change that row's Status to **`AI Draft — Needs Review`** — **never set it to `Confirmed`** because no one has reviewed it
5. Final summary report: how many rows were translated, with a warning that "this set of translations comes from AI and must be reviewed by a person before real use"

---

## Export

Export/update as .xlsx via the `xlsx` skill — must include the dropdown (Data Validation) and conditional formatting (error = red text) as specified in "Output Columns" every time a new file is created

---

## Rules

- Do not edit Figma while working — export only
- Do not guess TH/EN if the file has only one language — leave it empty
- Do not guess whether text is mock data or real copy if it is unclear — ask first
- Before setting a new key, always check the keys already in the file first (to avoid duplicates)
- Update mode must also sync the "i18n Readiness" sheet every time — never leave a fixed problem lingering as a Warning
- The scan must always be full-depth from the first pass; never scan depth-limited and then ask to re-scan later
- Do not delete keys that disappeared from Figma without asking the user first
- Ask for the Product name every time, for both export and update — do not guess from context
- Text mixed with variables/real data (e.g. with a trailing number) must never be set as a single key combined with the dynamic part — always split it first
- Translations that AI produces in Translate mode must always be marked with Status `AI Draft — Needs Review`; never set it to `Confirmed` yourself
