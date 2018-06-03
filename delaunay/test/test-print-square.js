import { PaperSize, Orientation } from 'penplot';
import { polylinesToSVG } from 'penplot/util/svg';

export const orientation = Orientation.LANDSCAPE;
export const dimensions = PaperSize.SQUARE_POSTER;

export default function createPlot (context, dimensions) {
  const [ width, height ] = dimensions;

  // Function to create a square
  const square = (x, y, size) => {
    // Define rectangle vertices

    const path = [
      [ x - size, y - size ],
      [ x + size, y - size ],
      [ x + size, y + size ],
      [ x - size, y + size ]
    ];
    // Close the path
    path.push(path[0]);
    return path;
  };
  const lines = [];
  for (let i = 0; i < 1135; i++) {
    const size = (i/33);
    // const size = Math.sin(i*0.07)+0.4;

    let cx=Math.random()*width;
    let cy=Math.random()*height;
    lines.push(square(cx, cy, size));

  }
  // Get centre of the print
  const cx = width / 2;
  const cy = height / 2;
  // let i = 0;
  // const count = 16;
  // const lines = [];
  // for (let i = 0; i < count; i++) {
  //   const size = i*0.3;
  //   const margin = 0;
  //   lines.push(square(cx, cy, size));
  //   // lines.push(square(cx, cy, size + margin));
  // }

  return {
    draw,
    print,
    background: 'white'
  };

  function draw () {
    lines.forEach(points => {
      context.beginPath();
      // context.save();
      context.translate(0, 0);
      context.rotate(2);
      points.forEach(p => context.lineTo(p[0], p[1]));

      context.stroke();
      // context.fill();
      // context.restore();
    });
  }

  function print () {
    return polylinesToSVG(lines, {
      dimensions
    });
  }
}
