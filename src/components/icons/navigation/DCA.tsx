import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useTheme } from 'utils/styles';

function DCA(props: React.ComponentProps<typeof SvgIcon>) {
  const { color } = props;
  const withGradient = color !== 'inherit';
  const theme = useTheme();

  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {withGradient && theme.gradients.main.svgLinear('DCAIconGradient')}
      <g fill="none" fillRule="evenodd">
        {withGradient ? (
          <g fill="url(#DCAIconGradient)" fillRule="nonzero">
            <path d="M12.26 16.473c.228 0 .395-.167.395-.404v-.677c1.398-.14 2.215-.94 2.215-2.17 0-.915-.554-1.618-1.406-1.873.606-.29 1.037-.949 1.037-1.652 0-1.028-.712-1.767-1.846-1.925v-.676c0-.238-.167-.396-.395-.396-.22 0-.396.158-.396.396v.641h-.536v-.641c0-.238-.167-.396-.395-.396-.229 0-.396.158-.396.396v.641h-.36c-.405 0-.677.273-.677.686v6.31c0 .413.264.677.677.677h.36v.66c0 .236.167.403.396.403.228 0 .395-.167.395-.404v-.659h.536v.66c0 .236.176.403.396.403zm-.484-5.51h-1.142V8.739h1.37c.871 0 1.363.378 1.363 1.064 0 .747-.562 1.168-1.59 1.16zm-1.142 3.445v-2.452h1.362c1.143 0 1.74.413 1.74 1.222 0 .8-.571 1.212-1.652 1.221l-1.45.009z" />
            <path d="M20.672 14.217l2.031-2.9c.332-.46.176-.87-.41-.87h-1.328C20.515 5.75 16.492 2 11.687 2c-2.822 0-5.37 1.299-7.09 3.32-.292.332-.253.752.06.977.312.215.683.156.946-.147 1.455-1.718 3.643-2.802 6.084-2.802 4.131 0 7.49 3.095 7.92 7.1h-1.484c-.586 0-.742.41-.42.859l2.031 2.91c.274.38.664.38.938 0zm-8.985 6.426c2.832 0 5.381-1.309 7.09-3.33.293-.333.254-.762-.049-.977-.312-.225-.693-.147-.947.146-1.455 1.729-3.642 2.813-6.094 2.813-4.13 0-7.49-3.096-7.92-7.1h1.485c.576 0 .742-.41.42-.869l-2.032-2.9c-.273-.381-.664-.381-.937 0l-2.031 2.9c-.332.46-.176.87.41.87H2.41c.45 4.697 4.473 8.447 9.277 8.447z" />
          </g>
        ) : (
          <g fill="currentColor" fillRule="nonzero">
            <path
              d="M11.634 14.623c.175 0 .322-.137.322-.342v-.84c1.523-.117 2.422-.947 2.422-2.216 0-.987-.625-1.72-1.543-2.002.703-.323 1.152-1.016 1.152-1.797 0-1.094-.8-1.885-2.031-2.022v-.771c0-.205-.147-.342-.322-.342-.186 0-.342.137-.342.342v.752h-.625v-.752c0-.205-.147-.342-.322-.342-.186 0-.342.137-.342.342v.752h-.655c-.283 0-.488.195-.488.488v7.1c0 .293.205.478.488.478h.655v.83c0 .205.156.342.342.342.175 0 .322-.137.322-.342v-.83h.625v.83c0 .205.156.342.342.342zM11.31 8.93l-1.66-.01V6.117h1.807c1.045 0 1.699.508 1.699 1.348 0 .918-.703 1.465-1.846 1.465zm.225 3.779H9.65V9.672h1.778c1.367 0 2.148.547 2.148 1.523 0 .957-.752 1.504-2.041 1.514z"
              transform="translate(.64 2.209)"
            />
            <path
              d="M19.923 12.002l1.972-2.822c.284-.39.137-.713-.332-.713h-1.416C19.796 3.76 15.811 0 11.017 0c-2.833 0-5.381 1.318-7.07 3.379-.206.244-.177.547.048.713.225.156.508.107.693-.108C6.182 2.148 8.468.977 11.016.977c4.288 0 7.793 3.29 8.145 7.49H17.5c-.46 0-.606.322-.332.713l1.982 2.822c.225.322.537.322.772 0zm-8.907 6.299c2.852 0 5.4-1.319 7.08-3.38.206-.243.176-.546-.048-.712-.225-.166-.508-.117-.684.107-1.494 1.836-3.78 3.008-6.348 3.008-4.287 0-7.793-3.29-8.134-7.49h1.66c.459 0 .605-.322.332-.703L2.89 6.299c-.224-.322-.546-.322-.771 0L.137 9.12c-.273.39-.126.713.333.713h1.425c.352 4.707 4.336 8.467 9.121 8.467z"
              transform="translate(.64 2.209)"
            />
          </g>
        )}
      </g>
    </SvgIcon>
  );
}

export { DCA };