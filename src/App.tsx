import React, { useCallback, useEffect, useState } from 'react';

import './App.css';
import data from 'mock/mock_data.json';
import styled from 'styled-components';

type MockKey = keyof typeof data.response;

const BAR_HEIGHT_RATIO = 50;
const BAR_WIDTH = '10px';

const mock = data.response;
const mockKeys = Object.keys(data.response) as MockKey[];

function App() {
  const [maxBarValue, setMaxBarValue] = useState(0);

  const findMaxValue = useCallback((arr: number[]) => {
    for (const key in mock) arr.push(mock[key as MockKey].value_bar);
    const sortedArr = arr.sort((a, b) => a - b);
    return sortedArr[sortedArr.length - 1];
  }, []);

  useEffect(() => {
    setMaxBarValue(findMaxValue([]) / BAR_HEIGHT_RATIO);
  }, []);

  if (maxBarValue)
    return (
      <StyledChartContainer className='App'>
        <StyledBarsContainer>
          {mockKeys.map(value => (
            <StyledBar key={new Date(value).getTime()} $value_bar={mock[value].value_bar} />
          ))}
        </StyledBarsContainer>
      </StyledChartContainer>
    );
  return <div>loading...</div>;
}

const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledBarsContainer = styled.div`
  display: flex;
  gap: 1px;
  transform: scaleY(-1);
`;
const StyledBar = styled.div<{ $value_bar: number }>`
  width: ${BAR_WIDTH};
  height: ${props => `${props.$value_bar / BAR_HEIGHT_RATIO}px`};
  background: dodgerblue;
  &:hover {
    background-color: #005cc5;
  }
`;

export default App;
