import { Main } from "../menu/main";

export class OffscreenCanvas {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.createElement("canvas");
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
}