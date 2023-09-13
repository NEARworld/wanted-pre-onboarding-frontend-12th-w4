# 원티드 프리온보딩 인턴쉽 프론트엔드 12차 4주차 개인과제

## 구성

|  번호   |      항목      |
|:-----:| :------------: |
|   1   | 프로젝트 소개  |
|   2   |   사용 기술    |
|   3   | 핵심 구현 내용 |
|   4   | 배포 및 프리뷰 |
___
## 1. 프로젝트 소개
시계열 차트를 렌더링하는 리액트 프로젝트입니다.

차트를 그리는데 사용된 데이터는 `mock/mock_data.json` 입니다.
___
## 2. 사용 기술

### 기술 스택

|     기술     |  버전   |
| :----------: | :-----: |
|    리액트    | ^18.2.0 |
| 타입스크립트 | ^4.9.5  |
___
## 3. 핵심 구현 내용
### 1. 시계열 차트 만들기
- [x] ~~주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요~~
- [x] ~~Area 그래프의 기준값은 value_area 값을 이용해주세요~~
```tsx
// Area 그래프의 구현 내용
// 코드 위치: components/Chart.tsx
const areaPlots = useMemo(() => {
  const arr: [number, number][] = [];
    dates.forEach((value, index) => {
      if (index <= dates.length - 2)
        arr.push([data[dates[index]].value_area, data[dates[index + 1]].value_area]);
    });
  return arr;
}, []);

// JSX 부분
<StyledAreaChart>
  {Array.from({ length: areaPlots.length }).map((_, index) => (
    <StyledArea key={new Date(dates[index]).getTime()} $tuple={areaPlots[index]} />
  ))}
</StyledAreaChart>

// CSS 부분
const StyledArea = li<{ $tuple: [number, number] }>`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  background: red;
  clip-path: polygon(
    0% calc(100% * (1 - ${props => props.$tuple[0] / AREA_MAX_HEIGHT})),
    100% calc(100% * (1 - ${props => props.$tuple[1] / AREA_MAX_HEIGHT})),
    100% 100%,
    0% 100%
  );
`;
```
- [x] ~~Bar 그래프의 기준값은 value_bar 값을 이용해주세요~~
- [x] ~~차트의 Y축에 대략적인 수치를 표현해주세요~~
- [x] ~~하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요~~
### 2. 호버 기능 구현
<img width="1244" alt="image" src="https://github.com/NEARworld/wanted-pre-onboarding-frontend-12th-w4/assets/102969108/7844c674-1644-4e15-92b1-940178eb65ba">

```tsx
// Chart.tsx
import { Tooltip as ReactToolip } from 'react-tooltip';

// JSX
{dates.map(value => (
  <Fragment key={new Date(value).getTime()}>
    <StyledBar
      data-tooltip-id={new Date(value).getTime().toString()}
      $value_bar={data[value].value_bar}
    />
    <ReactToolip
      id={new Date(value).getTime().toString()}
      place='right'
      content={`
        위치: ${data[value].id} \n
        area: ${data[value].value_area} \n
        bar: ${data[value].value_bar} \n
      `}
      style={{
        transform: 'scaleY(-1)',
        whiteSpace: 'pre-line',
      }}
      />
  </Fragment>
))}
```
### 3. 필터링 기능 구현

<img width="1244" alt="image" src="https://github.com/NEARworld/wanted-pre-onboarding-frontend-12th-w4/assets/102969108/80392bfa-c08a-44ea-8711-f71b94d9caa5">

```tsx
//위치: Chart.tsx
// state
const [id, setId] = useState('');

// JSX
<StyledButtonGroup>
  <button onClick={() => setId('')}>해제</button>
  {Array.from(mockIdSet).map(id => (
    <button key={id} onClick={() => setId(id)}>
      {id}
    </button>
  ))}
</StyledButtonGroup>

// CSS
const StyledBar = div<{ $isFiltered: boolean; 'data-tooltip-id': string; $value_bar: number }>`
  width: ${BAR_WIDTH}px;
  height: ${props => `${props.$value_bar / BAR_HEIGHT_RATIO}px`};
  background: ${props => (props.$isFiltered ? '#005cc5' : 'dodgerblue')};
  &:hover {
    background-color: #005cc5;
  }
`;
```

___
## 4. 배포 및 프리뷰
