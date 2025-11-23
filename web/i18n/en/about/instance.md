<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="about">
<SectionHeading
    title={$t("about.heading.instance_about")}
    sectionId="about"
/>

this cobalt instances is hosted by the [canine.tools project](https://canine.tools/).
</section>

<section id="services">
<SectionHeading
    title={$t("about.heading.instance_services")}
    sectionId="services"
/>

we use a vpn for all outbound requests.

thank you to [patrick](https://patriick.dev/) for helping with youtube support. because of them, they were able to get youtube support for us a few times back up!
</section>

<section id="apikeys">
<SectionHeading
    title={$t("about.heading.instance_apikeys")}
    sectionId="apikeys"
/>

we offer api keys for developers to use. keys are given by request once we approved your usage. they can be revoked at anytime without warning.

if you want an api key, please email [hyper@canine.tools](mailto:hyper@canine.tools) ([PGP key](https://canine.tools/assets/hyper@canine.tools.asc)). please email for a key, do not contact the maintainer via other methods or they will be ignored.

when you request an api key, please include the following:

* the purpose of using our cobalt instance
* ips and user agents your program uses
* how often your program will use the api roughly

furthermore, here are some general rules. all rules from [canine.tools terms](https://canine.tools/terms/) also apply here.

* mass downloading of media is okay
* no commercial use. this includes requiring to pay to use your program, access to downloading media must be free. this also means no ads.
* no downloading media for ai training

we don't generally monitor requests, but we may contact you if we see anything suspicious.

</section>

<section id="fork">
<SectionHeading
    title={$t("about.heading.instance_fork")}
    sectionId="fork"
/>

our instance (web and api) is running a fork of the main cobalt codebase. it's licensed under the same license. you can find all changes on [our repository](https://git.canine.tools/canine.tools/cobalt).

* [api license](https://git.canine.tools/canine.tools/cobalt/src/branch/main/api#license)
* [web license](https://git.canine.tools/canine.tools/cobalt/src/branch/main/web#license)

</section>