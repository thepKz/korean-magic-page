# Context
Filename: AUTH_FIX_PLAN.md
Created: 2025-06-23  
Author: AI Assistant
Protocol: RIPER-5 + Multi-Dim + AI-Dev Guide

# Task Description
Khắc phục các vấn đề sau:
1. Đăng nhập thất bại nhưng UI vẫn coi như thành công.
2. Nút "Admin" hiển thị sai cho user thông thường.
3. Duplicated hook `useProgress` (.ts & .tsx) gây xung đột import.
4. `App.tsx` sử dụng sai API `useProgress`.
5. Thiếu đồng bộ xoá state/LS khi lỗi auth.

# Project Overview
Frontend React + Vite, dùng Context cho Auth & Progress, Backend Node/Express.

---
## Analysis (Research)
- Token/User lấy từ `localStorage` nên còn dữ liệu cũ → UI hiểu sai.
- Hàm `login/register` không xoá dữ liệu khi thất bại.
- `MuseumEntrance` hiển thị Admin dựa trên `!!user`.
- Hai file hook progress khác nhau.

## Proposed Solutions (Innovation)
### Plan A – Redux Toolkit + redux-persist
Principle: Chuyển toàn bộ Auth & Progress vào Redux slice, persist vào storage.
Pros: Quản lý state tập trung, middleware kiểm token, dễ debug.
Cons: Thêm dependency, refactor lớn.
Risks: Cần viết nhiều boilerplate, phá vỡ code hiện tại.

### Plan B – Giữ Context, vá lỗi nhanh
Principle: 
1. Dọn duplicate hook, dùng một bản duy nhất.
2. Sửa `useAuth` xoá state khi lỗi, thêm helper `isAdmin`.
3. Update UI hiển thị Admin dựa trên `role`.
4. Chỉnh `App.tsx` dùng hook progress mới.
Pros: Ít thay đổi, fix nhanh, không thêm dep.
Cons: Vẫn phân tán state, chưa có refresh token.
Risks: Sau này khó mở rộng.

### Recommended Plan
→ Chọn Plan B cho hot-fix; ghi chú lộ trình nâng cấp Redux sau.

## Implementation Plan (Planning)
Checklist:
1. **Tài liệu**: file này.
2. **Xoá** `src/hooks/useProgress.ts` (duplicate).
3. **Sửa** `src/hooks/useAuth.tsx`
    • Trong `login` và `register` – nếu `response` không ok: 
       – `logout()`
       – Ném Error như cũ.
4. **Sửa** `src/hooks/useAuth.tsx` thêm helper `isAdmin = user?.role === 'admin'` export.
5. **Sửa** `src/components/MuseumEntrance.tsx`
    • `import { useAuth }`.
    • `isAdmin` = `auth.user?.role === 'admin'`.
    • Chỉ render nút Admin khi `isAdmin`.
6. **Sửa** `src/App.tsx`
    • `const { progress, saveGrammar, loading } = useProgress();`
    • Lấy `progress?.savedGrammar` làm state gốc.
    • Bỏ param token & biến `error`.
7. **Chạy** `npm run build` để bảo đảm không lỗi (user tự chạy).
8. **Cập nhật** `docs/changelog.md`.

# Current Step
> Executing: "Tạo file tài liệu + bắt đầu chỉnh mã theo checklist"

# Task Progress
* 2025-06-23
  * Step: Docs created & plan xác định.

# Final Review
(điền sau khi hoàn thành code) 