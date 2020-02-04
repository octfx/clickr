import {PaperScope, Size} from 'paper';

import InfoDisplay from "./info_display";
import Game from "./game";

export default class Clickr {

    /**
     * Canvas for paper.js
     *
     * @type {HTMLCanvasElement}
     */
    private _canvas: HTMLCanvasElement | undefined;


    /**
     * Paper _scope containing all menu items
     *
     * @type {PaperScope}
     */
    private _scope: paper.PaperScope | undefined;

    private game: Game;

    private readonly button: HTMLElement;

    constructor() {
        this.setupCanvas();
        this.setupScope();

        this.button = <HTMLElement>document.getElementById('start');
        this.button.addEventListener('click', (event:MouseEvent) => {
            this.game.start();

            (<HTMLElement>event.target).classList.add('hidden');
        });

        const infoDisplay = new InfoDisplay();
        this.game = new Game(30, (<paper.PaperScope>this._scope).view.viewSize, infoDisplay, (<paper.PaperScope>this._scope).project.activeLayer);
    }

    /**
     * @return {HTMLCanvasElement}
     */
    public get canvas(): HTMLCanvasElement {
        if (typeof this._canvas === "undefined") {
            throw new Error("Canvas not initialized in menu");
        }

        return this._canvas;
    }

    /**
     * Sets up the paper.js canvas
     * Disables the context menu and resizes it to full screen
     *
     * @throws {Error} If root element is missing
     */
    private setupCanvas(): void {
        this._canvas = <HTMLCanvasElement>document.createElement('canvas');
        this._canvas.addEventListener('contextmenu', (e): void => e.preventDefault());
        this._canvas.setAttribute('data-paper-resize', 'true');
        this._canvas.setAttribute('tabindex', '1');
        (<any>this._canvas.style)['touch-action'] = 'none';
        (<any>this._canvas.style)['outline'] = 'none';
        this._canvas.id = 'clickr';

        document.body.appendChild(this._canvas);
    }

    /**
     * Sets up the paper.js scope
     *
     * @throws {Error} If the paper canvas is not initialized
     */
    private setupScope(): void {
        this._scope = new PaperScope();
        this._scope.settings.insertItems = false;
        this._scope.settings.applyMatrix = false;
        this._scope.activate();
        this._scope.setup(this.canvas);
        this._scope.project.view.viewSize = new Size(document.body.offsetWidth, document.body.offsetHeight);

    }
}
