# recuperacion
PARENTS

1.creacion del worker 
const { Worker } = require('worker_threads');
2.funcion
function sumVectors(vectorA, vectorB) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./child.js', { workerData: { vectorA, vectorB } });
        worker.on('message', (result) => resolve(result));

CHILD 

1.funcion 
function sumVectors(vectorA, vectorB) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./child.js', { workerData: { vectorA, vectorB } });

        worker.on('message', (result) => resolve(result));
 
        worker.on('error', (error) => reject(error));
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker finalizado con código ${code}`));
            }
        });
    });
}
2.uso
const vectorA = [2, 3, 5];
const vectorB = [1, 3, 2];

sumVectors(vectorA, vectorB)
    .then(result => console.log('Resultado de la suma:', result))
    .catch(err => console.error('Error:', err));
3.worker
const { parentPort, workerData } = require('worker_threads');

const { vectorA, vectorB } = workerData;

if (vectorA.length !== vectorB.length) {
    throw new Error('Los vectores deben tener la misma longitud.');
}

const result = vectorA.map((value, index) => value + vectorB[index]);

parentPort.postMessage(result);
