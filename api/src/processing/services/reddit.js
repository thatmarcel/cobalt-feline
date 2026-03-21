import { resolveRedirectingURL } from "../url.js";
import { genericUserAgent, env } from "../../config.js";
import { createStream } from "../../stream/manage.js";
import { request } from "undici";

export default async function(obj) {
    let params = obj;
    const headers = {
        'user-agent': genericUserAgent,
        accept: 'application/json'
    };

    if (params.shortId) {
        params = await resolveRedirectingURL(
            `https://www.reddit.com/video/${params.shortId}`,
            obj.dispatcher, headers
        );
    }

    if (params.mediaURL) {
        const decodedMediaURL = params.mediaURL.startsWith("https%3A%2F%2F")
            ? decodeURIComponent(params.mediaURL)
            : params.mediaURL;

        if (decodedMediaURL.startsWith("https://i.redd.it/")) {
            return {
                typeId: "proxy",
                isPhoto: true,
                urls: decodedMediaURL,
                filename: `reddit_${decodedMediaURL.replace("https://i.redd.it/", "")}`,
            }
        }

        return { error: "fetch.fail" }
    }

    if (!params.id && params.shareId) {
        params = await resolveRedirectingURL(
            `https://www.reddit.com/r/${params.sub}/s/${params.shareId}`,
            obj.dispatcher, headers
        );
    }

    if (!params?.id) return { error: "fetch.short_link" };

    const url = new URL(`https://old.reddit.com/r/${params.sub}/comments/${params.id}.json`);

    let data = await request(
        url,
        {
            headers,
            dispatcher: obj.dispatcher
        }
    ).then(r => r.body.json()).catch(e => console.log(e));

    if (!data || !Array.isArray(data)) {
        return { error: "fetch.fail" }
    }

    data = data[0]?.data?.children[0]?.data;

    let sourceId;
    if (params.sub || params.user) {
        sourceId = `${String(params.sub || params.user).toLowerCase()}_${params.id}`;
    } else {
        sourceId = params.id;
    }

    if (!data?.secure_media?.reddit_video) {
        if (data?.url?.startsWith("https://i.redd.it")) {
            return {
                typeId: "proxy",
                isPhoto: true,
                urls: data.url,
                filename: `reddit_${sourceId}.${data.url.split(".").slice(-1)[0]}`,
            }
        }

        if (data?.media_metadata) {
            const mediaMetadataEntries = Object.entries(data.media_metadata);

            const picker = mediaMetadataEntries.map(([mediaId, mediaInfo], mediaIndex) => {
                const mediaFileExtension = mediaInfo.m.split("/")[1];

                const proxiedURL = createStream({
                    service: "reddit",
                    type: "proxy",
                    url: `https://i.redd.it/${mediaId}.${mediaFileExtension}`,
                    filename: `reddit_${sourceId}_${mediaIndex + 1}.${mediaFileExtension}`
                });

                return {
                    type: "photo",
                    url: proxiedURL,
                    thumb: proxiedURL
                }
            });

            return {
                picker
            }
        }

        return { error: "fetch.empty" }
    }

    if (data.secure_media?.reddit_video?.duration > env.durationLimit)
        return { error: "content.too_long" };

    const video = data.secure_media?.reddit_video?.fallback_url?.split('?')[0];

    let audio = false,
        audioFileLink = `${data.secure_media?.reddit_video?.fallback_url?.split('DASH')[0]}audio`;

    if (video.match('.mp4')) {
        audioFileLink = `${video.split('_')[0]}_audio.mp4`
    }

    // test the existence of audio
    await request(audioFileLink, { method: "HEAD", dispatcher: obj.dispatcher }).then(r => {
        if (Number(r.statusCode) === 200) {
            audio = true
        }
    }).catch(() => {})

    // fallback for videos with variable audio quality
    if (!audio) {
        audioFileLink = `${video.split('_')[0]}_AUDIO_128.mp4`
        await request(audioFileLink, { method: "HEAD", dispatcher: obj.dispatcher }).then(r => {
            if (Number(r.statusCode) === 200) {
                audio = true
            }
        }).catch(() => {})
    }

    if (!audio) return {
        typeId: "redirect",
        urls: video
    }

    return {
        typeId: "tunnel",
        type: "merge",
        urls: [video, audioFileLink],
        audioFilename: `reddit_${sourceId}_audio`,
        filename: `reddit_${sourceId}.mp4`
    }
}
