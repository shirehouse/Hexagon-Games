import { Main } from "./main";
import { PlayerCell, PlayerImages } from "../terrain/PlayerMap";

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
            pc.image = PlayerImages.random();

            Main.playerMap.set(i.toString(), pc);
        }
    }

    private render():void {
        Main.render();
    }


}