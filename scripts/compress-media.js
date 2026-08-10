const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const videosDir = path.join(__dirname, '../public/videos');

const compressVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    console.log(`Compressing ${path.basename(inputPath)}...`);
    ffmpeg(inputPath)
      // .outputOptions('-vcodec', 'libx264')
      .outputOptions('-crf', '28') // Higher number = more compression (28 is good for small web videos)
      .outputOptions('-preset', 'fast')
      .size('?x720') // Scale down to 720p maximum height (maintaining aspect ratio)
      .on('end', () => {
        console.log(`Finished compressing ${path.basename(inputPath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error compressing ${path.basename(inputPath)}:`, err);
        reject(err);
      })
      .save(outputPath);
  });
};

const main = async () => {
  try {
    const files = fs.readdirSync(videosDir);
    const mp4Files = files.filter(f => f.endsWith('.mp4') && !f.endsWith('-compressed.mp4'));

    for (const file of mp4Files) {
      const inputPath = path.join(videosDir, file);
      const tempOutputPath = path.join(videosDir, file.replace('.mp4', '-compressed.mp4'));

      await compressVideo(inputPath, tempOutputPath);

      // Backup the original file just in case, or replace it directly.
      // We will replace the original and move the original to a backup folder if we want, 
      // but let's just replace it since we are making a copy in temp first.
      fs.unlinkSync(inputPath); // Remove original
      fs.renameSync(tempOutputPath, inputPath); // Rename compressed to original name
    }

    console.log('All videos compressed successfully!');
  } catch (err) {
    console.error('An error occurred during compression:', err);
  }
};

main();
