<script>
    import { t } from "$lib/i18n/translations";
    import { onMount, tick } from "svelte";
    import { get } from "svelte/store";
    import dialogs, { createDialog } from "$lib/state/dialogs";

    import Omnibox from "$components/save/Omnibox.svelte";
    import Meowbalt from "$components/misc/Meowbalt.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";

    onMount(async () => {
        await tick();
        setTimeout(() => {
            if (get(dialogs).length === 0) {
                createDialog({
                    id: "download-notice",
                    type: "small",
                    meowbalt: "question",
                    buttons: [
                        {
                            text: get(t)("button.sad_okay"),
                            main: false,
                            action: () => { },
                        },
                        {
                            text: get(t)("button.see_why"),
                            main: false,
                            action: () => {
                                window.open("https://canine.tools/blog/2025/09/22/notice-about-cobalt-shutting-down/", "_blank", "noopener");
                            }
                        },
                    ],
                    bodyText:
                        get(t)("general.closing_warning")
                });
            }
        }, 0);
    });
</script>

<svelte:head>
    <title>{$t("general.cobalt")}</title>
    <meta property="og:title" content={$t("general.cobalt")} />
</svelte:head>

<div id="cobalt-save-container" class="center-column-container">
    <SupportedServices />
    <main
        id="cobalt-save"
        tabindex="-1"
        data-first-focus
    >
        <Meowbalt emotion="caninetools" />
        <Omnibox />
    </main>
    <div id="terms-note">
        {$t("save.terms.note.agreement")}
        <a href="/about/terms">{$t("save.terms.note.link")}</a>
    </div>
</div>

<style>
    #cobalt-save-container {
        padding: var(--padding);
        overflow: hidden;
    }

    #cobalt-save {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 15px;
    }

    #terms-note {
        bottom: 0;
        color: var(--gray);
        font-size: 12px;
        text-align: center;
        padding-bottom: 6px;
        font-weight: 500;
    }

    @media screen and (max-width: 535px) {
        #cobalt-save-container {
            padding-top: calc(var(--padding) / 2);
        }

        #terms-note {
            font-size: 11px;
            padding-bottom: 0;
        }
    }
</style>
