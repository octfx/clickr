export default class Timer {
    private intervalId: NodeJS.Timeout | undefined;
    private offset: number | undefined;
    private clock = 0;
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    public start(): void {
        this.reset();
        if (typeof this.intervalId === "undefined") {
            this.offset = Date.now();
            this.intervalId = setInterval(this.update.bind(this), 1);
        }
    }

    public stop(): void {
        if (typeof this.intervalId !== "undefined") {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    public reset(): void {
        this.clock = 0;
        this.render();
    }

    public getTime(): number {
        return this.clock;
    }

    private update(): void {
        this.clock += this.delta();
        this.render();
    }

    private render(): void {
        this.element.innerText = String(this.clock / 1000);
    }

    private delta(): number {
        const now = Date.now();
        const d = now - <number>this.offset;

        this.offset = now;

        return d;
    }
}
