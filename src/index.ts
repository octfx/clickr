import {PaperScope, Size} from 'paper';
import {FrameEvent} from "./framevent";
import Point from "./point";
import Timer from "./timer";

export default class Clickr {

    /**
     * Canvas for paper.js
     *
     * @type {HTMLCanvasElement}
     */
    private _canvas: HTMLCanvasElement | undefined;

    private readonly _points: Map<number, Point>;

    private timer: Timer | undefined;
    private done = false;
    private pointNum = 30;
    private counter = 0;

    /**
     * Paper _scope containing all menu items
     *
     * @type {PaperScope}
     */
    private _scope: paper.PaperScope | undefined;

    private readonly button: HTMLElement;
    private readonly count: HTMLElement;
    private readonly countMax: HTMLElement;

    constructor() {
        this.setupDisplay();
        this.setupCanvas();
        this.setupScope();
        this._points = new Map<number, Point>();
        this.button = <HTMLElement>document.getElementById('start');
        this.button.addEventListener('click', () => {
            this.start();
        });

        this.count = <HTMLElement>document.getElementById('count');
        this.countMax = <HTMLElement>document.getElementById('countMax');
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

    public start() {
        this.button.style.display = 'none';
        this.countMax.innerText = String(this.pointNum);

        const addPoint = () => {
            const point = new Point();
            //@ts-ignore
            point.pointMap = this._points;
            //@ts-ignore
            point.scope = this._scope;
            point.init();

            point.callBack = () => {
                console.log('SIZE: ' + this._points.size);
                this.counter++;
                this.count.innerText = String(this.counter);
                if (this._points.size === 1) {
                    this.stop();
                }
            };

            this._points.set(point.id, point)
        };

        (<paper.PaperScope>this._scope).project.activeLayer.onFrame = (e: FrameEvent) => {
            if (this.done) {
                return;
            }

            if (this._points.size === 30) {
                this.done = true;
            }

            if (e.count % 5 === 0) {
                addPoint();
            }
        };

        (<Timer>this.timer).start();
    }

    private stop() {
        (<paper.PaperScope>this._scope).project.activeLayer.onFrame = null;
        (<paper.PaperScope>this._scope).project.activeLayer.onClick = null;
        (<Timer>this.timer).stop();
        this.button.style.display = '';
        this.done = false;
        this.counter = 0;
    }

    private setupDisplay() {
        const timer = document.getElementById('timer');
        this.timer = new Timer(<HTMLElement>timer);
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
