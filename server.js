const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite'); // Para manipulação de encoding, caso necessário

const app = express();
const PORT = 3000;
const folderPath = path.join("C:\\Users\\David Garcia\\Documents\\Mensageiro");

app.use(cors());

// Endpoint para listar os ficheiros
app.get('/api/files', (req, res) => {
    if (!fs.existsSync(folderPath)) {
        return res.status(404).send('Pasta não encontrada.');
    }

    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.txt'));
    res.json(files);
});

// Endpoint para obter o conteúdo de um ficheiro

// Endpoint para obter o conteúdo de um ficheiro
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(folderPath, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Ficheiro não encontrado.');
    }

    try {
        // Leitura do arquivo com ISO-8859-1 (exemplo) e conversão para UTF-8
        const buffer = fs.readFileSync(filePath);
        const content = iconv.decode(buffer, 'latin1'); // Alterar 'latin1' se necessário
        res.send(content);
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        res.status(500).send('Erro ao ler o ficheiro.');
    }
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
