import { Board, Point, Cell } from "./board";
import { Main } from "../menu/main";
import { SelectManager } from "./SelectManager";
import { PlayerMap, PlayerCell } from "./PlayerMap";

export class MoveManager {
    constructor(
        public readonly board: Board,
        public readonly selectManager: SelectManager,
        public readonly playerMap: PlayerMap
    ) {

    }

    private renderChoice(ctx: CanvasRenderingContext2D, r: number, c: number): void {
        ctx.fillStyle = '#AA66AA';
        const p2 = this.board.getPos(r, c);
        this.board.drawHex(ctx, p2.x, p2.y);
    }

    private getChoices(cell: Cell): Cell[] {
        const r = cell.r;
        const c = cell.c;
        return [
            new Cell(r+2, c+1),
            new Cell(r+2, c-1),
            new Cell(r-2, c+1),
            new Cell(r-2, c-1),
            new Cell(r+1, c+2),
            new Cell(r+1, c-2),
            new Cell(r-1, c+2),
            new Cell(r-1, c-2)
        ];
    }

    public tryMove(cell: Cell): boolean {
        const selected = this.selectManager.selectedCell;
        if (!selected) {
            return false;
        }
        const choices = this.getChoices(selected);
        const res = choices.find(c => c.hash === cell.hash);
        if (!res) {
            return false;
        }
        const player = this.playerMap.get(selected);
        const newPlayerCell = new PlayerCell(cell.r, cell.c);
        newPlayerCell.image = player.image;
        this.playerMap.set(player.key, newPlayerCell);
        this.selectManager.selectedCell = undefined;
        Main.render();
        return true;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "#000000";
        const cell = this.selectManager.selectedCell;

        if (!cell) {
            return;
        }

        const choices = this.getChoices(cell);

        choices.forEach((choice) => {
            this.renderChoice(ctx, choice.r, choice.c);
        });
    }
}