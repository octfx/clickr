import {ZERO_POINT} from "./constants";
import {Color, Path, Point as PaperPoint, SymbolDefinition} from 'paper';
import {FrameEvent} from "./framevent";

export default class Point {
    private readonly geometry: paper.SymbolDefinition;
    private placedGeo: paper.SymbolItem | undefined;

    private _scope: paper.PaperScope | undefined;

    private static symbol: paper.SymbolDefinition;

    private _pointMap: Map<number, Point> | undefined;

    private _callBack: Function | undefined;

    public static getSymbol(): paper.SymbolDefinition {
        if (typeof Point.symbol === "undefined"){
            const geometry = new Path.Circle(ZERO_POINT, 10);

            geometry.fillColor = Color.random();
            Point.symbol = new SymbolDefinition(geometry);

            geometry.strokeColor = Color.random();
            geometry.strokeWidth = 0;
            geometry.strokeScaling = false;

            geometry.onFrame = () => {
                (<paper.Color>geometry.fillColor).hue += 0.5;
            };
        }

        return Point.symbol;
    }

    constructor() {
        this.geometry = Point.getSymbol();
    }

    public set scope(scope: paper.PaperScope) {
        this._scope = scope;
    }

    public get id() {
        return (<paper.SymbolItem>this.placedGeo).id;
    }

    public set pointMap(map:Map<number,Point>) {
        this._pointMap = map;
    }

    public init() {
        if (typeof this._scope === "undefined") {
            console.error('Scope undefined');
            return;
        }

        const pos = new PaperPoint(
            Math.floor(Math.random() * this._scope.view.size.width),
            Math.floor(Math.random() * this._scope.view.size.height)
        );

        this.placedGeo = this.geometry.place(pos);

        this.placedGeo.fillColor = Color.random();

        this._scope.project.activeLayer.addChild(this.placedGeo);

        this.addEvents();
    }

    public set callBack(fn:Function) {
        this._callBack = fn;
    }

    private addEvents() {
        if (typeof this.placedGeo === "undefined") {
            console.error('Geo undefined');
            return;
        }

        this.placedGeo.onClick = () => {
            if (typeof this._callBack !== "undefined") {
                this._callBack();
            }

            // @ts-ignore
            this.placedGeo.remove();

            (<Map<number, Point>>this._pointMap).delete(this.id);
        };

        this.placedGeo.onFrame = (frameEvent: FrameEvent) => {
            if (frameEvent.count % 10 === 0) {
                // @ts-ignore
                this.placedGeo.scaling = this.placedGeo.scaling.add(0.1);
            }

            // @ts-ignore
            (<paper.Color>this.placedGeo.fillColor).hue += 1;
        }
    }
}
