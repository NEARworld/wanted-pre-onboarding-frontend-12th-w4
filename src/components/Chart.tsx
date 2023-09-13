import React, { FC } from 'react';

import { Mock, MockKey } from 'App';
import styled from 'styled-components';

type Props = {
  data: Mock;
  dates: MockKey[];
  height: number;
};

export const BAR_WIDTH = 10;
export const BAR_GAP = 1;
export const BAR_HEIGHT_RATIO = 50;

export const Chart: FC<Props> = ({ data, dates, height }) => {
  const calcChartWidth = () => {
    const totalGap = BAR_GAP * dates.length - 1;
    return totalGap + BAR_WIDTH * dates.length;
  };

  return (
    <StyledChartContainer>
      <StyledBarsContainer height={height}>
        {dates.map(value => (
          <StyledBar key={new Date(value).getTime()} $value_bar={data[value].value_bar} />
        ))}
      </StyledBarsContainer>
      <StyledChartBottomBorder width={calcChartWidth()} />
      <StyledDatesContainer>
        {dates.map((value, idx) => (
          <div key={new Date(value).getTime()}>
            {(idx + 1) % 10 ? null : <StyledIndicator />}
            <StyledDate>{(idx + 1) % 10 ? '' : value.split(' ')[1]}</StyledDate>
          </div>
        ))}
      </StyledDatesContainer>
    </StyledChartContainer>
  );
};

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
