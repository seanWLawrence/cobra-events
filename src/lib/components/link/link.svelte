<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	export let href: string;

	export const className = classNames(
		theme.activeState,
		theme.font.body,
		theme.text.body,
		theme.textColor.primary,
		'underline-offset-8',
		'underline'
	);
</script>

<a {...$$restProps} {href} class={className}><slot /></a>
