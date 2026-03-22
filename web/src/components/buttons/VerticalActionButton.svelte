<script lang="ts">
    export let id: string;
    export let click = () => {
        alert("no function assigned");
    };
    export let fill = false;
    export let elevated = false;
    export let ariaLabel = "";
    export let linkHref: string | undefined = undefined;
    export let linkTarget: string | undefined = undefined;
    export let linkRel: string | undefined = undefined;
</script>

{#if linkHref}
    <a
        id="button-{id}"
        class="button vertical"
        class:fill
        class:elevated
        aria-label={ariaLabel}
        href={linkHref}
        target={linkTarget}
        rel={linkRel}
    >
        <slot></slot>
    </a>
{:else}
    <button
        id="button-{id}"
        class="button vertical"
        class:fill
        class:elevated
        on:click={click}
        aria-label={ariaLabel}
    >
        <slot></slot>
    </button>
{/if}

<style>
    .button.vertical {
        flex-direction: column;
        line-height: 1;
        padding: var(--padding);
        gap: calc(var(--padding) / 2);
    }

    .button.vertical :global(svg) {
        width: 24px;
        height: 24px;
    }

    .button.vertical.fill {
        width: 100%;
        padding: var(--padding) 0;
    }

    .button.vertical :global(svg) {
        stroke-width: 1.8px;
        color: var(--secondary);
    }

    a.button.vertical {
        text-decoration: none;
        font-weight: 500;
    }
</style>
