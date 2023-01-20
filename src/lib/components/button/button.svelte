<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	export let variant: 'primary' | 'secondary' = 'primary';

	const className = classNames(
		theme.padding.formElement,
		theme.font.formElement,
		theme.text.formElement,
		theme.rounded,
		theme.activeState,
		theme.inactiveState.button,
		theme.border,
		{
			'bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-700': variant === 'primary',
			'bg-transparent text-indigo-600 hover:bg-indigo-50 focus:bg-indigo-50':
				variant === 'secondary'
		}
	);
</script>

<button class={className}><slot /></button>
