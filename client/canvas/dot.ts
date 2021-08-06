export class Dot {
   constructor(
      public posX: number,
      public posY: number,
      public pixelsize: number,
      public r: number,
      public g: number,
      public b: number,
      public alpha: number,
   ) {
      this.posX = posX;
      this.posY = posY;
      this.pixelsize = pixelsize;
      this.r = r;
      this.g = g;
      this.b = b;
      this.alpha = alpha;
   }


   draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(this.posX, this.posY, this.pixelsize, this.pixelsize);

      ctx.beginPath();
      ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
      ctx.arc(this.posX + this.pixelsize / 2, this.posY + this.pixelsize / 2, this.pixelsize / 2.5, 0, Math.PI * 2, false);
      ctx.fill();
   }


}