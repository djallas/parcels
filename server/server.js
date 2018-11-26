import http from 'http';
import app from './app';


const port = process.env.PORT || 3100;
const server = http.createServer(app);

// Handling exceptions
process.on('uncaughtException', (error) => {
    if (error.code === 'EADDRINUSE') {
     console.log(`Conflict with post ${port}`);
    }
  })

server.listen(port, () => {
    console.log(`Server starts on port: ${port}`)
});
