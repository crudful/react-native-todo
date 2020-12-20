import 'react-native';
import React from 'react';
import TaskDialog from '../src/components/TaskDialog';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<TaskDialog />);
});
