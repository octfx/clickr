import Circle from "./circle";
import {FrameEvent} from "./framevent";
import InfoDisplay from "./info_display";
import {Color} from 'paper';

export interface IGame {
    readonly color: paper.Color;
    readonly viewSize: paper.Size;

    onClick(circle: Circle): void;

    onFrame(circle: Circle, event: FrameEvent): void;
}

export default class Game implements IGame {
    public readonly viewSize: paper.Size;

    private readonly circles: Map<number, Circle>;
    private circleCount: number;
    private readonly infoDisplay: InfoDisplay;
    private readonly view: paper.Layer;
    private done = false;
    private _color: paper.Color;

    constructor(circleCount: number, viewSize: paper.Size, infoDisplay: InfoDisplay, view: paper.Layer) {
        this.circleCount = circleCount;
        this.viewSize = viewSize;
        this.infoDisplay = infoDisplay;
        this.view = view;
        this.circles = new Map<number, Circle>();
        this._color = Color.random();
        this._color.alpha = 0.5;
    }

    public new(circleCount: number | undefined) {
        if (typeof circleCount === "number") {
            this.circleCount = circleCount;
        }

        this.circles.clear();
        this.infoDisplay.timer.reset();
        this._color = Color.random();
    }

    public get color(): paper.Color {
        return this._color;
    }

    public onFrame(circle: Circle, event: FrameEvent): void {
        if (event.count % 10 === 0) {
            circle.scaling = circle.scaling.add(0.1);
        }

        (<paper.Color>circle.fillColor).hue += 1;
        (<paper.Color>circle.strokeColor).hue += 1;
    }

    private onFrameInternal(e: FrameEvent) {
        if (this.done) {
            return;
        }

        if (this.circles.size === this.circleCount) {
            this.done = true;
        }

        if (e.count % 5 === 0) {
            const circle = Circle.getInstance(this);
            this.circles.set(circle.id, circle);
            this.view.addChild(circle);
        }
    }

    public start(): void {
        this.infoDisplay.timer.reset();
        this.infoDisplay.timer.start();

        this.view.onFrame = this.onFrameInternal.bind(this);
        const bgCol = this.color.clone();
        bgCol.alpha = 0.2;
        document.body.style.backgroundColor = bgCol.toCSS(false);

        this.infoDisplay.updateCounter(this.circleCount, this.circleCount);
    }

    private stop(): void {
        console.log('stop');
        this.view.onFrame = null;
        this.infoDisplay.timer.stop();
        this.done = false;

        //const scores = JSON.parse(<string>localStorage.getItem('highscores'));
        //scores.push(this.infoDisplay.timer.getTime());
        //localStorage.setItem('highscores', JSON.stringify(scores));

        (<HTMLElement>document.getElementById('start')).classList.remove('hidden');
    }

    public onClick(circle: Circle): void {
        if (this.circles.has(circle.id)) {
            circle.tweenTo({
                scaling: Number.EPSILON,
                position: circle.position
            }, 50).start().then(() => {
                circle.remove();
            });

            this.circles.delete(circle.id);
            this.infoDisplay.updateCounter(this.circles.size, this.circleCount);
        }

        if (this.circles.size === 0) {
            this.stop();
        }
    }
}
