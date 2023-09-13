import React, { FC } from 'react';

type Props = {
  count: number;
  height: number;
  valueBarIndicatorCount: number;
};

export const BarValueIndicator: FC<Props> = ({ height, count, valueBarIndicatorCount }) => {
  return (
    <div style={{ display: 'flex', height }}>
      <div style={{ display: 'grid' }}>
        {Array.from({ length: valueBarIndicatorCount }).map((_, idx) => (
          <div key={idx} style={{}}>
            {(valueBarIndicatorCount - idx) * count}
          </div>
        ))}
      </div>
      <div
        style={{
          marginLeft: '10px',
          textAlign: 'center',
          textOrientation: 'mixed',
          writingMode: 'vertical-rl',
        }}
      >
        bar value
      </div>
    </div>
  );
};
