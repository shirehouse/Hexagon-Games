import $ from 'jquery';
import { Board, TriCellColor, Cell } from '../terrain/board';
import { PlayerMap } from '../terrain/PlayerMap';
import { ComboItem } from '../components/Combo';
import { RandomPieceAction } from './RandomPieceAction';
import { MoveAction } from './MoveAction';
import { MoveManager } from '../terrain/MoveManager';
import { OffscreenCanvas } from '../terrain/OffscreenCanvas';
import { SelectManager } from '../terrain/SelectManager';

export interface Action extends ComboItem {
    run(): void;
    stop(): void
}

export class Main {
    public static canvas: HTMLCanvasElement;
    public static canvasMap: HTMLMapElement;
    public static boardCanvas: HTMLCanvasElement;
    public static playerCanvas: OffscreenCanvas;
    public static load: JQuery<HTMLCanvasElement>;
    public static board: Board;
    public static colors: TriCellColor[];
    public static playerMap: PlayerMap;
    private static playerInterval: number;
    public static renderCellMap: () => void;
    public static cells: Cell[];
    public static selectManager: SelectManager;
    public static moveManager: MoveManager;

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
        
        const actionChooser = $("#actionButton");
        actionChooser.click(() => {
            console.log('action click...');
            this.onAction();
        }); 
    }

    private static onRender(): void {
        this.boardCanvas = <HTMLCanvasElement>document.createElement("canvas");
        this.boardCanvas.width = 800;
        this.boardCanvas.height = 800;
        this.playerCanvas = new OffscreenCanvas();
        this.canvasMap = <HTMLMapElement>document.createElement("canvasMap");

        let sz = parseInt(<string>$('#size').val());
        let pieceSize = parseInt(<string>$('#pieceSize').val());
        console.log('Size: ' + sz);
        this.board = new Board(this.canvas.width, this.canvas.height, pieceSize);
        this.playerMap = new PlayerMap(this.board);
        this.selectManager = new SelectManager(this.board, this.playerMap);
        this.moveManager = new MoveManager(this.board, this.selectManager, this.playerMap);
        const colorChooser:JQuery<HTMLSelectElement> = $("#colorChooser");
        let e = colorChooser[0];
        let color = this.colors[e.selectedIndex];
        
        this.board.defaultColors = color || this.colors[0];
        this.board.renderLabels = $('#renderLabels').is(':checked');
        this.board.createCircleBoard(sz);
        this.render();
        if (this.playerInterval) {
            clearInterval(this.playerInterval);
        }
    }

    public static render(): void {
        let ctx = <CanvasRenderingContext2D>this.boardCanvas.getContext("2d");

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 800, 800);

        this.board.render(ctx);

        this.cells = this.board.getCells();
        this.renderCellMap();
        this.selectManager.render(ctx);
        this.moveManager.render(ctx);
        
        Main.playerCanvas = new OffscreenCanvas();
        Main.playerMap.render(Main.playerCanvas.ctx);

        let ctx2 = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        ctx2.drawImage(this.boardCanvas, 0, 0);
        ctx2.drawImage(this.playerCanvas.canvas, 0, 0);
    }

    public static readonly actions: Action[] = [
        new RandomPieceAction("Random 50", 50),
        new RandomPieceAction("Random 100", 100),
        new RandomPieceAction("Random 200", 200),
        new MoveAction("Move Test 10", 10),
        new MoveAction("Move Test 20", 20)
    ];

    private static lastAction: Action;


    private static onAction(): void {
        if (this.lastAction) {
            this.lastAction.stop();
        }
        const colorChooser:JQuery<HTMLSelectElement> = $("#actionChooser");
        let e = colorChooser[0];
        let action = this.actions[e.selectedIndex];

        console.log(`Action Invoke ${action.name}`);

        action.run();
        this.lastAction = action;
    }

    public static click(cell: Cell): void {
        if (!this.moveManager.tryMove(cell)) {
            this.selectManager.trySelect(cell);
        }
    }
}