import { promises as fs } from 'fs';
import { getRecentlyPlayed } from './spotify.js';
import { PLACEHOLDERS } from './constants.js';

getRecentlyPlayed().then((track) => {
    return track;
});

const generateSpotifyHTML = (track) => {
    const { title, artist, image } = track;
    return `
        <a href="https://open.spotify.com/track/${track.id}">
            <img src="${image}" width="22" height="22" />
            <h4>${title}</h4>
            <span>${artist}</span>
        </a>
    `;
};

(async () => {
    const [readmeTemplate, recentlyPlayed] = await Promise.all([
        fs.readFile('./src/README.md.tpl', 'utf-8'),
        getRecentlyPlayed(),
    ]);

    const newMarkdown = readmeTemplate
        .replace(PLACEHOLDERS.RECENTLY_PLAYED, generateSpotifyHTML(recentlyPlayed));

    await fs.writeFile('README.md', newMarkdown);
})();