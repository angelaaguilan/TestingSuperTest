const request = require("supertest");
const server = require("../index.js");

describe("Operaciones CRUD de cafes", () => {

    // 1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
    it("GET - Consulta ID Café existente - Cod 200", async () => {
        const { body, status } = await request(server).get('/cafes/2').send();
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    });
    
    // 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe
    it("DELETE - Elimina ID Café no existente - Cod 404", async () => {
        const jwt = "token";
        const idCafeDelete = 20;
        const response = await request(server).delete(`/cafes/${idCafeDelete}`).set("Authorization", jwt).send();
        const status = response.statusCode;
        expect(status).toBe(404);
    });

    // 3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    it("POST - Registra ID Cafe exitoso - Cod 201", async () => {
        const cafe = { "id": 5, "nombre": "Mocca" };
        const { body } = await request(server).post('/cafes').send(cafe);
        expect(body).toContainEqual(cafe);
    });


    // 4. Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
    it("PUT - Actualiza ID no existente - Cod 400", async () => {
        const response = await request(server).put('/cafes/20').send();
        const status = response.statusCode;
        expect(status).toBe(400);
    });
    
});
