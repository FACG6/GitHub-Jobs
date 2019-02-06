const fs = require('fs');
const path = require('path');
const {makeRequest } = require('./makeRequest');

const handleHome = (req, res) => {
    const endpoint = req.url;
    const pathFile = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(pathFile, (err, file) => {
        if (err) {
            handleServerError(req, res)
        } else {
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.end(file);
        }
    })
}

const handleStatics = (req, res) => {
    const endpoint = req.url;
    const conteType = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        png: 'image/png',
        jpg: 'image/jpg',
        ico: 'image/x-icon',
        json: 'application/json'
    }
    const extention = path.extname(endpoint).split('.')[1];
    const filesPath = path.join(__dirname, '..', ...endpoint.split('/'))
    fs.readFile(filesPath, (err, file) => {
        if (err) {
            handleServerError(req, res);
            return;
        }
        res.writeHead(200, {
            'content-type': conteType[extention]
        })
        res.end(file);
    })
}

const handleSearch = (req, res) => {
    let data = '';
    req.on('data', (chunck) => {
        data += chunck;
    })
    req.on('end', () => {
        makeRequest(data, (err, json) => {
            if (err) {
                res.writeHead(500, {
                    'content-type': 'text/plain'
                });
                res.end(err);
            } else {
                res.writeHead(200, {
                    'content-type': 'application/json'
                })
                res.end(json);
            }
        });
    })
}

const handleNotFoundPage = (req, res) => {
    const notFoundPath = path.join(__dirname, '..', 'public', 'html', 'pageNotFound.html')
    fs.readFile(notFoundPath, (err, notFoundFile) => {
        if (err) {
            handleServerError(req, res);
            return;
        }
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end(notFoundFile);
    })

}

const handleServerError = (req, res) => {
    const internalServerPath = path.join(__dirname, '..', 'public', 'html', 'internalServerError.html');
    fs.readFile(internalServerPath, (err, serverfile) => {
        if (err) {
            res.writeHead(500, {
                'content-type': 'text/html'
            });
            res.end('<h1>Internal Server Error</h1>')
        } else {
            res.writeHead(500, {
                'content-type': 'text/html'
            });
            res.end(serverfile);
        }
    })


}


module.exports = {
    handleHome,
    handleStatics,
    handleSearch,
    handleNotFoundPage,
    handleServerError
}