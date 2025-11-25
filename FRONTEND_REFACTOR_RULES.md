# 🏗️ 前端开发重构规范 (Frontend Refactoring Protocol)

**适用阶段**：UI 骨架/高保真原型已生成，准备接入业务逻辑之前。
**目标**：将“一次性”的 UI 代码转化为可维护、可扩展的工程级代码，并为后端 API 接入做准备。

---

## Phase 1: 组件化重构 (Component Refactoring)

**原则**：严禁将所有 UI 代码堆砌在 `page.tsx` 中。必须遵循“单一职责原则”进行拆分。

1.  **原子化拆分**：将页面拆解为独立的、可复用的组件文件。
    - **路径规范**：`components/[module]/[ComponentName].tsx`
    - **示例**：
        - `components/dashboard/StreakCard.tsx` (负责展示打卡状态)
        - `components/dashboard/ProgressCard.tsx` (负责展示进度环)
        - `components/layout/BottomNav.tsx` (全局底部导航)
        - `components/common/GlassTip.tsx` (复用样式的通用组件)

2.  **交互预埋**：在重构组件时，必须预留交互入口。
    - **Clickable Cards**：如果卡片未来需要跳转（如点击 Streak 卡片看历史），必须将组件包裹在 `Link` 或添加 `onClick` 处理器。

---

## Phase 2: 类型定义 (Type Definitions)

**原则**：TypeScript 优先。先定义数据长什么样，再写 UI 怎么渲染。

1.  **集中管理**：在 `types/` 目录下创建定义文件（如 `types/index.ts` 或 `types/dashboard.ts`）。
2.  **Interface 定义**：根据 UI 展示的内容反推数据结构。
    - **示例**：
      ```typescript
      export interface UserProgress {
        streakDays: number;
        totalSessions: number;
        completedSessions: number;
        reviewCount: number;
        dailyTip: string;
      }

      export interface ReviewItem {
        id: string;
        question: string;
        status: 'new' | 'reviewing' | 'mastered';
      }
      ```

---

## Phase 3: 数据流解耦 (Data Flow Preparation)

**原则**：UI 组件必须是“无状态”或“纯展示”的 (Dumb Components)，数据由父组件通过 Props 传入。

1.  **Mock Data Injection**：在父页面（Page Level）定义 Mock Data，模拟后端返回的数据。
2.  **Props 传参**：
    - ❌ **错误**：在组件内部写死 `<div className="...">7 Days</div>`
    - ✅ **正确**：通过 Props 接收 `<StreakCard days={mockData.streakDays} />`
3.  **目的**：未来接入 Supabase 时，只需要在父页面替换数据源，无需修改任何 UI 组件代码。

---

## Phase 4: UX 逻辑实现 (Interaction Logic)

**原则**：优先实现给用户带来“反馈感”的交互逻辑（即使后端还未就绪）。

1.  **列表与状态管理**：对于复习/待办类页面，优先使用列表视图 (List View)。
2.  **即时反馈 (Optimistic UI)**：
    - 当用户点击“完成”或“已掌握”时，**立即**在界面上移除该条目（视觉消失动画）。
    - 不要等待（模拟的）后端返回，先让用户爽。
3.  **空状态处理 (Empty State)**：当列表清空后，必须展示庆祝动画或 Empty State 卡片。

---

## 🚀 给 AI (Bolt/Cline) 的执行指令 (Prompt)

*复制以下内容发送给 AI，即可自动执行上述规范：*

> I have finalized the UI design. Now, please refactor the code following the "Frontend Refactoring Protocol":
>
> 1. **Refactor Components**: Break down `page.tsx` into smaller components in `components/dashboard/` and `components/layout/`. Ensure the `StreakCard` is clickable.
> 2. **Define Types**: Create `types/index.ts` and define interfaces for `UserProgress` and `ReviewItem` based on the visible UI elements.
> 3. **Lift State Up**: Move all hardcoded data to the parent page as a `mockData` object, and pass data down via Props.
> 4. **Implement Logic**: For the Review section, create a list where clicking an item visually removes it from the screen (simulating a "Mark as Learned" action).
>
> Do not change the visual design, just improve the code structure.