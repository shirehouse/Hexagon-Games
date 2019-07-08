import { Main } from "./main";
import { PlayerCell } from "../terrain/PlayerMap";

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
        const playerCanvas = <HTMLCanvasElement>document.createElement("canvas");
        playerCanvas.width = 800;
        playerCanvas.height = 800;
        let ctx = <CanvasRenderingContext2D>playerCanvas.getContext("2d");

        Main.playerMap.clear();

        let cells = Main.board.getCells();

        for (let i = 0; i < this.count; i++) {
            const inx = Math.floor(Math.random() * cells.length);
            const cell = cells[inx];
            const pc = new PlayerCell(cell.r, cell.c);

            Main.playerMap.set(i.toString(), pc);
        }

        Main.playerMap.render(ctx);

        let ctx2 = <CanvasRenderingContext2D>Main.canvas.getContext('2d');
        ctx2.drawImage(Main.boardCanvas, 0, 0);
        ctx2.drawImage(playerCanvas, 0, 0);
    }
}