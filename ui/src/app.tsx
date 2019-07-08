import * as React from 'react';
import { render,  } from 'react-dom';
import {Main} from './menu/main';
import { TriCellColor } from './terrain/board';

import Combo from './components/Combo';
import PolyMap from './components/PolyMap';

const colors: TriCellColor[] = [
    new TriCellColor(),
    new TriCellColor('Color 2', "#FFCBB5", "#5DEF5D", "#0A0AC0"),
    new TriCellColor('Color 3', "#FFCBB5", "#5DEF5D", "#8888FF")
];

const sizeInput = <input id="size" defaultValue="10" size={5}></input>;
const pieceSize = <input id="pieceSize" defaultValue="50" size={5}></input>;
const colorCombo = <Combo selId="colorChooser" items={colors}/>;
const renderLabels = <input id="renderLabels" type="checkbox" value="true" defaultChecked/>

const actionCombo = <Combo selId="actionChooser" items={Main.actions}/>;

const polyMap = <PolyMap selId="cellmap"/>;

render((<div>
    Board Size: {sizeInput},
    Color Set: {colorCombo},
    Piece Size: {pieceSize},
    Render Labels: {renderLabels}
    &nbsp; <button id="load">Render Board</button>
    <br/>
    Action: {actionCombo}
    &nbsp; <button id="actionButton">Invoke</button>
    <br/>
</div>), document.getElementById('main'));

function renderCellMap() {
    render(polyMap, document.getElementById('cellmapdiv'));
}


console.log('main...');
Main.colors = colors;
Main.renderCellMap = renderCellMap;
Main.main();
