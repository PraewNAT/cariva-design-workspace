// Source strings are documentation-only; production App never imports this module.
const modules = import.meta.glob("../../../app/components/ui/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});
export default Object.entries(modules)
  .filter(([path]) => !path.endsWith(".stories.tsx"))
  .map(([path, code]) => ({ name: path.split("/").pop(), code: String(code) }));
