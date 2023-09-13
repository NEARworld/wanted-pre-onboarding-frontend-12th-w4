import React, { FC, Fragment, useMemo, useState } from 'react';

import { mock, Mock, mockIdSet, MockKey } from 'App';
import { Tooltip as ReactToolip } from 'react-tooltip';
import styled from 'styled-components';

type Props = {
  data: Mock;
  dates: MockKey[];
  height: number;
};

export const BAR_WIDTH = 10;
export const BAR_GAP = 1;
export const BAR_HEIGHT_RATIO = 50;
export const AREA_MAX_HEIGHT = 200;

export const Chart: FC<Props> = ({ data, dates, height }) => {
  const [id, setId] = useState('');

  const calcChartWidth = () => {
    const totalGap = BAR_GAP * dates.length - 1;
    return totalGap + BAR_WIDTH * dates.length;
  };

  const areaPlots = useMemo(() => {
    const arr: [number, number][] = [];
    dates.forEach((value, index) => {
      if (index <= dates.length - 2)
        arr.push([data[dates[index]].value_area, data[dates[index + 1]].value_area]);
    });
    return arr;
  }, [data, dates]);

  return (
    <StyledChartContainer>
      <StyledButtonGroup>
        <button onClick={() => setId('')}>해제</button>
        {Array.from(mockIdSet).map(id => (
          <button key={id} onClick={() => setId(id)}>
            {id}
          </button>
        ))}
      </StyledButtonGroup>
      <StyledBarsContainer height={height}>
        <StyledAreaChart>
          {Array.from({ length: areaPlots.length }).map((_, index) => (
            <StyledArea key={new Date(dates[index]).getTime()} $tuple={areaPlots[index]} />
          ))}
        </StyledAreaChart>
        {dates.map(value => (
          <Fragment key={new Date(value).getTime()}>
            <StyledBar
              $isFiltered={id === mock[value].id}
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

const { div, span, ul, li } = styled;
const StyledChartContainer = div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledButtonGroup = div`
    display: flex;
    gap: 10px;
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
const StyledBar = div<{ $isFiltered: boolean; 'data-tooltip-id': string; $value_bar: number }>`
  width: ${BAR_WIDTH}px;
  height: ${props => `${props.$value_bar / BAR_HEIGHT_RATIO}px`};
  background: ${props => (props.$isFiltered ? '#005cc5' : 'dodgerblue')};
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
const StyledAreaChart = ul`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.7;
  list-style: none;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: row;
  transform: scaleY(-1);
  padding: 0 5px;
  pointer-events: none;
`;
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
