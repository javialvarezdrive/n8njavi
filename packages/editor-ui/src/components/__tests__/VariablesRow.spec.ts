import VariablesRow from '../VariablesRow.vue';
import { EnvironmentVariable } from '@/Interface';
import { fireEvent, render } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';

describe('VariablesRow', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	const stubs = ['n8n-tooltip'];

	const environmentVariable: EnvironmentVariable = {
		id: 1,
		key: 'key',
		value: 'value',
	};

	it('should render correctly', () => {
		const wrapper = render(VariablesRow, {
			props: {
				data: environmentVariable,
			},
			stubs,
		});

		expect(wrapper.html()).toMatchSnapshot();
		expect(wrapper.container.querySelectorAll('td')).toHaveLength(4);
	});

	it('should show edit and delete buttons on hover', async () => {
		const wrapper = render(VariablesRow, {
			props: {
				data: environmentVariable,
			},
			stubs,
		});

		await fireEvent.mouseEnter(wrapper.container);

		expect(wrapper.getByTestId('variable-row-edit-button')).toBeVisible();
		expect(wrapper.getByTestId('variable-row-delete-button')).toBeVisible();
	});

	it('should show key and value inputs in edit mode', async () => {
		const wrapper = render(VariablesRow, {
			props: {
				data: environmentVariable,
				editing: true,
			},
			stubs,
		});

		await fireEvent.mouseEnter(wrapper.container);

		expect(wrapper.getByTestId('variable-row-key-input')).toBeVisible();
		expect(wrapper.getByTestId('variable-row-key-input').querySelector('input')).toHaveValue(
			environmentVariable.key,
		);
		expect(wrapper.getByTestId('variable-row-value-input')).toBeVisible();
		expect(wrapper.getByTestId('variable-row-value-input').querySelector('input')).toHaveValue(
			environmentVariable.value,
		);
	});

	it('should show cancel and save buttons in edit mode', async () => {
		const wrapper = render(VariablesRow, {
			props: {
				data: environmentVariable,
				editing: true,
			},
			stubs,
		});

		await fireEvent.mouseEnter(wrapper.container);

		expect(wrapper.getByTestId('variable-row-cancel-button')).toBeVisible();
		expect(wrapper.getByTestId('variable-row-save-button')).toBeVisible();
	});
});