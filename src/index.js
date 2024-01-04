import { promises as fs } from 'fs';
import { getRecentlyPlayed } from './spotify.js';
import { PLACEHOLDERS } from './constants.js';

getRecentlyPlayed().then((track) => {
    return track;
});

const generateSpotifyHTML = ({ title, artist, image, url }) =>
`<a href="${url}">
    <img src="${image}" width="22" height="22" />
    <h4>${title}</h4>
    <span>${artist}</span>
</a>`;


(async () => {
    const [readmeTemplate, recentlyPlayed] = await Promise.all([
        fs.readFile('./src/README.md.tpl', 'utf-8'),
        getRecentlyPlayed(),
    ]);

    const getInfoTrack = () => {
        const { title, artist, image, url } = recentlyPlayed;
        return generateSpotifyHTML({ title, artist, image, url });
    };

    const newMarkdown = readmeTemplate
        .replace(PLACEHOLDERS.RECENTLY_PLAYED, getInfoTrack());

    await fs.writeFile('README.md', newMarkdown);
})();
