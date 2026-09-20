// Opcional: ejecuta `node servidor-local.cjs` para probar la PWA en localhost.
// Sirve solo esta carpeta; no almacena datos ni constituye un backend.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = 8000;
const prefix = '/mi-horario/';
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
const server = http.createServer((request,response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname); }
  catch { response.writeHead(400).end('Solicitud inválida'); return; }
  if(!pathname.startsWith(prefix)){response.writeHead(302,{Location:prefix}).end();return;}
  const file = path.resolve(root,pathname.slice(prefix.length)||'index.html');
  if(!file.startsWith(root+path.sep)||!['.html','.js','.css','.json','.png','.svg'].includes(path.extname(file))){response.writeHead(403).end('No disponible');return;}
  fs.readFile(file,(error,data)=>{
    if(error){response.writeHead(404).end('Archivo no encontrado');return;}
    response.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-cache'}).end(data);
  });
});
server.on('error',error=>{console.error('No se pudo iniciar el servidor:',error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Abre http://localhost:${port}${prefix} (Ctrl+C para detener).`));
