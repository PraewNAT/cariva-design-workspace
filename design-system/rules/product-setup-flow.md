# Product Setup Flow

Shared by Codex and Claude. Updated 25 November 2026. The goal is to collect only 4 starting fields and save them separately per Product for reuse; requirement/theme/business rules are not required at the setup step.

## Information requested from the Designer

```yaml
Product name:
Central Figma DS URL:
Product Figma DS URL: # Central only / Not yet created / URL
Screen-design Figma file URL: # Not yet created / URL
```

“Central only” (Thai: “ใช้ของกลางอย่างเดียว”) is a confirmed answer, not a blank. “Not yet created” (Thai: “ยังไม่มี”) is a known status: do not ask again on every task, and it is not an instruction to create a new file.

## Where records are stored

- Store each Product at `docs/products/<product-id>/PRODUCT.md`. Use a kebab-case ID that does not collide with existing ones. Keep the display name as the user gave it; do not change an existing ID just because the display name is renamed.
- Search the list in `docs/products/README.md` and the existing Product files before creating one. If a similar name or the same URL is found, check whether it is the existing Product or a new name; do not create a duplicate entry, and do not merge Products that share the same central DS on your own.
- The README is an index linking to the Product files. It does not copy the full set of URLs again, and it does not hold every person's active Product in a central file that people overwrite each other in.
- If there is no real Product yet, keep only the template/index. Do not create fictional Product A/B as confirmed data.

## Steps the AI must take

1. Read the central rules and check which Product is selected in the task/chat. If the Product is known, open that Product's record before asking for any information.
2. If all 4 fields are present, use them immediately and do not ask for the form to be filled in again. If some are missing, ask only for the missing fields, combined into a single question where reasonable.
3. If no Product has been selected and several are possible, ask once which Product to use. Do not automatically use the latest Product from another chat/another person as the answer.
4. Check the format and the Figma destination of each URL actually given. Keep the central DS, the Product DS and the screen file separate. Do not guess the file key/node-id, and do not change a query/node the user specified without a reason.
5. Check permissions/access with the available tools, without writing to Figma, creating files, publishing a library or starting a sync from setup alone. If access is not possible, record “Not yet checked” with the reason. Do not claim the link is definitely wrong or ask for the same URL again without explaining the problem.
6. Record the answers for all 4 fields in the Product file, and the check status separately. Having a URL does not prove that library linkage or a mapping to code exists.
7. Add a link in the index. Send a short summary of which Product it is, where it is recorded, and what could not be checked. Do not expand it into a requirement interview or implementation.
8. The next task reads the existing record first and uses “Central only/Not yet created” as recorded, without asking for the choice again. If the task needs to write to a destination that does not exist yet, ask only for the decision/URL that task needs.
9. When the user changes a URL or status, update the existing Product file, noting the date and a short description of the change. Do not edit other Products or change the shared DS URL for every Product on your own.

## Product file format

```markdown
# [Product name]

## Setup information confirmed by the user

Product name: [name]
Central Figma DS URL: [URL]
Product Figma DS URL: [Central only / Not yet created / URL]
Screen-design Figma file URL: [Not yet created / URL]

## Status checked by AI

- Product ID: [ID that does not collide with existing ones]
- Information updated: [actual date]
- Central DS: [Accessible / Not yet checked, with the reason and the date checked]
- Product DS: [Accessible / Central only / Not yet created / Not yet checked]
- Screen file: [Accessible / Not yet created / Not yet checked]
- Limitations: [library linkage / mapping not yet checked, or limitations found]

## Setup information changes

- [date]: [first record, or the field the user changed]
```

The check status is metadata that the AI records; it is not an extra field for the Designer to fill in. Do not put credentials/tokens in this file. Selecting a Product in chat does not lock the file to a single AI; if edits happen at the same time, check the latest file and preserve other people's work.

## Scope relative to design work

Requirements, users, flows, mock data and theme are discussed when design work starts, per the UI workflow; they are not all asked about in this setup. If the location for creating a component, or a specific page/frame/section, is not known yet, use the Core/Product selection flow and ask for the URL when it actually needs to be created, reusing a confirmed destination where possible.

Recording lets the next AI read the information from the same workspace; it is not automatic memory across machines. When the project is moved to another machine, these Product files and working Figma permissions must be there as well.
