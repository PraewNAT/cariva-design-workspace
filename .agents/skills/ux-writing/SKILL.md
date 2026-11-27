---
name: ux-writing
description: The earlier UX Writing skill, kept for reference. Use only when the user asks to start copy work; it is not an automatic step of the latest plan
---

## Scope per the latest plan

Read AGENTS.md and rules/skill-routing.md before use. The latest rules override any older steps that conflict. This skill does not allow publishing, pushing, deploying, or starting version numbers automatically. Take external actions only when the user has actually assigned them.


# UX Writing

Use when the user says (Thai trigger phrases are kept so Thai-speaking users can still invoke it):

```
Check this copy  (Thai: "เช็ค copy นี้")
Recommend a tone  (Thai: "แนะนำ tone ให้หน่อย")
rewrite copy
Help write an error message  (Thai: "ช่วยเขียน error message")
Check grammar  (Thai: "เช็ค grammar")
```

---

## Mode

### Mode 1 — Grammar & Copy Check
Use when the user sends a Figma link or pastes text

Check:
- Typos and grammar
- Copy that is unclear or vague
- Placeholder used in place of a label
- Error messages that give no action
- Filler words that can be cut

Report format:
```
🔴 [original text] → [what it should be] — reason
🟡 [original text] → [suggested text] — reason
🟢 [note]
```

### Mode 2 — Tone Recommendation
Use when the user wants to know what tone the product should be written in

Ask first:
1. Is this product B2B or B2C?
2. Who is the main user? e.g. doctor, patient, admin, general user
3. Do they want Thai, English, or a mix of both?

Then propose 3 approaches, with 3 example sentences per tone:

| Tone | Characteristics | Best for |
|---|---|---|
| **Professional** | formal, direct, no personality | Healthcare, Finance, B2B admin |
| **Friendly** | warm, conversational, empathetic | Consumer app, HR tool |
| **Concise** | short, direct, no filler | Dashboard, Admin tool, Power user |

### Mode 3 — Rewrite
Use when the user gives the original copy + says which tone they want

- Rewrite in the chosen tone
- If it is in English, add a Thai translation alongside
- If it is in Thai, reply in Thai only

---

## Copy examples for each tone

(The Thai text after each English line is sample Thai UI copy and is kept verbatim.)

**Professional**
1. "Invalid username or password. Please try again." — ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่
2. "Your session has expired. Please log in to continue." — เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง
3. "Access denied. Contact your administrator for assistance." — ไม่มีสิทธิ์เข้าถึง กรุณาติดต่อผู้ดูแลระบบ
4. "Changes saved successfully." — บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว
5. "This field is required." — กรุณากรอกข้อมูลในช่องนี้

**Friendly**
1. "Oops! That password doesn't match. Want to try again?" — อุ๊ปส์! รหัสผ่านไม่ตรง ลองใหม่อีกครั้งได้เลย
2. "You've been away for a while — please log back in." — คุณไม่ได้ใช้งานสักพักแล้ว กรุณาเข้าสู่ระบบอีกครั้งนะ
3. "Looks like you don't have access to this. Reach out to your admin!" — ดูเหมือนคุณยังไม่มีสิทธิ์ตรงนี้ ลองติดต่อ admin ดูนะ
4. "All saved! You're good to go." — บันทึกแล้ว เรียบร้อยเลย
5. "Don't forget to fill this in!" — อย่าลืมกรอกช่องนี้ด้วยนะ

**Concise**
1. "Wrong credentials. Try again." — ข้อมูลไม่ถูกต้อง ลองใหม่
2. "Session expired. Log in." — เซสชันหมดอายุ เข้าสู่ระบบ
3. "No access. Contact admin." — ไม่มีสิทธิ์ ติดต่อ admin
4. "Saved." — บันทึกแล้ว
5. "Required." — จำเป็น

**Thai — Friendly** (Thai-only sample copy, kept verbatim; English gloss in parentheses)
1. "รหัสผ่านไม่ตรงนะ ลองเช็คดูอีกทีได้เลย" (The password doesn't match — feel free to check again)
2. "ดูเหมือนคุณไม่ได้ใช้งานสักพัก กรุณาเข้าสู่ระบบอีกครั้งนะคะ" (Looks like you haven't been active for a while — please log in again)
3. "ยังไม่มีสิทธิ์เข้าถึงส่วนนี้ ติดต่อ admin ได้เลยนะ" (You don't have access to this section yet — feel free to contact your admin)
4. "บันทึกเรียบร้อยแล้ว ไปต่อได้เลย" (Saved — you can carry on)
5. "อย่าลืมกรอกช่องนี้ด้วยนะ" (Don't forget to fill in this field)

---

## Rules

- Do not edit Figma while checking — report only
- If you do not know the product's context, ask first; do not guess the tone yourself
- Thai copy must not be so formal that it is stiff, nor so informal that it looks untrustworthy
- An error message must always say what happened + what the user can do next
