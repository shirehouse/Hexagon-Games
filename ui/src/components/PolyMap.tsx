import * as React from 'react';
import { Cell, Board } from '../terrain/board';
import { Main } from '../menu/main';

export default class PolyMap extends React.Component {
  props: {
    selId: string
  }

  render() {
    let items: Cell[] = Main.cells || [];
    const board = Main.board;
    console.log('Render Poly Map');
    const areas = items.map((cell) => {
      const c = board.getPos(cell.r, cell.c);
      const coods = board.getCoods(c.x, c.y);
      const res = coods.map((p) => { return `${p.x},${p.y}` }).join(',');
      let onClick = () => {
        //alert(`${cell.c}, ${cell.r}`);
        console.log(`Clicked: ${cell.c}, ${cell.r}`);
        Main.click(cell);
        Main.render();
      };
      return <area key={cell.hash} shape="poly" coords={res} onClick={onClick} alt="Test" />
    });
    console.log('Render Poly Map: ' + areas.length);

    const id = this.props.selId;
    return (
      <map id={id} name={id}>
        {areas}
      </map>
    );
  }
}