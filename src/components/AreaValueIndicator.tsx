import React, { FC } from 'react';

import styled from 'styled-components';

type Props = {
  height: number;
  count: number;
  valueAreaIndicatorCount: number;
};

export const AreaValueIndicator: FC<Props> = ({ height, valueAreaIndicatorCount, count }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height }}>
      <div
        style={{
          marginLeft: '10px',
          textAlign: 'center',
          textOrientation: 'mixed',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          marginRight: '10px',
        }}
      >
        area value
      </div>
      <StyledContainer $height={height}>
        {Array.from({ length: valueAreaIndicatorCount }).map((_, idx) => (
          <div key={idx} style={{}}>
            {(valueAreaIndicatorCount - idx) * count}
          </div>
        ))}
      </StyledContainer>
    </div>
  );
};

const StyledContainer = styled.div<{ $height: number }>`
  display: grid;
  height: ${props => props.$height}px;
`;
