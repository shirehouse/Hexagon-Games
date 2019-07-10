import { Main } from "../menu/main";

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