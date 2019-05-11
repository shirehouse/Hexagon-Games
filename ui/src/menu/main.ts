import $ from 'jquery';
import { Terrain } from '../terrain/terrain';
import { Random } from 'random-js';

export class Main {
    public static canvas: HTMLCanvasElement;
    public static load: JQuery<HTMLCanvasElement>;
    public static terrian: Terrain;

    public static main() {
        console.log('main...');
        $('document').ready(() => {
            console.log('ready...');
            this.onReady();
        });
    }

    private static onReady(): void {
        let c = $("#canvas");
        this.canvas = <HTMLCanvasElement>c[0];

        this.load = $("#load");
        this.terrian = new Terrain(this.canvas.width, this.canvas.height, 60, 60);
        this.load.click(() => {
            console.log('load click...');
            this.onLoad();
        });        
    }

    private static onLoad(): void {
        this.render();
    }

    

    private static render(): void {
        let ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        ctx.clearRect(0, 0, 800, 800);

        this.terrian.render(ctx);
    }
}