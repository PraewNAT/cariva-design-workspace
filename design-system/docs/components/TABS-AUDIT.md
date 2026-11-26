**Component Audit — Core / Tabs**
ผลรวม: เพิ่ม Standard/Pills/Folder ครบและอัปเดตเอกสารแล้ว; interaction ผ่าน ยังมี contrast ค้าง
ขอบเขต: Tabs recipes, 10 dedicated stories, CatalogNavigation และ 5 Core catalog stories; browser desktop/320px และ Dialog. ไม่ใช่การรับรอง accessibility ทุก Product

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| กลาง | ต้องแก้ | Primary blue/white 3.5:1 ต่ำกว่า 4.5:1; รวม selected labels/counts | output/tabs/tests.txt; Figma Callout | ตัดสินใจสีที่ต้นทาง; ไม่เปลี่ยน token กลางในงานนี้ |
| กลาง | ต้องแก้ | Catalog ยังมี contrast และ label-content-name-mismatch ของ controls อื่น | tests.txt, catalog sections | แยกแก้ component เจ้าของ; ไม่อ้าง catalog a11y ผ่าน |
| — | ผ่าน | Standard 48/32, Pills 36/48, Folder 56; text ขั้นต่ำ12; ไอคอน SVG เดิม | Browser computed styles, tabs.css | ใช้ recipes กลาง |
| — | ผ่าน | Keyboard จริง: disabled โฟกัสได้แต่ Enter ไม่เลือก; ถัดไป Enter เปิด panel; Dialog Escape คืน focus | Browser native keyboard + KeyboardAndDisabled / PageAndDialog | คง Base UI contract |
| — | ผ่าน | Page/Dialog ใช้ padding/radius/font/height ตรงกัน; 320px page width320 และ Folder scroll ภายใน | Browser computed geometry; MobileThai | คง wrapper |
| — | ผ่าน | 15/15 interaction stories, build/token/coverage ผ่าน; lint มี warning export cva เดิมหนึ่งรายการ | output/tabs/; 43/43 story-file coverage | ไม่ถือเป็น full-state coverage |
| — | ผ่าน | Markdown, Storybook และ Figma template docs ครบ27 linked specimens; own text≥20 ไม่ล้นแนวนอน | figma-verification.json; mapped4838:64978 | ใช้ node เดิมครั้งต่อไป |

สรุป: ผ่าน5, ต้องแก้2กลุ่ม; ไม่มี runtime test fail ใน scope ที่รัน
ต่อไป: ตัดสินใจ contrast ต้นทางก่อนอ้าง normal-text AA

**Reuse & Duplicate Check — Core / Tabs**
ผลรวม: ขยาย Tabs เดิม ไม่สร้าง primitive หรือ Badge ซ้ำ
ขอบเขต: ค้น source consumers และตรวจหลังแก้; Base UI Tabs + Badge เดิม

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | สามตระกูลอยู่ใน tabs.tsx / Core/Components/Tabs เดียว; CatalogNavigation reuse export เดิม | src/lib/app/components/ui/tabs.tsx; CatalogNavigation.tsx | ไม่ต้องดำเนินการเพิ่ม |

สรุป: ผ่าน1, ต้องแก้0, ตรวจไม่ได้0
ต่อไป: ไม่ต้องดำเนินการเพิ่ม

### Motion follow-up - 2026-11-26

Pointer selection: computed indicator transition 0.2s and transform follows the selected item; real keyboard Right/Enter: computed transition 0s and correct active item. Uses existing Base UI Indicator. Reduced-motion media override disables all transitions; actual OS preference was not toggled in this audit. 15 focused interaction stories and build passed; existing contrast findings remain. Evidence: output/tabs/motion-tests.txt and motion-build.txt.

Motion correction: hover surface previously covered Standard underline. Raised indicator above tab surface; real pointer click now preserves visible2px underline, transition0.35s. Slowed Standard/Pills to350ms and Folder to320ms per user feedback. Keyboard/reduced-motion remain immediate.
