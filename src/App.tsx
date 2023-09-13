import React, { useCallback, useMemo } from 'react';

import './App.css';
import data from 'mock/mock_data.json';
import styled from 'styled-components';

type MockKey = keyof typeof data.response;

const BAR_HEIGHT_RATIO = 50;
const BAR_WIDTH = 10;
const BAR_GAP = 1;
const RIGHT_INDICATOR_COUNT = 5000;

const mock = data.response;
const mockKeys = Object.keys(data.response) as MockKey[];

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

  const findMaxValueBar = useCallback(() => {
    const arr = [];
    for (const key in mock) arr.push(mock[key as MockKey].value_bar);
    const sortedArr = arr.sort((a, b) => a - b);
    return sortedArr[sortedArr.length - 1];
  }, []);

  const { times: valueBarIndicatorCount, height } = useMemo(
    () => calcChartHeight(findMaxValueBar()),
    [calcChartHeight, findMaxValueBar],
  );

  const calcChartWidth = () => {
    const totalGap = BAR_GAP * mockKeys.length - 1;
    return totalGap + BAR_WIDTH * mockKeys.length;
  };

  return (
    <div
      className='App'
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ display: 'flex' }}>
        <StyledChartContainer>
          <StyledBarsContainer height={height}>
            {mockKeys.map(value => (
              <StyledBar key={new Date(value).getTime()} $value_bar={mock[value].value_bar} />
            ))}
          </StyledBarsContainer>
          <StyledChartBottomBorder width={calcChartWidth()} />
          <StyledDatesContainer>
            {mockKeys.map((value, idx) => (
              <div>
                {(idx + 1) % 10 ? null : <StyledIndicator />}
                <StyledDate>{(idx + 1) % 10 ? '' : value.split(' ')[1]}</StyledDate>
              </div>
            ))}
          </StyledDatesContainer>
        </StyledChartContainer>
        <div style={{ display: 'grid', height }}>
          {Array.from({ length: valueBarIndicatorCount }).map((_, idx) => (
            <div style={{}}>{(valueBarIndicatorCount - idx) * RIGHT_INDICATOR_COUNT}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const { div, span } = styled;
const StyledChartContainer = div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledBarsContainer = div<{ height: number }>`
  display: inline-flex;
  gap: ${BAR_GAP}px;
  height: ${props => props.height}px;
  transform: scaleY(-1);
  border-right: 2px black solid;
  border-left: 2px black solid;
`;
const StyledChartBottomBorder = div<{ width: number }>`
  width: ${props => props.width}px;
  border: 1px black solid;
`;
const StyledBar = div<{ $value_bar: number }>`
  width: ${BAR_WIDTH}px;
  height: ${props => `${props.$value_bar / BAR_HEIGHT_RATIO}px`};
  background: dodgerblue;
  &:hover {
    background-color: #005cc5;
  }
`;
const StyledDatesContainer = div`
  display: flex;
  gap: ${BAR_GAP}px;
`;
const StyledIndicator = div`
  width: 0px;
  margin: 0 auto;
  height: ${BAR_WIDTH}px;
  border: 1px black solid;
`;
const StyledDate = span`
  margin-top: ${BAR_WIDTH}px;
  width: ${BAR_WIDTH}px;
  display: flex;
  justify-content: center;
`;

export default App;
