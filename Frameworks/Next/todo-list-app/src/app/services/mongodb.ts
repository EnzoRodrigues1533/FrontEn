// escrevendo o MongoDB de forma segura e reutilizavel (aramzenamento de cache)

//convert String para URL (URI)
const MongoUri = process.env.DATABASE_URL;

//verificar se existe um endereço URL
if(!MongoUri) { //verificando a nulidade da variavel
    throw new Error("Defina o DATABASE_URL no .env.local")
}