# Pasos para correr la aplicación

## Backend
Se debe ingresar a la carpeta backend y correr el comando

### `node server.js`

El server escuchara por el puerto 8080
Open [http://localhost:8080](http://localhost:8080/)

## Frontend
Se debe ingresar a la carpeta frontend y correr el comando

### `npm start`
El front escuchara por el puerto 3000
Open [http://localhost:3000](http://localhost:3000/)

### `Base de datos`

**Nota: Se debe correr el script de base de datos antes de iniciar la aplicación, no se necesita crear la tabla de pacientes ya que al momento de iniciar el backend, este automaticamente la crea vacia, el usuario de base de datos es root y no tiene password, path de backend backend\app\config\db.config.js**


---

 CREATE DATABASE IF NOT EXISTS `vitalbox` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
 
---



