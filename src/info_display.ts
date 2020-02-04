import Timer from "./timer";

export default class InfoDisplay {
    public readonly timer: Timer;

    private readonly timerContainer: HTMLElement;
    private readonly counter: HTMLElement;
    private readonly counterMax: HTMLElement;

    constructor() {
        this.timerContainer = <HTMLElement>document.getElementById('timer');
        this.timer = new Timer(this.timerContainer);

        this.counter = <HTMLElement>document.getElementById('counter');
        this.counterMax = <HTMLElement>document.getElementById('counterMax');
    }

    public updateCounter(current: number, max: number) {
        this.counter.innerText = String(current);
        this.counterMax.innerText = String(max);
    }
}
