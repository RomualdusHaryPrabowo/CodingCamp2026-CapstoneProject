import { memo } from "react";
import { SearchWithStep, SearchPlain, StepIcon } from "./DiagonalIcons";

const DiagonalSvgBackground = memo(function DiagonalSvgBackground() {
  
  
  const patternRows = [
    [SearchWithStep, SearchPlain, SearchWithStep, SearchPlain, SearchWithStep],
    [StepIcon, null, StepIcon, null, StepIcon],
    [SearchWithStep, SearchPlain, SearchWithStep, SearchPlain, SearchWithStep],
    [StepIcon, null, StepIcon, null, StepIcon],
    [SearchWithStep, SearchPlain, SearchWithStep, SearchPlain, SearchWithStep],
  ];

  
  
  const TILE_REPEAT_X = 12;
  const TILE_REPEAT_Y = 12;

  const cells = [];
  let key = 0;

  for (let ty = 0; ty < TILE_REPEAT_Y; ty++) {
    for (let row = 0; row < patternRows.length; row++) {
      for (let tx = 0; tx < TILE_REPEAT_X; tx++) {
        for (let col = 0; col < patternRows[row].length; col++) {
          const Icon = patternRows[row][col];
          cells.push(
            <div key={key++} className="diagonal-bg-cell">
              {Icon ? <Icon size={28} /> : null}
            </div>,
          );
        }
      }
    }
  }

  const totalCols = patternRows[0].length * TILE_REPEAT_X; 

  return (
    <div className="diagonal-bg-wrapper" aria-hidden="true">
      <div
        className="diagonal-bg-grid"
        style={{
          gridTemplateColumns: `repeat(${totalCols}, 48px)`,
        }}
      >
        {cells}
      </div>
    </div>
  );
});

export default DiagonalSvgBackground;
