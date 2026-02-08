# Specification

## Summary
**Goal:** Add a fixed domain suffix selector to server creation and introduce a per-server paid plugins catalog with a simulated purchase flow that persists ownership across reloads.

**Planned changes:**
- Update the Create New Server dialog to show a domain suffix dropdown with exactly: .org, .net, .fun, .gg, .play, .host, .xyz, .com, and save the selected suffix onto the created server record.
- Add a "Paid Plugins" section on the Plugins page with many paid plugin entries, each showing name/description and purchase vs owned state, with navigation alongside existing plugin views.
- Implement a paid-plugin purchase flow UI with exactly three methods: QR Code (random fake QR each open/refresh), Redeem Code (any non-empty code succeeds), and Direct Payment (recharge-style confirm that marks owned).
- Extend the server data model and localStorage persistence to store owned paid plugins per server in a backwards-compatible way (older saved servers default to empty owned list and do not crash).

**User-visible outcome:** Users can choose a domain suffix when creating a server, browse a Paid Plugins catalog, purchase plugins via one of three simulated methods, and see owned paid plugins remain owned per server after reloading the page.
