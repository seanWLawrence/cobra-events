<script lang="ts">
	import classNames from 'classnames';

	import * as theme from '$lib/theme';

	export let size: 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' = '3xl';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

	export const className = classNames(theme.font.heading, {
		'text-3xl': size === 's',
		'text-4xl': size === 'm',
		'text-5xl': size === 'l',
		'text-6xl': size === 'xl',
		'text-7xl': size === '2xl',
		'text-8xl': size === '3xl'
	});
</script>

{#if as === 'h1'}
	<h1 class={className}><slot /></h1>
{:else if as === 'h2'}
	<h2 class={className}><slot /></h2>
{:else if as === 'h3'}
	<h3 class={className}><slot /></h3>
{:else if as === 'h4'}
	<h4 class={className}><slot /></h4>
{:else if as === 'h5'}
	<h5 class={className}><slot /></h5>
{:else if as === 'h6'}
	<h6 class={className}><slot /></h6>
{/if}
