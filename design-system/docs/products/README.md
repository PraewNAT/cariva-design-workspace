# Product setup records

Use the [Product setup flow](../../rules/product-setup-flow.md) to take the 4 fields from the Designer, then store each Product in `<product-id>/PRODUCT.md`. Both Codex and Claude must search the existing records before asking again.

Only mock records exist (marked **mock**); no real Product has been recorded yet. For real work, wait for the user to provide real information and create a new record and ID; never reuse a mock record. The Product A/B in the workflow examples are not treated as already set up.

| Product | Data file |
|---|---|
| Mock HosXP (**mock**) | [mock-hosxp/PRODUCT.md](mock-hosxp/PRODUCT.md) |
| Mock Mira (**mock**) | [mock-mira/PRODUCT.md](mock-mira/PRODUCT.md) |

When a real Product exists, add its name and a link to the data file here; do not copy the whole set of URLs again, and do not keep an active Product shared across chats.
