
import * as util from '../util';

export class Point {
    constructor(
        public x: number,
        public y: number
    ) {
    }

    public distance(to: Point) {
        let a = to.x - this.x;
        let b = to.y - this.y;
        let c = Math.sqrt(a * a + b * b);
        return c;
    }

    public add(b: Point) {
        this.x += b.x;
        this.y += b.y;
    }
}

export class Cell {
    public constructor(
        public r: number,
        public c: number
    ) {
        if (r <= -1000 || r >= 1000) {
            throw new Error('Out of bounds');
        }
        if (c <= -1000 || c >= 1000) {
            throw new Error('Out of bounds');
        }
    }

    public static fnHash(r: number, c: number): number {
        return (r + 1000) * 2000 + c;
    }

    public get hash() {
        return Cell.fnHash(this.r, this.c);
    }
}


export class TriCellColor {
    constructor(
        public name = "default",
        public a = "#ffcccc",
        public b = "#ccffcc",
        public c = "#ccccff"
    ) {

    }
}

export class Board {
    private center: Point;
    private readonly wHalf: number; // Half Cell Width
    private readonly h4th: number; // 4th Cell Height
    private readonly hHalf: number; // Half Cell Height
    private readonly CellWidth: number;
    private readonly CellHeight: number;
    private boardWidth: number;
    private boardHeight: number;

    private minR: number = undefined;
    private maxR: number = undefined;
    private minC: number = undefined;
    private maxC: number = undefined;
    public defaultColors = new TriCellColor();
    public renderLabels = true;

    private readonly cells = new Map<number, Cell>();
    
    public constructor(
        public readonly Size: number
    ) {
        this.CellWidth = Math.floor(Size * 0.886);  // Size * sqrt(3/4)
        this.CellHeight = Size;
        this.wHalf = Math.floor(this.CellWidth / 2);
        this.h4th = Math.floor(this.CellHeight / 4);
        this.hHalf = Math.floor(this.CellHeight / 2);
    }


    private calBoardSize(): void {
        const cells = this.getCells();
        let minR = 0;
        let maxR = 0;
        let minC = 0;
        let maxC = 0;
        for (const cell of cells) {
            if (cell.r < minR) {
                minR = cell.r;
            }
            if (cell.r > maxR) {
                maxR = cell.r;
            }
            if (cell.c < minC) {
                minC = cell.c;
            }
            if (cell.c > maxC) {
                maxC = cell.c;
            }
        }
        this.boardHeight = (maxR - minR - 1) * this.CellWidth;
        this.boardWidth = (maxC - minC + 1) * this.CellWidth;
        
        let midX = Math.floor(this.boardWidth / 2);
        let midY = Math.floor(this.boardHeight / 2);
        this.center = new Point(midX, midY);
    }

    public get BoardWidth(): number {
        return this.boardWidth;
    }

    public get BoardHeight(): number {
        return this.boardHeight;
    }

    public getCoods(x: number, y: number): Point[] {
        return [
            new Point(x + this.wHalf, y),
            new Point(x + this.CellWidth, y + this.h4th),
            new Point(x + this.CellWidth, y + (this.CellHeight - this.h4th)),
            new Point(x + this.wHalf, y + this.CellHeight),
            new Point(x, y + (this.CellHeight - this.h4th)),
            new Point(x, y + this.h4th),
            new Point(x + this.wHalf, y),
        ];
    }

    public drawHex(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const points = this.getCoods(x, y);
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    public getPos(r: number, c: number) {
        let xOff = Math.abs(r) % 2;
        let shiftRight = Math.floor(r / 2);
        if (r < 0) {
            shiftRight = -1 * Math.floor(Math.abs(r / 2)) - xOff;
        }
        let x = this.center.x - this.wHalf + xOff * this.wHalf + (c + shiftRight) * this.CellWidth;
        let y = this.center.y - this.hHalf - r * (this.CellHeight - this.h4th);
        let l = new Point(x, y);
        return l;
    }

    public getCellColor(r: number, c: number) {
        //let a = Math.abs(c - r + 1000) % 3;
        let a = (c - r) % 3;

        if (a === 0) {
            return this.defaultColors.a;
        } if (a === 1 || a == -2) {
            return this.defaultColors.b;
        } else {
            return this.defaultColors.c;
        }
        /*if (a === 0) {
            return "#FFCBB5";
        }
        if (a === 1) {
            return "#5DEF5D";
        }
        else {
            return "#0A0AC0";
        }*/
    }

    public drawCell(ctx: CanvasRenderingContext2D, r: number, c: number, clr: string = undefined): void {
        let p = this.getPos(r, c);

        ctx.fillStyle = clr || this.getCellColor(r, c);
        this.drawHex(ctx, p.x, p.y);

        ctx.strokeStyle = '#000000';
        ctx.font = "12px Courier";
        ctx.textBaseline = "top";
        let d = (c + r);
        let ct = c.toString();
        let rt = r.toString();
        let dt = d.toString();
        if (ct.length === 1) { ct = " " + ct; }
        if (rt.length === 1) { rt = " " + rt; }
        if (dt.length === 1) { dt = " " + dt; }
        let th = 12;
        let y0 = p.y + this.h4th - th / 2;
        let x0 = p.x + this.hHalf / 2;
        if (this.renderLabels) {
            ctx.strokeText(ct, x0, y0);
            ctx.strokeText(rt, x0, y0 + th * 2);
            ctx.strokeText(dt, x0, y0 + th);
        }
    }

    public defineCell(r: number, c: number) {
        let cell = new Cell(r, c);
        this.cells.set(cell.hash, cell);
        if (!this.minR || r < this.minR) {
            this.minR = r;
        }
        if (!this.maxR || r > this.maxR) {
            this.maxR = r;
        }
        if (!this.minC || c < this.minC) {
            this.minC = c;
        }
        if (!this.maxC || c > this.maxC) {
            this.maxC = c;
        }

        return cell;
    }

    public createCircleBoard(radiusPixels: number): void {
        let pOffset = new Point(this.wHalf, this.hHalf);

        for (let r = -500; r <= 500; r++) {
            for (let c = -500; c <= 500; c++) {
                let d = (c + r)
                //let p = this.getPos(r, c);
                //p.add(pOffset);

                //if (p.distance(this.center) < radiusPixels) {
                if (Math.abs(d) < radiusPixels && Math.abs(c) < radiusPixels && Math.abs(r) < radiusPixels) {
                    this.defineCell(r, c);
                }
                //}
            }
        }

        this.calBoardSize();
    }

    public getCell(r: number, c: number): Cell {
        let hash = Cell.fnHash(r, c);
        let cell = this.cells.get(hash);
        return cell;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "#000000";
        //let pOffset = new Point(this.wHalf, this.hHalf);

        for (let r = this.minR; r <= this.maxR; r++) {
            for (let c = this.minC; c <= this.maxC; c++) {
                let cell = this.getCell(r, c);
                if (!cell) {
                    //this.drawCell(ctx, r, c, '#CCCCCC');
                    continue;
                }

                this.drawCell(ctx, r, c);
            }
        }

        // Add a dot to mark the center
        // ctx.fillStyle = "#000000";
        // ctx.fillRect(this.center.x - 2, this.center.y - 2, 4, 4);
    }

    public getCells(): Cell[] {
        return Array.from(this.cells.values());
    }

    public cellAt(x: number, y: number): Cell {
        const rowHeight = this.CellHeight - this.h4th;
        let yOffset = y - this.center.y;
        let rDec = yOffset / rowHeight;
        let r = -1 * Math.floor(rDec);
        console.log(`Row: ${yOffset}, ${rDec} - ${r}`);
        return undefined;
    }
}