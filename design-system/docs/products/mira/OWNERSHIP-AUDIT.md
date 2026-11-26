# Core / Mira ownership audit — 2026-11-26

ตรวจเฉพาะ component ที่ทำในแชทนี้: 12 หน้า Figma, 36 component sets และ 4 standalone components; เทียบ section/ชื่อ/คำอธิบาย source, source imports, Storybook titles และ docs/mapping จริง ไม่อนุมาน Product จากตัวอย่างข้อมูลผู้ป่วยหรือชื่อ metric เพียงอย่างเดียว

| หมวด / Figma page | Source sets + standalone | ผล ownership ปัจจุบัน |
|---|---|---|
| Avatar `4315:9628` | 2 + 0 | Core: Avatar / AvatarGroup |
| Combobox `4453:12569` | 1 + 0 | Core |
| Badge `4518:82928` | 1 + 0 | Core Badge; คนละ component กับ Mira Credit Badge |
| Bottom Sheet `4481:19038` | 2 + 0 | Core Header/Content |
| Card `4536:123342` | 4 + 1 | Core: horizontal/vertical/small/profile/metric; ไม่พบหลักฐาน ownership ของ Mira |
| Date/Time `4294:5594` | 6 + 2 | Core: date/calendar/time รวม actions/popup |
| File Upload `4457:56068` | 3 + 0 | Core: file/image dropzone และ item |
| Progress `4456:16544` | 4 + 0 | Core linear/circular 2sets; Mira Credit Badge 2sets แยกแล้ว |
| Radio `3815:5557` | 3 + 0 | Core group/standard/base |
| Rating `4887:4878` | 2 + 0 | Core star/rating |
| Tabs `3875:4437` | 5 + 1 | Core base/Pills/Standard/Folder รวม standalone Folder |
| Tooltip `4167:286` | 3 + 0 | Core Standard/With Action 2sets; Mira Credit Tooltip 1set แยกแล้ว |

สรุป mapping ปัจจุบัน: Core 33sets +4standalone, Mira 3sets ใน2components. ไม่พบหลักฐานว่า component ที่เหลือในขอบเขตนี้เป็น Mira เพิ่มเติม จึงไม่มีการย้ายโค้ดหรือ stories รอบนี้

Mira code/stories/assets อยู่ใน `src/lib/products/mira/components/`; Storybook แยก `Products/Mira/Components/Credit Badge` และ `Products/Mira/Components/Credit Tooltip`. ทั้งคู่ reuse Core; ไม่พบ Core import จาก Mira หรือ import Credit Badge path เก่า. Docs/mapping อยู่ใน folder Mira เดียวกับรายงานนี้

แก้สิ่งตกค้างที่พบ: Figma descriptions ของ Credit Badge sets `7089:1151` และ `7094:365` ยังอ้าง `app/credit-badge.tsx` / Progress docs `4721:88932`. อัปเดตเป็น Mira source path, Storybook group และ Mira docs `7296:35` แล้ว โดยไม่เปลี่ยนชื่อ/props/variants/main geometry. Credit Tooltip ใช้ Mira docs `7292:35` ตาม mapping เดิม

**Reuse & Duplicate Check — Core / Mira ownership**
ผลรวม: ไม่พบ Mira ปน Core เพิ่มในขอบเขตที่ตรวจ; แก้ source descriptions เก่าสองจุด
ขอบเขต: 12หมวดข้างบนและ current code/docs; ไม่ใช่การตรวจทุก Product หรือ runtime/accessibility audit รอบใหม่

| ระดับ | ผล | รายการ | หลักฐาน | ถัดไป |
|---|---|---|---|---|
| — | ผ่าน | Mira3sets อยู่ใน2Product components แยก folder/Storybook/docs | FIGMA-MAPPING.json; output/mira-ownership/audit.json | คง ownership |
| — | ผ่าน | Coreไม่import Mira; Mira reuse Core; ไม่พบ old Credit Badge imports | scoped source search | ไม่ต้องย้ายเพิ่ม |
| — | ผ่าน | แก้ Figma source descriptions2sets ที่ยังชี้ Core docs/path เดิม | audit.json descriptionFix | ใช้ Mira docs7296:35 |

สรุป: ผ่าน3, ต้องแก้0, ตรวจไม่ได้0 สำหรับ ownership scope; ไม่รับรองข้อค้างคุณภาพจาก audit เดิมซ้ำ
ต่อไป: ใช้ mapping Mira เดิมสำหรับงาน Product รอบถัดไป

รอบนี้เปลี่ยนเฉพาะเอกสารและ Figma descriptions จึงไม่รัน build/interaction tests ซ้ำ และไม่อ้างผลทดสอบรอบก่อนเป็นผลตรวจคุณภาพใหม่ หลักฐาน discovery แบบละเอียดอยู่ที่ `output/mira-ownership/audit.json`
