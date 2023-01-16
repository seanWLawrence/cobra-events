<script lang="ts">
	/**
	 * Sets a flexbox row or column around its children and adds a
	 * gap between
	 *
	 * Note: Tailwind CSS will not work with meta programming. That's why
	 * the classnames are written out all the way like this instead of
	 * dynamically creating them
	 */
	import classNames from 'classnames';

	export let size: 'none' | 's' | 'm' | 'l' | 'xl';
	export let direction: 'vertical' | 'horizontal';

	const isVertical = direction === 'vertical';

	const className = classNames('flex', {
		// horizotal styles
		'flex-row': !isVertical,
		'gap-x-0': !isVertical && size === 'none',
		'gap-x-2': !isVertical && size === 's',
		'gap-x-4': !isVertical && size === 'm',
		'gap-x-6': !isVertical && size === 'l',
		'gap-x-8': !isVertical && size === 'xl',

		// vertical styles
		'flex-col': isVertical,
		'gap-y-0': isVertical && size === 'none',
		'gap-y-2': isVertical && size === 's',
		'gap-y-4': isVertical && size === 'm',
		'gap-y-6': isVertical && size === 'l',
		'gap-y-8': isVertical && size === 'xl'
	});
</script>

<div class={className}><slot /></div>
