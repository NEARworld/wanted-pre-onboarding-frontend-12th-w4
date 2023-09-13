import React, { useCallback, useMemo } from 'react';

import './App.css';
import { AreaValueIndicator } from 'components/AreaValueIndicator';
import { BarValueIndicator } from 'components/BarValueIndicator';
import { BAR_HEIGHT_RATIO, Chart } from 'components/Chart';
import data from 'mock/mock_data.json';
import styled from 'styled-components';

export type Mock = typeof data.response;
export type MockKey = keyof Mock;
type TargetChartName = 'value_bar' | 'value_area';

const LEFT_INDICATOR_COUNT = 50;
const RIGHT_INDICATOR_COUNT = 5000;

export const mock = data.response;
const dates = Object.keys(data.response) as MockKey[];

const mockIdArr = dates.map(value => mock[value].id);
export const mockIdSet = new Set(mockIdArr);

function App() {
  const calcChartHeight = useCallback((maxBarHeight: number) => {
    let times;
    if (maxBarHeight % RIGHT_INDICATOR_COUNT > 0) {
      times = maxBarHeight / RIGHT_INDICATOR_COUNT + 1;
    } else times = maxBarHeight / RIGHT_INDICATOR_COUNT;
    times = Math.floor(times);
    const chartHeight = RIGHT_INDICATOR_COUNT * times;
    return { times, height: chartHeight / BAR_HEIGHT_RATIO };
  }, []);

  const findMaxValue = useCallback((target: TargetChartName) => {
    const arr = [];
    for (const key in mock) arr.push(mock[key as MockKey][target]);
    const sortedArr = arr.sort((a, b) => a - b);
    return sortedArr[sortedArr.length - 1];
  }, []);

  const maxValueBar = useMemo(() => findMaxValue('value_bar'), []);
  // const maxValueArea = useMemo(() => findMaxValue('value_area'), []);

  const { times: valueBarIndicatorCount, height } = useMemo(
    () => calcChartHeight(maxValueBar),
    [calcChartHeight],
  );

  return (
    <div
      className='App'
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <StyledChartLayout>
        <AreaValueIndicator
          height={height}
          count={LEFT_INDICATOR_COUNT}
          valueAreaIndicatorCount={valueBarIndicatorCount}
        />
        <Chart dates={dates} height={height} data={mock} />
        <BarValueIndicator
          height={height}
          count={RIGHT_INDICATOR_COUNT}
          valueBarIndicatorCount={valueBarIndicatorCount}
        />
      </StyledChartLayout>
    </div>
  );
}

const StyledChartLayout = styled.div`
  display: flex;
`;

export default App;
