<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	const className = classNames(
		theme.font.formElement,
		theme.border,
		theme.activeState,
		theme.padding.formElement,
		theme.rounded,
		theme.text.formElement,
		'max-w-lg'
	);
</script>

<input class={className} {...$$restProps} />
