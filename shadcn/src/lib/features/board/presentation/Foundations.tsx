import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/app/components/ui/table";
import { radius, spacing, typography } from "@/lib/core/design-system/tokens/tokens";
import inventory from "../../../../../design-references/figma/variables.latest.json";
import tokens from "../../../../../tokens.json";
export function Foundations() {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 p-6">
      <header>
        <h1 className="text-3xl font-semibold">Foundations</h1>
        <p className="text-muted-foreground">
          Figma Semantic / Light Theme ใช้ร่วมกับหน้าและ modal
        </p>
      </header>
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          สี Foundation ในโค้ด (รวมเฉด 50–950)
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Object.entries(tokens.foundation)
            .filter(([key]) => key.startsWith("color/"))
            .map(([key, value]) => (
              <div key={key} className="overflow-hidden rounded-xl border">
                <div
                  className="h-12 border-b"
                  style={{ background: String(value) }}
                />
                <div className="grid gap-1 p-3 text-xs">
                  <strong className="break-all">{key}</strong>
                  <span>{String(value)}</span>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">สี Semantic ที่ map เข้าโค้ด</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>สี</TableHead>
              <TableHead>Variable</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>ค่า</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(tokens.semantic).map(([key, v]) => (
              <TableRow key={key}>
                <TableCell>
                  <div
                    className="size-8 rounded-lg border"
                    style={{ background: v.value }}
                  />
                </TableCell>
                <TableCell>{key}</TableCell>
                <TableCell className="text-muted-foreground">
                  {v.alias}
                </TableCell>
                <TableCell>{v.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Typography / Desktop</h2>
        <p>
          UI: IBM Plex Sans Thai / Prose: IBM Plex Sans Thai Looped ขั้นต่ำ 12px
        </p>
        <div className="divide-y">
          {Object.entries(typography.fontSize).flatMap(([role, sizes]) =>
            Object.entries(sizes).map(([name, size]) => (
              <div key={role + name} className="overflow-hidden py-4">
                <p className="text-xs text-muted-foreground">
                  {role}/{name} {size}px
                </p>
                <p
                  style={{
                    fontSize: size,
                    lineHeight: 1.5,
                    fontFamily:
                      role === "prose" ? "var(--font-prose)" : "var(--font-ui)",
                  }}
                >
                  ตัวอย่างข้อความ Cariva 123
                </p>
              </div>
            )),
          )}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Spacing</h2>
        {Object.entries(spacing).map(([name, size]) => (
          <div className="my-3 flex items-center gap-4" key={name}>
            <span className="w-24">
              {name}: {size}px
            </span>
            <div className="h-4 bg-primary" style={{ width: size }} />
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-xl font-semibold">Radius</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(radius).map(([name, size]) => (
            <div
              key={name}
              className="grid size-20 place-items-center border bg-muted"
              style={{ borderRadius: size }}
            >
              {name}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Figma inventory ทุก collection / mode
        </h2>
        <p className="mb-4 text-muted-foreground">
          snapshot 648 variables ไม่ใช่หลักฐานว่า map เข้าระบบครบทุกค่า; Draft
          ยังไม่ใช้เป็น Core; ตัวอย่างที่ Figma ต่ำกว่า 12px จะแสดงขั้นต่ำ 12px
        </p>
        {inventory.collections.map((collection) => (
          <details key={collection.id} className="mb-3 rounded-xl border p-4">
            <summary className="cursor-pointer font-medium">
              {collection.name} ({collection.variables.length})
            </summary>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable / Type</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>ค่า / Alias</TableHead>
                  <TableHead>ตัวอย่าง</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collection.variables.flatMap((variable) =>
                  variable.modes.map((mode) => (
                    <TableRow key={variable.id + mode.id}>
                      <TableCell>
                        {variable.name}
                        <p className="text-xs text-muted-foreground">
                          {variable.type}
                        </p>
                      </TableCell>
                      <TableCell>{mode.name}</TableCell>
                      <TableCell>
                        {String(mode.resolved)}
                        <p className="text-xs text-muted-foreground">
                          {mode.alias?.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        {variable.type === "COLOR" ? (
                          <div
                            className="size-8 rounded-lg border"
                            style={{ background: String(mode.resolved) }}
                          />
                        ) : variable.name.includes("font-size") &&
                          typeof mode.resolved === "number" ? (
                          <span
                            style={{ fontSize: Math.max(12, mode.resolved) }}
                          >
                            กข Ab
                          </span>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          </details>
        ))}
      </section>
    </main>
  );
}
