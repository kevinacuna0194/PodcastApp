const { src, dest, watch } = require('gulp'); /** node_modules/gulp/index.js */ /** src = source - buscar un archivo. dest = Almacenar un archivo. */

/** Compilar CSS */
const sass = require('gulp-sass')(require('sass'));

/** Minificar Imágenes */
const imagemin = require('gulp-imagemin');


function css(done) {
    /** 1) Identificar el archivo principal 
     * Entonces digamos que va a ir en serie, realiza una tarea y después se va al siguiente pipe() y una vez que finaliza podemos tener otro pipe().
    */
    src('src/scss/app.scss')
        .pipe(sass()) /** 2) Compilar SASS */
        .pipe(dest('build/css')) /** 3) Exportarlo o guardarlo en una ubicación */

    done();
}

function dev() {
    /** Puedo poner watch() (nombre de la función que estoy importando) y toma dos parámetros. 1) Archivo que vamos a estar revisando por cambios. 2) Si hay cambios en este archivo, tenemos ya una función que compila SASS. Por lo tanto, manda llamar la función de CSS.*/
    watch('src/scss/**/*.scss', css);
}

function imagenes(done) {
    /** 1) Identificar archivo con imágenes */
    src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 5 })) /** 2) Compilar */
        .pipe(dest('build/img')) /** 3) Exportarlo o guardarlo en una ubicación */

    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;