# Cariva DS — แนวทางการออกแบบ

## รูปแบบวันที่

- วันที่ในช่องกรอกและข้อความแสดงวันที่ใช้ **DD/MM/YYYY** เช่น `20/01/2022` เติมเลขศูนย์ให้วันและเดือนครบสองหลัก
- ช่วงวันที่ใช้ `20/01/2022 - 09/02/2022`
- กฎนี้กำหนดรูปแบบการแสดงผล ไม่เปลี่ยนปี ค.ศ./พ.ศ. หรือค่าข้อมูลเดิมโดยอัตโนมัติ

อัปเดต 25 พฤศจิกายน 2026 ปรับจากเอกสารที่ผู้ใช้ส่ง โดยยึดคำสั่งล่าสุดและ Figma ปัจจุบัน ไม่ใช่การยืนยันว่า runtime sync ทุกตัวแล้ว

ทิศทาง: สะอาด เป็นมิตร และมีความเป็นเครื่องมือทำงาน จัดข้อมูลแน่นภายในกลุ่มที่อ่านง่าย และเว้นพื้นที่ระหว่างกลุ่มให้ชัดเจน ส่วนพื้นผิวและการจัดวางด้านล่างปรับแนวคิดจาก `awesomic.com-DESIGN.md` ที่ผู้ใช้ให้ โดยใช้กับ Product UI หลังบ้านของ Cariva

## แหล่งอ้างอิง

- Visual tokens: [Figma DS](https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt) และรายการครบใน [VARIABLES.md](design-references/figma/VARIABLES.md)
- โค้ดปัจจุบัน: `tokens.json` → `npm run tokens:generate` → `src/lib/core/design-system/tokens/tokens.ts`, `generatedPalette.ts` และ `semantic.generated.css`; theme entry คือ `src/app/globals.css` (shadcn Base UI)
- การนำกฎไปใช้: [Core rules](rules/core-rules.md); เมื่อแจ้งว่าแก้ variables ให้ทำ [Variable change flow](rules/figma-variable-change-flow.md)
- ค่าจากเอกสารเก่าหรือ snapshot เป็นหลักฐานของเวลาที่อ่าน ไม่ทับ Figma ล่าสุดหรือคำสั่งผู้ใช้

## สี

ใช้ semantic tokens ใน component และ CSS/theme adapter ไม่ใส่ raw hex หรือ primitive Slate/Tailwind เพื่อแทน role โดยตรง ค่า hex ในเอกสาร/ไฟล์ export ใช้อ้างอิงได้ ไม่ใช่สิทธิ์ให้ hardcode ใน UI

| บทบาท | Token | ค่าที่อ่านล่าสุด |
|---|---|---|
| พื้นหน้า | `color/bg/white` | White |
| App shell | `color/bg/subtle` | Slate 100 |
| Card/input/menu | `color/on-surface/default` | White |
| Modal/popover | `color/on-surface/elevated` | White |
| ข้อความ/ไอคอนหลัก | `color/content/primary` | Slate 900 |
| ข้อความ/ไอคอนรอง | `color/content/secondary` | **Slate 700 / #334155** |
| Placeholder | `color/content/placeholder` | Slate 500 |
| Disabled content | `color/content/disabled` | Slate 400 |
| ขอบทั่วไป/divider | `color/border/default` | **Slate 200 / #E2E8F0** |
| ขอบเน้น | `color/border/strong` | **Slate 300 / #CBD5E1** |
| ขอบ disabled | `color/border/disabled` | **Slate 100 / #F1F5F9** |
| ขอบ focus/system | `color/border/system` | Blue 600 / #2563EB |
| ขอบ validation error | `color/border/error` | Red 600 / #DC2626 |
| Primary action | `color/brand/primary/on-surface/default` | Dodger blue 600 / #1789FA |
| Selected surface | `color/on-surface/action/selected` | Dodger blue 50 |

- `bg` สำหรับพื้นระดับหน้า; `on-surface` สำหรับผิว component และสถานะ interaction; `content` สำหรับข้อความและไอคอน
- `brand/primary` และ `brand/secondary` ใช้ตามบทบาทแบรนด์ ไม่ตีความ brand secondary ว่าเป็นข้อความรอง
- Destructive/error/validation ใช้ `color/status/error/*`; success/warning/info ใช้ตระกูล status ที่ตรงความหมาย พร้อมข้อความหรือไอคอน ไม่พึ่งสีอย่างเดียว
- `color/accent/*` ใช้กับชุดข้อมูลในกราฟ avatar หรือกลุ่มตกแต่ง ไม่ใช้แทนสี error/validation/brand; legend และรูปแบบเส้นต้องช่วยแยกข้อมูลด้วย
- Focus ใช้ `color/border/system`; ห้ามสร้างกลุ่มสี text/icon/danger/field/foreground หรือ alias ใหม่เพื่อหลบ semantic token ที่มีอยู่
- บน filled surface ให้ใช้ `content/on-fill` ของตระกูลนั้นเมื่อ runtime มี mapping; `content/inverse` ใช้กับพื้น inverse ส่วน `content/on-brand` เป็น compatibility เดิม ไม่ใช่ token ใหม่ที่ควรขยายการใช้
- Figma และ `tokens.json` มี on-fill ครบทั้ง 7 ตระกูลแล้ว (อ่านสดจากไฟล์ Cariva Core Design System วันที่ 26 พฤศจิกายน 2026) ทั้งหมดเป็นสีขาวตามที่แสดงผลอยู่ในตอนนี้ และ Figma ระบุว่า secondary, warning และ active รอแก้ contrast จึงห้ามอ้างว่าผ่าน AA เพียงเพราะมี token
- ถ้า token ไม่มี ให้รายงานช่องว่าง/ข้อเสนอ ไม่สร้าง token หรือปรับสีเฉพาะหน้าเงียบ ๆ

สี primary/filled บางคู่ใน Figma ยังมี contrast ไม่ผ่าน AA สำหรับข้อความขนาดปกติ ต้องรายงานและแก้ที่ต้นทางตามการตัดสินใจของทีม ไม่เปลี่ยนสีเฉพาะหน้าเพื่อให้ audit ผ่าน และไม่เรียกว่าผ่าน accessibility ทั้งหมด

## ฟอนต์ตาม Product Style

อ่านสดจาก Figma วันที่ 24 พฤศจิกายน 2026 เป็นค่าชั่วคราวจนกว่าผู้ใช้ยืนยันกับทีม

| Role | cariva app | back office | HosXP |
|---|---|---|---|
| `font-family/ui` | IBM Plex Sans Thai | IBM Plex Sans Thai | Aktiv Grotesk Thai |
| `font-family/prose` | IBM Plex Sans Thai Looped | IBM Plex Sans Thai Looped | Google Sans |
| `font-family/display` | Malila | Malila | Malila |

- UI ใช้กับ controls, ตาราง, label และข้อความหน้าจอ; prose ใช้กับย่อหน้าอ่านต่อเนื่อง; display ใช้กับบริบท display/marketing ที่เลือกไว้ ไม่ใช้กับ form/table โดยอัตโนมัติ
- เลือก Product/mode ก่อน ไม่สมมติว่าทุก Product ใช้ฟอนต์เดียวกัน ฟอนต์ foundation แยกจาก Product Style และห้ามนำมาทับ role ของ Product
- ใช้ชื่อ role `ui`/`prose`; `sans`/`serif` ที่มีใน legacy เป็น compatibility aliases
- ไม่เลือก Inter/Roboto หรือฟอนต์ใหม่เป็น design choice เอง มี generic CSS fallback เพื่อความทนทานได้ แต่ห้ามอ้างว่า fallback คือการ render ฟอนต์ตาม Figma แล้ว
- ตรวจ font asset และ weights ที่โหลดจริง โดยเฉพาะฟอนต์ที่พึ่ง Adobe Fonts รายงาน fallback/ไฟล์ขาด ไม่สมมติว่าติดตั้งอยู่
- Active `carivaApp` และ `backOffice` ใช้ IBM Plex Sans Thai UI / Looped prose ร่วมกันแล้วใน shadcn; HosXP และ Malila asset ยังไม่รับรองครบ ค่าฟอนต์ใน code/core เป็น legacy reference

## ขนาดตัวอักษร

**ห้าม render ข้อความต่ำกว่า 12px** รวม metadata, badge, chart labels/tooltips และมือถือ แม้ไฟล์ legacy จะมี `label/xsmall = 10px` ก็ไม่ใช่ตัวเลือกที่อนุญาตให้ใช้ใน UI ใหม่

| กลุ่ม | ขนาดที่มีใน local tokens | หลักการ |
|---|---|---|
| Heading | 24 / 20 / 16px | หัวข้อ ตามลำดับความสำคัญ |
| Body | 16 / 14 / 12px | เนื้อหา UI |
| Label | 16 / 14 / 12px | controls และ actions |
| Caption | 12px | metadata ที่จำเป็น |
| Prose | 16 / 14 / 12px | ย่อหน้าอ่านต่อเนื่อง |

เลือก text style/recipe เดิมก่อน ไม่ปรับ font-size เฉพาะหน้าเพื่อบังคับ control height น้ำหนักใช้ 400/500/600/700 ตาม style ที่มี ขนาดและ line-height ต้องอ่านจาก Typography mode และ contract ของ component จริงก่อนเปลี่ยน

เอกสารเก่าระบุ body line-height 20/16 แต่ local tokens ยังมี 22/18 ในบาง role ให้บันทึกเป็น drift ไม่เปลี่ยน geometry ทั่ว Core จากการคัดลอกเอกสาร ต้องตรวจภาษาไทยจริงทั้งสระ/วรรณยุกต์ ข้อความยาว และ computed size บน desktop/mobile/portal

## พื้นผิวและความลึก

ให้ความต่างของพื้นผิวช่วยจัดกลุ่มข้อมูลก่อนเพิ่มเส้นขอบหรือเงา ใช้สีจาก semantic tokens เดิม ไม่ย้ายพาเลท Zinc หรือปุ่มดำของ Awesomic มาทับสี Cariva

| บริเวณ | แนวทาง | Token ที่ใช้ |
|---|---|---|
| พื้นเนื้อหาหลัก | ใช้สีขาวเป็นฐานของหน้าใหม่ เว้นช่วงระหว่างกลุ่มงาน | `color/bg/white` |
| App shell / กลุ่มงานขนาดใหญ่ | ใช้พื้นเทาอ่อนเมื่อต้องแยกพื้นที่ทำงานหรือกลุ่มที่มีความหมาย | `color/bg/subtle` |
| Card / แผงข้อมูล | ใช้แผงขาวบนพื้นต่างระดับ เงาไม่ใช่ค่าเริ่มต้นของทุก Card | `color/on-surface/default` |
| พื้นด้านในของกลุ่ม controls | รูปแบบเสริมเมื่อจำเป็นต้องแสดง interaction หลายระดับ ไม่ใช่ค่าเริ่มต้นของ filter/toolbar | `color/on-surface/subtle` |
| ขอบและเส้นแบ่ง | ใช้เมื่อจำเป็นต่อการเห็นขอบเขตหรืออ่านข้อมูลต่อเนื่อง | `color/border/default` |
| Overlay / แผงที่ลอยเหนือหน้า | ใช้ surface และ elevation recipe ที่มีอยู่ | `color/on-surface/elevated` |

- พื้นขาวกับแผงขาวที่อยู่ติดกันยังใช้ border ได้ ไม่บังคับลบขอบของทุก Card หรือ Table
- ใช้ inset shell **เฉพาะจุดที่จำเป็นต่อการจัดกลุ่มการโต้ตอบ** เช่น selector ที่ต้องเห็นขอบเขตภายใน หรือแผงขั้นตอนที่มี interaction หลายระดับ ไม่ใช่รูปแบบเริ่มต้นของทุก section
- **ไม่ครอบกราฟ กลุ่มกราฟ หรือตารางทั้งก้อนด้วยพื้นเทา แล้วซ้อนแผงขาวด้านในอีกชั้น** ให้กราฟและตารางเป็นแผงชั้นเดียว ใช้ border/divider เท่าที่ช่วยให้อ่านขอบเขตได้
- **Filter/toolbar ของตารางให้เริ่มจากวาง controls บนพื้นหน้าโดยตรง** ใช้ spacing และ alignment จัดกลุ่ม ไม่ครอบพื้นเทาทั้งแถบเพียงเพราะมีตัวกรองกับช่องค้นหาอยู่ด้วยกัน แสดงสถานะเลือกบน control นั้น เช่น เส้นใต้หรือตัวอักษรที่ชัดขึ้น
- ข้อมูลตารางเป็นพื้นขาว สำหรับแถบตัวเลขสรุปใช้พื้นอ่อนได้เมื่อทั้งแถบเป็นกลุ่มเดียวและไม่มีแผงขาวซ้อนอยู่ด้านใน
- ก่อนเพิ่ม shell ต้องอธิบายได้ว่าช่วยรวม controls หรือแยก interaction ใด หากมีไว้เพื่อสร้างกรอบตกแต่งอย่างเดียวให้เว้นพื้นที่ระหว่างกลุ่มแทน
- เงาเหมาะกับ overlay หรือแผงที่ต้องแสดงความลอยจริง ใช้ shadow/elevation token หรือ recipe เดิม หากยังไม่มีให้เสนอเพิ่มก่อน ไม่คัดลอกค่าเงาหลายชั้นมาใส่เฉพาะหน้า
- ความเป็นมิตรเกิดจากพื้นที่ว่าง พื้นผิว และ hierarchy ร่วมกัน ไม่เปลี่ยน radius ของ component ที่ตกลงไว้เพื่อให้เหมือนภาพอ้างอิง
- `bg/subtle` คือ Slate 100 ส่วน `bg/solid` คือ Slate 200 คำว่า “พื้นสีเรียบ” ไม่ใช่ชื่อ token; gradient เป็นอีกเรื่องหนึ่ง ค่าเริ่มต้นของหน้างานใช้พื้นสีเรียบ ไม่เพิ่ม glow หรือ gradient ทุกกลุ่ม

## Layout และความหนาแน่น

- Spacing scale ที่อนุญาต: `0, 2, 4, 8, 12, 16, 20, 24, 28, 32, ...px` ตั้งแต่ 4px ขึ้นไปต้องหาร 4 ลงตัว โดย 2px เป็นข้อยกเว้น ใช้กับ padding, margin, gap และระยะห่างในการจัดวาง ทั้งมือถือและจอใหญ่ เลือกจาก tokens เดิมที่อยู่ในชุดนี้ก่อน ไม่ใช้ค่าแทรก เช่น 6, 10, 14 หรือ 18px
- มือถือกับจอใหญ่เลือกคนละขั้นใน scale ได้ตามพื้นที่ ไม่จำเป็นต้องลดทุก component ตามสัดส่วน กฎนี้เป็นกฎระยะห่าง ไม่เปลี่ยน border width, radius, typography หรือขนาด component ที่อนุมัติไว้โดยอัตโนมัติ
- จัดหน้าให้เห็นหัวข้อ งานสำคัญ และข้อมูลที่ต้องตัดสินใจก่อนรายละเอียดรอง จัดแนวขอบซ้ายของหัวข้อ ตัวเลข และกลุ่มข้อมูลให้สัมพันธ์กัน
- โปร่งระหว่างกลุ่ม กระชับภายในกลุ่ม: ใช้ spacing tokens เดิม เช่น gap 12/16px ระหว่างข้อมูลที่เกี่ยวข้อง และ 24/32px ระหว่างส่วนหลัก โดยเลือกตามเนื้อหาและ viewport
- Panel ใช้ padding ตามขนาดและ recipe ที่มีอยู่ เช่น 16/24px ไม่ใช้ค่าข้างต้นไป override padding ของ Button, Input หรือ Accordion
- Card หนึ่งใบควรตอบคำถามหรือรวมงานที่ชัดเจน ไม่จำเป็นต้องแยกตัวเลขทุกตัวเป็น Card รูปแบบเดียวกัน สามารถใช้แถบสรุปหรือกลุ่มตัวเลขร่วมกันได้
- ใช้คอลัมน์ขนาดต่างกันเมื่อข้อมูลมีน้ำหนักต่างกัน เช่น กราฟหลักคู่กับงานที่ต้องติดตาม; ใช้กริดเท่ากันเมื่อข้อมูลควรเปรียบเทียบกันโดยตรง
- บนมือถือเรียงกลุ่มตามความสำคัญ คงขนาดข้อความที่อ่านได้ ตารางที่จำเป็นต้องกว้างให้เลื่อนภายในบริเวณตาราง ไม่ทำให้ทั้งหน้าล้น

## ลำดับข้อมูลและตัวอักษร

- คง font-family และ type scale ตาม Product Style ข้างต้น ผู้ใช้เลื่อนการตัดสินใจเรื่องฟอนต์ใหม่ออกไป ยังไม่เปลี่ยนเป็น Cosmica หรือ Manrope
- ใช้น้ำหนัก 600 สำหรับหัวข้อสำคัญ, 500 สำหรับชื่อรายการหรือ action และ 400 สำหรับเนื้อหา ตาม text style ที่มี ไม่ทำทุกส่วนหนาเท่ากัน
- เนื้อหาหลักในงานใหม่ให้เริ่มจาก 14/16px และใช้ 12px สำหรับ metadata ที่จำเป็น ไม่ลดข้อมูลสำคัญทั้งตารางลงเหลือ 12px เพียงเพื่อให้ใส่ข้อมูลได้มากขึ้น ทั้งนี้ต้องคง contract ของ component เดิมจนกว่าจะอนุมัติการปรับ
- ตัวเลขสรุปต้องอยู่ใกล้ label และหน่วย แสดงช่วงเวลาหรือฐานเปรียบเทียบเมื่อจำเป็น ไม่ใช้ตัวเลขใหญ่เป็นของตกแต่ง เลือก text style ที่มีอยู่ตามความสำคัญ
- ใช้ข้อความรองผ่าน `content/secondary`; `content/placeholder` ใช้กับ placeholder ไม่ใช้แทน metadata ทั้งหน้า
- ไม่เพิ่ม negative tracking ให้ทั้งหน้า หรือใช้สไตล์หัวข้อภาษาอังกฤษกับภาษาไทยโดยไม่ตรวจสระ วรรณยุกต์ และการขึ้นบรรทัด

## Controls กราฟ และรายละเอียดที่ทำให้หน้าอ่านง่าย

- ให้ primary action เด่นตามความสำคัญของงาน ใช้ variants และสีแบรนด์เดิม ส่วน secondary actions ใช้รูปแบบรองที่มีอยู่ ไม่ทำทุกปุ่มเด่นเท่ากัน
- คงขนาด Button/Input, padding, radius, icon และ focus recipe ตาม Core ทั้งบนหน้าและใน modal ไม่คัดลอกปุ่มสูง 49px, radius 14/16px หรือผิวดำมันวาวจาก Awesomic มาแทน contract เดิม
- Status tag ใช้ข้อความและสี semantic ที่ตรงสถานะ ไม่เพิ่มจุดหน้า tag และไม่ใช้ middle dot (`·`) คั่น metadata
- กราฟต้องมีชื่อชุดข้อมูล หน่วย และช่วงเวลาที่อ่านได้ ใช้สีชุดข้อมูลตามกฎ accent ด้านบน ให้สีและรูปแบบเส้นใน legend ตรงกับกราฟจริง และเก็บ grid ไว้เป็นข้อมูลรอง
- ใช้ไอคอนตระกูลเดิมตามบทบาท รูปบุคคลใช้เมื่อช่วยระบุผู้รับผิดชอบหรือเจ้าของข้อมูล ไม่เพิ่ม avatar, icon badge หรือภาพประกอบให้ทุก Card โดยอัตโนมัติ
- สีสด ภาพธรรมชาติ และ texture ใช้เป็นจุดเน้นเฉพาะบริบทที่มีความหมาย ถ้าต้องการเพิ่มให้แยกเป็นงานทดลองของ Product ก่อน ไม่ใช้แทนสีสถานะหรือเพิ่มฉากตกแต่งหลังตารางและฟอร์ม
- Motion ตอบสนองต่อการกระทำและเคารพ reduced motion พื้นที่อ่านข้อมูลควรนิ่ง ไม่ใช้ข้อความวิ่งหรือเปลี่ยนคำอัตโนมัติในหัวข้อของหน้างาน

## ขอบเขตที่รับมาจาก Awesomic

รับหลักการใช้พื้นที่ขาว–เทา, การจัดกลุ่มด้วยพื้นผิว, inset shell เฉพาะ controls ที่จำเป็น, เงาเฉพาะจุด และการวางตัวเลขพร้อมบริบท โดยปรับเข้ากับ semantic tokens และ Core ของ Cariva

ยังไม่รับฟอนต์ใหม่ พาเลทสีใหม่ ขนาดตัวอักษร 13/15px ปุ่มดำมันวาว ขนาดและ radius ของเว็บ marketing ช่องว่างระดับ chapter 128–160px ตลอดจนภาพ terrain/glass/wordmark ขนาดใหญ่เป็นค่าเริ่มต้นของ Dashboard

การอัปเดตเอกสารนี้กำหนดทิศทางสำหรับงานถัดไป ไม่ใช่หลักฐานว่าโค้ด หน้าทดลอง หรือ Figma ได้ปรับตามแล้ว เมื่อเริ่มนำไปใช้ให้ตรวจของเดิมก่อน แยกการทดลองออกจาก Core และอัปเดต stories/docs พร้อม audit ตาม AGENTS.md

## ขอบเขตการนำกฎมาใช้

กฎสีและฟอนต์ข้างต้นมีผลกับงานต่อไป ไม่ยก radius 8/12/16px, ขนาดปุ่ม 36px, no-pill หรือ no-card-border จากเอกสารเก่ามาเป็นข้อบังคับใหม่ คง component API/radius/recipe ที่ตกลงและของเดิมไว้ก่อน ผู้ใช้สั่งเริ่ม migrate shadcn แล้วเมื่อ 24 พฤศจิกายน 2026 ดู SHADCN-MIGRATION.md ไม่ถือว่า migration เท่ากับ parity ทุก Figma variant

## Bottom Sheet — ตรวจ 26 พฤศจิกายน 2026

เฉพาะ `SheetContent side="bottom"`: มุมบน 24px, Header Default/Search 72/152px สำหรับ title หนึ่งบรรทัด, title UI 20/28px SemiBold, icon 32/24px, close 32px พร้อม icon 16px. Browser ใช้ `--font-ui` เป็น IBM Plex Sans Thai ตาม active theme; ไม่พบ typography drift ใน scope ที่ตรวจ. Search ประกอบจาก Field/Input lg 48px และ helper 12/16px. พื้นหลังตกแต่งใช้ SVG Figma เดิมเต็ม Header. รายละเอียด API/ข้อค้างและขอบเขต keyboard อยู่ที่ `docs/components/SHEET-FIGMA.md` และ `SHEET-AUDIT.md`; ไม่เปลี่ยน recipes ของ Sheet ด้านอื่น.

## Card — ตรวจ 26 พฤศจิกายน 2026

CardHorizontal/CardVertical/CardSmallHorizontal ใช้ UI20/28 SemiBold สำหรับ title และ14/20 สำหรับ description; browser active theme เป็น IBM Plex Sans Thai. Horizontal min-height190 และ absolute ซ้อนภาพขวา, Vertical actionsแถวเดียวgap16, Small slots80/40. ไม่แก้ primitive Card กลาง. ผู้ใช้ยืนยันให้ Profile/Metric normal ใช้ bg/subtle #f1f5f9, Tag ภายใน Card padding8, Profile max-width100% และ Unit เปลี่ยนเป็น content/secondary (ต่างจาก Figma เฉพาะจุดนี้). คง abnormal4.41:1 และ shared Button3.50:1 เป็นข้อค้าง ไม่ถือว่า AAผ่านทั้งหมด; รายละเอียดใน `docs/components/CARD-AUDIT.md`.

### Tabs alignment — 2026-11-26 (Draft)

Figma Tabs Standard/Pills/Folder text uses IBM Plex Sans Thai Medium; rendered UI matches IBM Plex Sans Thai 14/20px (Standard small12/16px), with no observed family drift on page/Dialog. Standard height48/32px, Pills items36/48px, Folder56px. Source spacing6px is represented by centered fixed-height Pills; original icon/curve vectors retained. Detailed mapping and known contrast gap in docs/components/TABS-FIGMA.md; no global token changes.

### Selection animation - 2026-11-26

Standard underline and Pills background use Base UI Indicator with interruptible 350ms transform/size transitions, cubic-bezier(.4,0,.2,1). Folder color/shadow transition for 320ms. Panel selection stays immediate. Keyboard focus-visible and prefers-reduced-motion disable transitions. The existing Figma template Callout documents this code motion decision; specimens remain static linked instances. No new dependency or public prop.

### Tooltip Core / Mira - 2026-11-26

Observed Figma text roles: IBM Plex Sans Thai, Standard/Mira Medium12/16px, guide Regular14/20px. Browser matches this family. Standard body4px radius and padding4/8; guide16px radius, width240, minbody112/footer56. Mira uses same Core primitive in its own Product folder, text minimum12 and gap4; status colors remain Product-local. Source helper10px and gap2 are recorded as reference differences, never active UI values. No global token changes.

### Mira Credit Badge ownership - 2026-11-26

Credit Badge belongs to Mira Product DS, not Core Progress. Component and icon are in src/lib/products/mira/components, six stories under Products/Mira/Components/Credit Badge. It reuses Core Progress/Skeleton without changing their recipes. Contract and mapping live in docs/products/mira/CREDIT-BADGE.md and FIGMA-MAPPING.json.

### Visualization - 2026-11-26 (Draft)

25 Core recipes reuse ChartContainer/Recharts. Source card radius12px, border/default1px, padding16, gap12, plot220px, UI title/axis/legend14/20 Regular. Source and browser family: IBM Plex Sans Thai. Existing accent blue/teal/violet/orange A04 palette matches source; do not replace global --chart-* roles. Width is responsive, reference560/320px, min-height350 with wrapping legends. No new global token. Renderer/pattern-density/data-fixture differences and pending Code Connect are recorded in docs/components/VISUALIZATION-FIGMA.md.
