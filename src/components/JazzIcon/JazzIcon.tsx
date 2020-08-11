import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import MersenneTwister from 'mersennetwister';
import { jsNumberForAddress } from 'react-jazzicon';
import Color from 'color';

import { makeStyles } from 'utils/styles';

const colors = [
  '#01888c', // teal
  '#fc7500', // bright orange
  '#034f5d', // dark teal
  '#f73f01', // orangered
  '#fc1960', // magenta
  '#c7144c', // raspberry
  '#f3c100', // goldenrod
  '#1598f2', // lightning blue
  '#2465e1', // sail blue
  '#f19e02', // gold
];

const shapeCount = 4;
const diameter = 40;
const wobble = 30;

type Props = React.ComponentProps<typeof SvgIcon> & {
  seed: number;
};

function JazzIcon(props: Props) {
  const { seed } = props;
  const classes = useStyles();

  const generator = new MersenneTwister(seed);
  const shapesArr = Array(shapeCount).fill('');

  const genColor = () => {
    const idx = Math.floor(remainingColors.length * generator.random());
    const color = remainingColors.splice(idx, 1)[0];
    return color;
  };

  const hueShift = () => {
    const amount = generator.random() * 30 - wobble / 2;
    return colors.map(hex => {
      const color = new Color(hex);
      color.rotate(amount);
      return color.hex();
    });
  };

  const remainingColors = hueShift();

  const genShape = (i: number, total: number) => {
    const center = diameter / 2;
    const firstRot = generator.random();
    const angle = Math.PI * 2 * firstRot;
    const velocity = (diameter / total) * generator.random() + (i * diameter) / total;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    const translate = `translate(${tx} ${ty})`;

    const secondRot = generator.random();
    const rot = firstRot * 360 + secondRot * 180;
    const rotate = `rotate(${rot.toFixed(1)} ${center} ${center})`;
    const transform = `${translate} ${rotate}`;

    return (
      <rect
        key={i}
        x="0"
        y="0"
        rx="0"
        ry="0"
        height={diameter}
        width={diameter}
        transform={transform}
        fill={genColor()}
      />
    );
  };

  return (
    <SvgIcon {...props} viewBox="0 0 40 40" x="0" y="0" className={classes.root}>
      {shapesArr.map((_, i) => genShape(i, shapeCount - 1))}
    </SvgIcon>
  );
}

const useStyles = makeStyles(
  {
    root: {
      fontSize: 'inherit',
    },
  },
  { name: 'JazzIcon' },
);

export { JazzIcon, jsNumberForAddress };
