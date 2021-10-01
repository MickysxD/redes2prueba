CREATE DATABASE db_redes_pr2;

USE db_redes_pr2;

CREATE TABLE REPORTE(
    id_reporte INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    carnet  VARCHAR(10) ,
    nombre  VARCHAR(250) ,
    curso   VARCHAR(250) ,
    cuerpo  VARCHAR(250) ,
    obtenido_por VARCHAR(25),
    fecha   datetime 
);

--SELECT * FROM REPORTE;