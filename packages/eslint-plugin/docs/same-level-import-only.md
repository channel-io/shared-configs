# same-level-import-only

> Enforce same level imports within matched patterns

## Concept

- 패턴에 매칭된 파일은 같은 레벨(같은 디렉토리)의 파일만 import할 수 있습니다.
- `shared/` 디렉토리의 파일은 상위 레벨에서 직접 자식으로만 import할 수 있습니다.
- `FolderName/FolderName.tsx` 패턴의 파일은 public API로 취급되어, 같은 레벨에서 접근 가능합니다.
- `index.ts`는 public API로 취급하지 않습니다.

## Options

```json
{
  "rules": {
    "@channel.io/same-level-import-only": ["error", {
      "patterns": ["**/src/features/**"]
    }]
  }
}
```

### `patterns` (required)

glob 패턴 배열. 이 패턴에 매칭되는 파일에만 룰이 적용됩니다.

### `extensions` (optional)

파일 확장자 배열. 기본값: `[".js", ".ts", ".jsx", ".tsx"]`

## Valid

```js
// 같은 디렉토리 import
import B from "./B"

// shared 디렉토리 직접 자식 import
import Utils from "../shared/Utils/Utils"

// Public API (FolderName/FolderName.tsx) import
import { something } from "./EventSchema/EventSchema"

// Public API 파일 내부에서 같은 폴더 파일 import
// (ChartDrawer/ChartDrawer.tsx에서)
import EmptyView from "./EmptyView"
```

## Invalid

```js
// 하위 디렉토리 내부 파일 직접 import
import C from "./B/C"  // invalidImport

// shared 내부 깊은 경로 import
import F from "./shared/A/B"  // invalidSharedImport

// index 파일 직접 import
import B from "./B/index"  // invalidImport

// Public API가 아닌 내부 파일 import
import { hook } from "./EventSchema/EventSchema.hooks"  // invalidImport
```

## Logic

1. import 경로가 `patterns` 옵션의 glob에 매칭되는지 확인합니다.
2. import 대상이 `shared/` 경로이고 현재 파일이 shared 외부이면, shared 직접 자식인지 검증합니다.
3. 그 외에는 같은 디렉토리에 있는지 검증합니다.
4. `FolderName/FolderName.ext` 패턴은 public API로 취급하여 entry path를 부모 디렉토리로 정규화합니다.
