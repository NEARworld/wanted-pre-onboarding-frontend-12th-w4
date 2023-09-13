import React, { FC } from 'react';

type Props = {
  height: number;
  count: number;
  valueBarIndicatorCount: number;
};

export const BarValueIndicator: FC<Props> = ({ height, count, valueBarIndicatorCount }) => {
  return (
    <div>
      <div style={{ display: 'grid', height }}>
        {Array.from({ length: valueBarIndicatorCount }).map((_, idx) => (
          <div key={idx} style={{}}>
            {(valueBarIndicatorCount - idx) * count}
          </div>
        ))}
      </div>
    </div>
  );
};
