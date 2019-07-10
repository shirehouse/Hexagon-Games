import { Main } from "./main";
import { PlayerCell } from "../terrain/PlayerMap";
import { OffscreenCanvas } from "../terrain/OffscreenCanvas";

export class MoveAction {
    constructor(
        public readonly name: string,
        public readonly count: number
    ) {
    }

    public run() {
        this.init();
        this.render();

    }

    public stop() {
    }

    private init(): void {
        Main.playerMap.clear();

        let cells = Main.board.getCells();

        for (let i = 0; i < this.count; i++) {
            const inx = Math.floor(Math.random() * cells.length);
            const cell = cells[inx];
            const pc = new PlayerCell(cell.r, cell.c);

            Main.playerMap.set(i.toString(), pc);
        }
    }

    private render():void {
        Main.render();
    }


}