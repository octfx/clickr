import {ZERO_POINT} from "./constants";
import {Path, Point} from 'paper';
import {FrameEvent} from "./framevent";
import {IGame} from "./game";

export default class Circle extends Path.Circle {
    private static readonly SIZE: number = 10;

    public static getInstance(game: IGame) {
        const circle = new Circle(ZERO_POINT, Circle.SIZE);

        circle.fillColor = game.color;

        circle.strokeScaling = false;
        circle.strokeColor = circle.fillColor.clone();
        circle.strokeColor.hue -= 180;
        circle.strokeWidth = 2;

        const clamp = (num: number, min: number, max: number) => {
            return Math.min(Math.max(num, min), max);
        };

        circle.position = new Point(
            clamp(Math.floor(Math.random() * game.viewSize.width), 25, game.viewSize.width - 25),
            clamp(Math.floor(Math.random() * game.viewSize.height), 35, game.viewSize.height - 25)
        );

        circle.onClick = () => {
            game.onClick(circle);
        };

        circle.onDoubleClick = circle.onClick;

        circle.onFrame = (event: FrameEvent) => {
            game.onFrame(circle, event);
        };

        return circle;
    }

}
