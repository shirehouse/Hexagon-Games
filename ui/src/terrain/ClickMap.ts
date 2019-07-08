import { Board } from "./board";

export class ClickMap {
    public areas: HTMLAreaElement[] = [];
    
    constructor(
        public readonly board: Board
    ) {

    }

    public apply(): void {
        this.areas = this.board.getCells().map((cell) => {
            const c = this.board.getPos(cell.r, cell.c);
            const coods = this.board.getCoods(c.x, c.y);
            const area: HTMLAreaElement = document.createElement("area");
            area.coords = coods.map((p) => {return `${p.x},${p.y}`}).join(',');
            return area;
        });
    }
}