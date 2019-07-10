import { Board, Cell } from "./board";
import { HtmlAttributes } from "csstype";
declare var require: any;
const pawn = require('../assets/Pawn2.png');
const bishop = require('../assets/Bishop.png');
const castle = require('../assets/Castle Rook.png');
const king = require('../assets/King.png');
const knight = require('../assets/Knight.png');

function getImage(src: any): HTMLImageElement {
    let drawing = new Image();
    drawing.src = src;
    return drawing;
}

export class PlayerImages {
    public static readonly pawn = getImage(pawn);
    public static readonly bishop = getImage(bishop);
    public static readonly castle = getImage(castle);
    public static readonly king = getImage(king);
    public static readonly knight = getImage(knight);

    public static readonly all = [
        PlayerImages.pawn,
        PlayerImages.bishop,
        PlayerImages.castle,
        PlayerImages.king,
        PlayerImages.knight
    ];

    public static random(): HTMLImageElement {
        return this.all[Math.floor(Math.random()*this.all.length)];
    }
}

export class PlayerCell extends Cell {
    public key: string;
    public image: HTMLImageElement = PlayerImages.pawn;
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
    
        cell.key = key;
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

    public get(cell: Cell): PlayerCell {
        return this.playersByHash.get(cell.hash);
    }
}