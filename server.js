const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  const info = await ytdl.getInfo(videoURL);
  const title = info.videoDetails.title;

  res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
  ytdl(videoURL, { quality: 'highestvideo' }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});