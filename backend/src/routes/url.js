import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

const router = express.Router();

router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const shortCode = nanoid(7);
    const url = new Url({ originalUrl, shortCode });
    await url.save();
    res.json({
      originalUrl: url.originalUrl,
      shortUrl: '/api/' + url.shortCode,
      shortCode: url.shortCode,
      clicks: url.clicks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }).limit(10);
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;