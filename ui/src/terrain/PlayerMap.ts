import { Board, Cell } from "./board";
import { HtmlAttributes } from "csstype";
declare var require: any;
const pawn2 = require('../assets/Pawn2.png');

let drawing = new Image();
drawing.src = pawn2;

export class PlayerCell extends Cell {
    public image: HTMLImageElement = drawing;
}

export class PlayerMap {
    private playersByKey = new Map<string, PlayerCell>();
    private playersByHash = new Map<number, PlayerCell>();

    constructor(
        public readonly board: Board
    ) {
    }

    public clear(): void {
        this.playersByHash.clear();
        this.playersByKey.clear();
    }

    public remove(key: string) {
        const oldCell = this.playersByKey.get(key);
        if (oldCell) {
            this.playersByKey.delete(key);
            this.playersByHash.delete(oldCell.hash);
        }
        return oldCell;
    }

    public set(key: string, cell: PlayerCell): boolean {
        this.remove(key);

        if (this.playersByHash.get(cell.hash)) {
            return;
        }
    
        this.playersByKey.set(key, cell);
        this.playersByHash.set(cell.hash, cell);
        return true;
    }

    
    public render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "#FF0000";
        //let pOffset = new Point(this.wHalf, this.hHalf);

        const size = this.board.Size * 3/4;

        this.playersByKey.forEach((cell) => {
            const p = this.board.getPos(cell.r, cell.c);
            p.x += 5;
            p.y += 5;
            ctx.drawImage(cell.image, p.x, p.y, size, size);
        });
    }
}