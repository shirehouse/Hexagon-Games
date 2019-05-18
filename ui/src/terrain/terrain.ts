
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

export class Terrain {
    private readonly center: Point;
    private readonly wHalf: number; // Half Cell Width
    private readonly h4th: number; // 4th Cell Height
    private readonly hHalf: number; // Half Cell Height
    private readonly CellWidth: number;
    private readonly CellHeight: number;
    
    public constructor(
        public readonly Width: number,
        public readonly Height: number,
        public readonly Size: number
    ) {
        this.CellWidth = Math.floor(Size * 0.886);  // Size * sqrt(3/4)
        this.CellHeight = Size;
        this.wHalf = Math.floor(this.CellWidth / 2);
        this.h4th = Math.floor(this.CellHeight / 4);
        this.hHalf = Math.floor(this.CellHeight / 2);
        
        let midX = Math.floor(this.Height / 2);
        let midY = Math.floor(this.Width / 2);
        this.center = new Point(midX, midY);
    }

    public drawHex(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + this.wHalf, y);
        ctx.lineTo(x + this.CellWidth, y + this.h4th);
        ctx.lineTo(x + this.CellWidth, y + (this.CellHeight - this.h4th));
        ctx.lineTo(x + this.wHalf, y + this.CellHeight);
        ctx.lineTo(x, y + (this.CellHeight - this.h4th));
        ctx.lineTo(x, y + this.h4th);
        ctx.lineTo(x + this.wHalf, y);
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
        let a = Math.abs(c - r + 1000) % 3;

        if (a === 0) {
            return "#ffcccc";
        } if (a === 1) {
            return "#ccffcc";
        } else {
            return "#ccccff";
        }
    }

    public drawCell(ctx: CanvasRenderingContext2D, r: number, c: number): void {
        let p = this.getPos(r, c);

        ctx.fillStyle = this.getCellColor(r, c);
        this.drawHex(ctx, p.x, p.y);

        ctx.strokeStyle = '#000000';
        ctx.font = "16px Courier";
        ctx.textBaseline = "top";
        let ct = c.toString();
        let rt = r.toString();
        if (ct.length === 1) { ct = " " + ct; }
        if (rt.length === 1) { rt = " " + rt; }
        ctx.strokeText(ct, p.x + this.hHalf / 2, p.y + this.h4th);
        ctx.strokeText(rt, p.x + this.hHalf / 2, p.y + this.h4th + 16);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "#000000";
        //ctx.lineWidth = 1;
        let pOffset = new Point(this.wHalf, this.hHalf);

        for (let r = -10; r <= 10; r++) {
            for (let c = -10; c <= 10; c++) {
                let p = this.getPos(r, c);
                p.add(pOffset);

                if (p.distance(this.center) < 300) {
                    this.drawCell(ctx, r, c);
                }
            }
        }

        // Add a dot to mark the center
        // ctx.fillStyle = "#000000";
        // ctx.fillRect(this.center.x - 2, this.center.y - 2, 4, 4);
    }
}