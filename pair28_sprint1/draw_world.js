import { Colors } from './backend/utils/Color.js';
import { Position } from './backend/utils/Position.js';
import { Just } from './backend/utils/Maybe.js';

import {cell, cellBlack, cellObstructed, cellRed, ctx} from "./board.js";

function drawCell(world, i, j, cellTyped, food = 0) {
  let pos = new Position(j, i);
  let blackMarkerText = "";
  let redMarkerText = "";
  for (let num = 0; num < 6; num++) {
      if (world.is_friendly_marker_at(pos, Colors.RED, num)) {
          redMarkerText = redMarkerText + num.toString();
      } else {
          redMarkerText = redMarkerText + " ";
      }
      if (world.is_friendly_marker_at(pos, Colors.BLACK, num)) {
          blackMarkerText = blackMarkerText + num.toString();
      } else {
          blackMarkerText = blackMarkerText + " ";
      }
  }
  if (typeof document !== 'undefined') {
      if (i % 2 === 0) { // Checking if the row is even
          ctx.drawImage(cellTyped, j * 50, i * 44, 64, 64); // Drawing the cell at the even position
          // draw food if it is present in the cell
          if (food > 0) {
              ctx.fillText(food.toString(), j * 50 + 24, i * 44 + 25);
          }
          // draw markers
          let old_fillstyle = ctx.fillStyle;
          ctx.font = "12px Verdana";
          ctx.fillStyle = "#ff0000";
          ctx.fillText(redMarkerText, j * 50 + 9, i * 44 + 35);
          ctx.fillStyle = "#000";
          ctx.fillText(blackMarkerText, j * 50 + 9, i * 44 + 46);
          ctx.font = "20px Verdana";
          ctx.fillStyle = old_fillstyle;
      } else {
          ctx.drawImage(cellTyped, j * 50 + 25, i * 44, 64, 64); // Drawing the cell at the odd position
          // draw food if it is present in the cell
          if (food > 0) {
              ctx.fillText(food.toString(), j * 50 + 49, i * 44 + 25);
          }
          // draw markers
          let old_fillstyle = ctx.fillStyle;
          ctx.font = "12px Verdana";
          ctx.fillStyle = "#ff0000";
          ctx.fillText(redMarkerText, j * 50 + 34, i * 44 + 35);
          ctx.fillStyle = "#000";
          ctx.fillText(blackMarkerText, j * 50 + 34, i * 44 + 46);
          ctx.font = "20px Verdana";
          ctx.fillStyle = old_fillstyle;
      }
  }
}

export function updateMapView(world) {
  for (let i = 0; i < world.vertical_size; i++) { // Looping through each row
      for (let j = 0; j < world.horizontal_size; j++) { // Looping through each column
          if (world.map[i][j].obstructed) drawCell(world, i, j, cellObstructed)
          else if (world.is_friendly_base_at(new Position(j, i), Colors.RED)) drawCell(world, i, j, cellRed)
          else if (world.is_friendly_base_at(new Position(j, i), Colors.BLACK)) drawCell(world, i, j, cellBlack)
          else drawCell(world, i, j, cell, world.get_food_at(new Position(j, i)))
      }
  }
}