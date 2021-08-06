import {IPostCommonProps} from "@interface/post.interface";
import {Dot} from "@canvas/dot";

export class Canvas {
    ctx: any;
    stageWidth: number = 0;
    stageHeight: number = 0;

    img: any;
    isLoaded: boolean = false;
    imgPos: {
        x: number,
        y: number,
        width: number,
        height: number
    };

    pixelSize: number;
    imgData: any;
    columns: number = 0;
    rows: number = 0;

    dots_arr: Dot[] = [];

    constructor(
        public ref: HTMLCanvasElement,
        public selected: number,
        public posts: IPostCommonProps[],
    ) {
        this.ctx = ref.getContext("2d");
        this.pixelSize = 26;

        this.loadImg();

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();


    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.ref.width = this.stageWidth;
        this.ref.height = this.stageHeight;

        if (this.isLoaded) {
            this.loadImg();
        }
    }

    loadImg() {
        this.img = new Image();
        this.img.src = process.env.NODE_ENV === "development"
            ? "http://localhost:3000/images/this.png"
            : this.posts[this.selected].thumbnail
                ? `https://www.junggri.com/thumbnail/${this.posts[this.selected].thumbnail}`
                : "https://www.junggri.com/images/smileBasic.png";

        this.img.onload = () => {
            this.isLoaded = true;
            this.drawBackground();
            window.requestAnimationFrame(this.animate.bind(this));
        };
    }

    drawBackground() {
        this.imgPos = {x: 0, y: 0, width: 0, height: 0};

        const stageRatio = this.stageWidth / this.stageHeight;
        const imgRatio = this.img.width / this.img.height;

        this.imgPos.width = this.stageWidth;
        this.imgPos.height = this.stageHeight;

        if (imgRatio > stageRatio) {
            this.imgPos.width = Math.round(
                this.img.width * (this.stageHeight / this.img.height),
            );
            this.imgPos.x = Math.round(
                (this.stageWidth - this.imgPos.width) / 2,
            );
        } else {
            this.imgPos.height = Math.round(
                this.img.height * (this.stageWidth / this.img.width),
            );
            this.imgPos.y = Math.round(
                (this.stageHeight - this.imgPos.height) / 2,
            );
        }

        this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.imgPos.x, this.imgPos.y, this.imgPos.width, this.imgPos.height);
        this.imgData = this.ctx.getImageData(0, 0, this.stageWidth, this.stageHeight);
        this.initDotArr();
    }

    initDotArr() {
        this.dots_arr = [];
        this.columns = Math.ceil(this.stageWidth / this.pixelSize);
        this.rows = Math.ceil(this.stageHeight / this.pixelSize);
        this.imgData = this.ctx.getImageData(0, 0, this.stageWidth, this.stageHeight);
        for (let i = 0; i < this.columns; i++) {
            let x = i * this.pixelSize;
            const pixelX = Math.max(Math.min(x + this.pixelSize / 2, this.stageWidth), 0);
            for (let j = 0; j < this.rows; j++) {
                let y = j * this.pixelSize;
                const pixelY = Math.max(Math.min(y + this.pixelSize / 2, this.stageHeight), 0);
                const _idx = (pixelX + pixelY * this.stageWidth) * 4;
                this.makeDotArr(x, y, _idx, this.dots_arr);
            }
        }
    }

    makeDotArr(posX: number, posY: number, dotIdx: number, dotarr: Dot[]) {
        const dot = new Dot(
            posX,
            posY,
            this.pixelSize,
            this.imgData.data[dotIdx],
            this.imgData.data[dotIdx + 1],
            this.imgData.data[dotIdx + 2],
            Math.random(),
        );
        dotarr[dotarr.length] = dot;
    }

    drawdots() {
        this.dots_arr.forEach(e => e.draw(this.ctx));
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.drawdots();
        console.log(123);
        // requestAnimationFrame(this.animate.bind(this));
    }

}