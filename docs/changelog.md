## [2025-06-23] Auth & UI Hotfix

### Added
- `isAdmin` field to `AuthContext`.
- Documentation file `AUTH_FIX_PLAN.md` describing hot-fix plan.

### Changed
- `useAuth.tsx`: clear state & localStorage on login/register failure; expose `isAdmin`.
- `MuseumEntrance.tsx`: show Admin button only for logged-in admin users.
- `App.tsx`: switched to unified `useProgress` hook; removed duplicate token param; fixed prop names.

### Removed
- Duplicate hook file `src/hooks/useProgress.ts` to avoid conflicts.

### Notes
Hot-fix addresses issue where UI incorrectly showed logged-in/admin state after failed authentication and cleans up duplicate code. 

## [2025-06-23] Notebook Data Fix

### Changed
- `server/routes/progress.js`: populate additional fields (`structure`, `usage`, `explanation`, `examples`) for `savedGrammar.grammarId` so PersonalNotebook displays full details.

### Notes
User notebook now shows structure & usage after refresh/fetch. 

## [2025-06-23] Vietnamese Localization Support

### Added
- Added `usageVi`, `explanation`, `explanationVi` fields to `Grammar` schema.
- Helper `src/utils/localize.ts` to select Vietnamese/English on frontend.

### Changed
- `GrammarRooms.tsx` and `PersonalNotebook.tsx` now display Vietnamese content when UI language is VI.
- Backend `/progress` populate selects new fields.

### Migration
Run translation script (to be implemented) to fill new Vietnamese fields in DB. 