import { Main } from "./main";
import { PlayerCell } from "../terrain/PlayerMap";

export class OffscreenCanvas {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement("canvas");
        this.canvas.width = Main.canvas.width;
        this.canvas.height = Main.canvas.height;
        
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
}

export class MoveAction {
    private playerCanvas: OffscreenCanvas;

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
        this.playerCanvas = new OffscreenCanvas();

        Main.playerMap.render(this.playerCanvas.ctx);

        let ctx2 = <CanvasRenderingContext2D>Main.canvas.getContext('2d');
        ctx2.drawImage(Main.boardCanvas, 0, 0);
        ctx2.drawImage(this.playerCanvas.canvas, 0, 0);
    }

    
}