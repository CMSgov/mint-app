import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import './i18n';

configure({ adapter: new Adapter() });

// Fill in some missing functions that aren't shimmed by jsdom.
window.URL.createObjectURL = vi.fn();
