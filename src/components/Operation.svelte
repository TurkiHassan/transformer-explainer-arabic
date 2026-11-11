<script lang="ts">
	import classNames from 'classnames';
	import { Popover } from 'flowbite-svelte';
	import { vectorHeight, expandedBlock } from '~/store';
	import { onMount } from 'svelte';

	export let id: string | undefined = undefined;
	export let className: string | undefined = undefined;
	export let type: string | undefined = undefined;
	export let head: boolean = false;
	export let tail: boolean = false;
	export let active: boolean = false;

	let width = 50;
	let textElement: SVGTextElement;
	let textBBox: DOMRect;

	onMount(() => {
		if (textElement) {
			textBBox = textElement.getBBox();
		}
	});
</script>

{#if type === 'activation'}
	<div class={classNames(`cell activation`, className)} class:active>
		<div class="cursor"></div>
		<svg class="main">
			<!-- <path class="line" d={`M 0 0 L 10 0 L 20 -20`} style={'transform:translateY(50%)'}></path> -->
			<path class="line line1" d={`M0,0 L0,${$vectorHeight * 3.1 - 3}`}></path>
			<!-- <path class="line line2" d={`M0,0 L0,40%`}></path> -->
			<circle class="icon" cx="50%" cy="50%" r="3"></circle>
		</svg>
		{#if head}
			<div class="guide">
				<!-- <svg>
					<path d="M0,0 Q0,-16 30,-16"></path>
				</svg> -->
				<div class="guide-text gelu-text">GeLU (تنشيط)</div>
			</div>
		{/if}
	</div>
{:else if type === 'dropout'}
	<div class={classNames(`cell dropout`, className)} class:active>
		<div class="cursor"></div>
		<svg class="main">
			<path class="line" d={`M0,0 L0,${$vectorHeight}`}></path>
			<circle class="icon" cx="50%" cy="50%" r="3"></circle>
		</svg>
		{#if tail}
			<div class="guide">
				<svg width="20px">
					<path d="M0,50 Q0,0 24,0"></path>
				</svg>
				<div class="guide-text dropout-text">Dropout (إسقاط)</div>
			</div>
		{/if}
	</div>
{:else if type === 'ln'}
	<div class={classNames(`cell ln`, className)} class:active>
		<div class="cursor"></div>
		<svg class="main">
			<circle class="icon" cx="50%" cy="50%" r="3"></circle>
			<path
				class="line"
				d={`
     M 0 0
    C 0 ${$vectorHeight * 0.25}, ${$vectorHeight * 0.2} ${$vectorHeight * 0.25}, ${$vectorHeight * 0.2} ${$vectorHeight * 0.5}
    C ${$vectorHeight * 0.2} ${$vectorHeight * 0.75}, 0 ${$vectorHeight * 0.75}, 0 ${$vectorHeight}
  `}
			/>
		</svg>
		{#if tail}
			<div class="guide">
				<svg width="20px">
					<path d="M0,50 Q0,0 24,0"></path>
				</svg>
				<div class="guide-text ln-text">Layer Normalization (تطبيع)</div>
			</div>
		{/if}
	</div>
{:else if type === 'residual-start'}
	<div class={classNames(`residual residual-start cell`, className)} class:active>
		<div class="cursor"></div>
		{#if head}
			<div class="guide-text residual-text">Residual (تخطي)</div>
		{/if}
		<svg class="main">
			{#if head}<path {id} class="head" d="M0,0 Q0,-16 30,-16"></path>{/if}
			<path d={`M0,0 L0,${$vectorHeight}`}></path>
		</svg>
	</div>
{:else if type === 'residual-end'}
	<div class={classNames(`residual residual-end cell`, className)} class:active>
		<div class="cursor"></div>
		<svg class="main">
			{#if head}<path {id} class="head" d="M0,0 Q0,-16 -30,-16"></path>
				<!-- <text x="-30" y="-20" text-anchor="end">Residual</text> -->
			{/if}
			<path d={`M0,0 L0,${$vectorHeight}`}></path>
		</svg>
	</div>
{/if}

<style lang="scss">
	.activation,
	.residual,
	.dropout,
	.ln {
		position: relative;
		width: 1.2rem;
		flex-shrink: 0;
		z-index: $OPERATION_INDEX;
		// height: var(--vector-height);

		.cursor {
			height: 100%;
			position: absolute;
			left: 50%;
		}
		svg.main {
			height: 100%;
			width: 100%;
			overflow: visible;
		}
		svg path {
			transform: translateX(50%);
		}
		svg .icon {
			fill: theme('colors.gray.300');
			opacity: 0.6;
		}
		.icon {
			opacity: 1;
			transition: opacity 0.3s;
		}
		.line {
			opacity: 0;
			transition: opacity 0.3s;
		}

		&.active {
			.icon {
				opacity: 0;
			}
			.line {
				opacity: 1;
			}
			.guide {
				opacity: 1;
			}
		}
	}

	.dropout {
		path {
			stroke: theme('colors.gray.400');
			stroke-dasharray: 2, 2;
			fill: none;
			stroke-width: 2;
		}
	}
	.residual {
		width: 0.5rem;

		path {
			stroke: theme('colors.gray.400');
			fill: none;
			stroke-width: 1;
		}
		.head {
			stroke: theme('colors.gray.400');
		}
		.residual-text {
			position: absolute;
			top: -2.2rem;
			left: 4rem;
			transform: translateX(-50%);
			font-size: 0.9rem;
			color: theme('colors.gray.400');
			white-space: nowrap;
		}
	}
	.ln {
		path {
			stroke: theme('colors.gray.400');
			fill: none;
			stroke-width: 1;
		}
	}
	.activation {
		path {
			stroke: theme('colors.gray.400');
			fill: none;
			stroke-dasharray: 2, 4;
			fill: none;
			stroke-width: 2;
		}

		.guide {
			// background-color: red;
			height: 100%;
			width: 100%;
			top: 0;
			transform: translate(0, 0);
			.guide-text {
				top: 50%;
				transform: translate(0, -50%);
				opacity: 1;
			}
		}
	}

	.guide {
		position: absolute;
		top: calc(100% - 10px);
		left: 0;
		transition: opacity 0.5s;
		transform: translateX(calc(-100% - 5px));
		opacity: 0;

		svg {
			width: 100%;
			height: 100%;
			overflow: visible;
		}
		.guide-text {
			position: absolute;
			top: 50px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.9rem;
			color: theme('colors.gray.400');
			white-space: nowrap;
		}

		path {
			stroke: theme('colors.gray.400');
			fill: none;
			stroke-width: 1;
			stroke-dasharray: none;
		}
	}
</style>
