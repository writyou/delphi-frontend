import * as React from 'react';

import { Typography } from 'components';
import { SwitchInput } from 'components/inputs';
import { RadioButton } from 'components/inputs/RadioButton/RadioButton';

export function DemoPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page for developers
        <SwitchInput />
        <RadioButton />
      </Typography>
    </div>
  );
}
