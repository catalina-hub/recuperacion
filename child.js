const { Worker } = require('worker_threads');
function sumVectors(vectorA, vectorB) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./child.js', { workerData: { vectorA, vectorB } })
        worker.on('message', (result) => resolve(result));
 
        worker.on('error', (error) => reject(error));
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker finalizado ${code}`));
            }
        });
    });
}

sumVectors(vectorA, vectorB)
    .then(result => console.log('Resultado de la suma:', result))
    .catch(err => console.error('Error:', err));
 
const { parentPort, workerData } = require('worker_threads');

const { vectorA, vectorB } = workerData;
 
if (vectorA.length !== vectorB.length) {
    throw new Error('Los vectores deben tener la misma longitud.');
}
 
const result = vectorA.map((value, index) => value + vectorB[index]);
 
parentPort.postMessage(result);
 
 
