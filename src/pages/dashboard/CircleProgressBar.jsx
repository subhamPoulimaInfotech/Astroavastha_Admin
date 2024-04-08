import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const CircleProgressBar = ({ value, maxValue, strokeColor, size = 80, unit = 'L' }) => {
  const strokeWidth = 7;
  const radius = size / 2 - strokeWidth;
  const circumference = radius * 2 * Math.PI;
  const [progress, setProgress] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = null;
    const animationDuration = 1000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const relativeProgress = Math.min(elapsed / animationDuration, 1);

      const scalingFactor = unit === 'K' ? 0.1 : 1;
      const scaledValue = value * scalingFactor;

      const currentProgress = relativeProgress * (scaledValue / maxValue) * circumference;
      setProgress(currentProgress);

      const currentValue = relativeProgress * scaledValue;
      setAnimatedValue(currentValue);

      if (relativeProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, maxValue, circumference, unit]);

  const endAngle = (progress / circumference) * 2 * Math.PI - Math.PI / 2;
  const endX = size / 2 + radius * Math.cos(endAngle);
  const endY = size / 2 + radius * Math.sin(endAngle);

  const formatValue = (value, unit) => {
    const displayValue = unit === 'K' ? value * 10 : value;
    return unit === 'K' ? `${Math.round(displayValue)}${unit}` : `${displayValue.toFixed(1)} ${unit}`;
  };

  return (
    <Box position="relative" display="flex" justifyContent="center" alignItems="center">
      <svg height={size} width={size}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          strokeDashoffset={circumference - progress}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {progress > 0 && (
          <circle
            fill={strokeColor}
            r={strokeWidth / 2}
            cx={size / 2}
            cy={size / 2 - radius}
          />
        )}

        {progress > 0 && (
          <circle
            fill={strokeColor}
            r={strokeWidth / 2}
            cx={endX}
            cy={endY}
          />
        )}
      </svg>
      <Typography
        variant="h6"
        component="span"
        style={{
          position: 'absolute',
          fontWeight: 'bold',
        }}
      >
        {formatValue(animatedValue, unit)}
      </Typography>
    </Box>
  );
};

export default CircleProgressBar;
