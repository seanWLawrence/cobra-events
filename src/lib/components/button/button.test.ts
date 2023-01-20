import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import Button from './button.test.svelte';

test('default matches snapshot', () => {
	const name = 'some name';

	render(Button, { text: name });
	const button = screen.getByRole('button', { name });

	expect(button).toMatchSnapshot();
});

test('primary matches snapshot', () => {
	const name = 'some name';

	render(Button, { variant: 'primary', text: name });
	const button = screen.getByRole('button', { name });

	expect(button).toMatchSnapshot();
});

test('secondary matches snapshot', () => {
	const name = 'some name';

	render(Button, { variant: 'secondary', text: name });
	const button = screen.getByRole('button', { name });

	expect(button).toMatchSnapshot();
});
