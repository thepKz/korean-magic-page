# Auth & Routing Refactor Plan

> **Created:** 2025-05- ✦ _Auth module overhaul & bug-fix roadmap_

## 1. Current Pain-Points

| ID | Issue | Impact |
|----|-------|--------|
| P-1 | Nút **Login / Register** không bật `AuthModal` ở các route con (ví dụ `/rooms/:level`). | Người dùng không thể đăng nhập trực tiếp trong trang học. |
| P-2 | Trạng thái Auth chưa đồng bộ tuyệt đối giữa các màn hình; sau refresh cần login lại. | UX kém, mất phiên. |
| P-3 | Sau khi đăng ký, user bị set `role = admin`. | Lỗ hổng phân quyền nghiêm trọng. |
| P-4 | Chưa lưu token vào Cookie → khó refresh SSR/API khác domain. | Bảo mật & DX kém. |
| P-5 | Thiếu nút **logout** (theo yêu cầu) + xử lý xoá token. | UX. |

## 2. Design Decision

* Giữ `useAuth` hook (đã stable) _→_ **không** migrate Redux đợt này (nhẹ/nhanh).
* Bổ sung **Context + Reducer** pattern để dispatch global auth state (tránh prop-drilling).
* Lưu token đồng thời vào:
  * `localStorage` (persist SPA reload)
  * `Cookie` (non-httpOnly, path=/, max-age = 7d) ‑- đủ demo; production nên httpOnly via server.

## 3. Task Breakdown

1. **Modal Visibility**
   * Hoist `isAuthModalOpen` lên Context (hoặc React-Query modal store).
   * Expose `openAuthModal()` hook.
   * Call từ bất kỳ page/component.
2. **Fix Register → role=user**
   * Server `auth/register` route: `role: 'user'` hard-code, **không** để client gửi.
   * Sanity seed: ensure only manual DB seed can set admin.
3. **Cookie Sync**
   * After login/register: `document.cookie = "token=<jwt>; path=/; max-age=604800"`.
   * On app bootstrap: đọc cookie → fallback nếu localStorage miss.
4. **llogout Button**
   * Global header component hiển thị **llogout** khi `user` truthy.
   * Action: clear Context state + remove localStorage + remove cookie + redirect `/`.
5. **Error Boundary & Toasts**
   * Wrap `<App>` with simple ErrorBoundary.
   * Use `react-hot-toast` for feedback (loading, success, error).

## 4. Files/Modules Affected

* `src/hooks/useAuth.tsx`  (extend context, add cookie helpers)
* `src/App.tsx`  (remove local `isAuthModalOpen`, use context)
* `src/components/AuthModal.tsx`  (call context.openAuthModal)
* `src/components/Header.tsx` *(new)*  (global nav + llogout button)
* `server/routes/auth.js`  (fix role assignment)

## 5. Testing Strategy

* **Unit:** jest for `useAuth` reducer logic.
* **Integration:** Cypress – register → reload → token persisted.
* **Security Smoke:** try POST /auth/register with body `{ role:"admin" }` → expect 400.

## 6. Rollback

If issues arise, revert to commit `auth-refactor-pre` tag.

---

> _End of plan – ready for execution._ 