import $ from 'jquery';
import { Board, TriCellColor } from '../terrain/board';
import { Random } from 'random-js';

export class Main {
    public static canvas: HTMLCanvasElement;
    public static load: JQuery<HTMLCanvasElement>;
    public static board: Board;
    public static colors: TriCellColor[];

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
        this.load.click(() => {
            console.log('load click...');
            this.onRender();
        });        
    }

    private static onRender(): void {
        let sz = parseInt(<string>$('#size').val());
        let pieceSize = parseInt(<string>$('#pieceSize').val());
        console.log('Size: ' + sz);
        this.board = new Board(this.canvas.width, this.canvas.height, pieceSize);
        const colorChooser:JQuery<HTMLSelectElement> = $("#colorChooser");
        let e = colorChooser[0];
        let color = this.colors[e.selectedIndex];
        
        this.board.defaultColors = color || this.colors[0];
        this.board.renderLabels = $('#renderLabels').is(':checked');
        this.board.createCircleBoard(sz);
        this.render();
    }

    private static render(): void {
        let ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        ctx.clearRect(0, 0, 800, 800);

        this.board.render(ctx);
    }
}