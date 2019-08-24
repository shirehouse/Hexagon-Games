import {Main} from './index';

/*const sizeInput = <input id="size" defaultValue="10" size={5}></input>;
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
*/

console.log('main...');
Main.init();
