import { Cell, Board } from "./board";
import { PlayerMap } from "./PlayerMap";
import { Main } from "../menu/main";

export class SelectManager {
    constructor(
        public readonly board: Board,
        public readonly playerMap: PlayerMap
    ) {

    }

    public selectedCell: Cell;

    public trySelect(cell: Cell): boolean {
        if (this.selectedCell && this.selectedCell.hash === cell.hash) {
            this.selectedCell = undefined;
            Main.render();
            return false;
        } else {
            if (!this.playerMap.get(cell)) {
                this.selectedCell = undefined;
                Main.render();
                return;
            }
            this.selectedCell = cell;
            Main.render();
            return true;
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        const cell = this.selectedCell;
        if (!cell) {
            return;
        }
        const p = this.board.getPos(cell.r, cell.c);
        ctx.fillStyle = '#660066';
        this.board.drawHex(ctx, p.x, p.y);
    }
}