import { addDecorator, configure } from '@storybook/react';

import StylesDecorator from './styles-decorator';

addDecorator(StylesDecorator);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx$/), module);
