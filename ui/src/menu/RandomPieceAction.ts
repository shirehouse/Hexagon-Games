import { Main } from "./main";
import { PlayerCell, PlayerImages } from "../terrain/PlayerMap";
import { OffscreenCanvas } from "../terrain/OffscreenCanvas";

export class RandomPieceAction {
    private playerInterval: any;

    constructor(
        public readonly name: string,
        public readonly count: number
    ) {
    }

    public run() {
        this.playerInterval = setInterval(() => {
            this.renderPlayers();
        }, 200);
    }

    public stop() {
        clearInterval(this.playerInterval);
    }

    private renderPlayers():void {
        Main.playerCanvas = new OffscreenCanvas();
        let ctx = Main.playerCanvas.ctx;

        Main.playerMap.clear();

        let cells = Main.board.getCells();

        for (let i = 0; i < this.count; i++) {
            const inx = Math.floor(Math.random() * cells.length);
            const cell = cells[inx];
            const pc = new PlayerCell(cell.r, cell.c);
            pc.image = PlayerImages.random();

            Main.playerMap.set(i.toString(), pc);
        }

        Main.render();
    }
}