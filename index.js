import express from "express";
import { getvidsrc } from "./src/vidsrcpro.js";
import { getasiaheroku } from "./src/asiaheroku.js";

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the unofficial vidsrcPro provider",
        routes: {
            movie: "/vidsrc/:movieTMDBid",
            show: "/vidsrc/:showTMDBid?s=seasonNumber&e=episodeNumber"
        },
        author: "This API is developed and created by Inside4ndroid Studios"
    });
});

app.get('/vidsrc/:tmdbId', async (req, res) => {
    const id = req.params.tmdbId;
    const season = req.query.s;
    const episode = req.query.e;

    try {
        const vidsrcresponse = season && episode ? 
            await getvidsrc(id, season, episode) : 
            await getvidsrc(id);
        
        res.status(200).json(vidsrcresponse);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/asiaheroku/:tmdbId', async (req, res) => {
    const id = req.params.tmdbId;
    const season = req.query.s;
    const episode = req.query.e;

    try {
        const srcresponse = season && episode ? 
            await getasiaheroku(id, season, episode) : 
            await getasiaheroku(id);
        
        res.status(200).json(srcresponse);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Export the app for Vercel to use
export default app;
