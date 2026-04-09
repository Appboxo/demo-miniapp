# AGENTS.md

## Cursor Cloud specific instructions

This is the **Appboxo Demo MiniApp Frontend** — a client-side-only React SPA showcasing the Appboxo Connect API and JS SDK. There is no backend, no database, and no external services to run.

### Tech stack
- React 16 (Create React App / `react-scripts` 3.2.0), MobX 4, React Router v5, Ant Design v3, SCSS
- Package manager: **Yarn** (`yarn.lock` present)
- The `--openssl-legacy-provider` flag is already in the `start` and `build` scripts in `package.json` to support newer Node versions.

### Key commands (all documented in `README.md`)
| Task | Command |
|------|---------|
| Install deps | `yarn install` |
| Dev server (port 3000) | `yarn start` |
| Production build | `yarn build` |
| Run tests | `CI=true yarn test --passWithNoTests` |
| Lint | ESLint runs inline during `yarn start` / `yarn build` (CRA default) |

### Caveats
- **No standalone lint command**: ESLint is embedded in `react-scripts`; warnings appear in the dev-server console and build output. There is no separate `yarn lint` script.
- **No test files exist**: The repo has zero test files. Use `--passWithNoTests` flag to avoid a non-zero exit code.
- **Appboxo SDK features require a host app**: Most SDK calls (`getInitData`, `login`, `pay`, sensors, etc.) only work when loaded inside an Appboxo-enabled native mobile WebView. In a desktop browser, those features will log errors or no-op, but the UI still renders and is navigable.
